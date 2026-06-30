import { LinearClient } from "@linear/sdk";
import fs from "fs";
import path from "path";

const agentsEnvPath = path.join(process.env.HOME, ".agents", ".env");
const envContent = fs.readFileSync(agentsEnvPath, "utf-8");
const keyMatch = envContent.match(/^LINEAR[^=]*=([^\n]+)/m);
const apiKey = keyMatch ? keyMatch[1] : "";

const client = new LinearClient({ apiKey: apiKey });

async function main() {
  const team = (await client.teams()).nodes[0];
  const projs = await client.projects();
  const project = projs.nodes.find(p => p.name.startsWith("All About Creatine"));
  if (!project) { console.error("Project not found"); return; }

  // Get existing issue titles to avoid duplicates
  const existingIssues = await client.issues({ filter: { project: { id: { eq: project.id } } } });
  const existingTitles = new Set(existingIssues.nodes.map(i => i.title.trim().toLowerCase()));
  console.log(`Existing issues: ${existingTitles.size}`);

  const tasks = [
    { title: "Sign up for iHerb affiliate program", desc: "Join iHerb affiliate program for supplement links." },
    { title: "Apply to Impact/ShareASale for supplement brands", desc: "Impact Radius / ShareASale for brands like Thorne, Transparent Labs, CON-CRET." },
    { title: "Apply to Thorne direct affiliate program", desc: "Apply to Thorne's own affiliate program." },
    { title: "Review and approve first comparison article (tone/accuracy)", desc: "Review the first draft published article for accuracy and brand voice before promoting." },
    { title: "Enable Vercel Web Analytics in project settings", desc: "Turn on Vercel Web Analytics for the production deployment." },
    { title: "Set up email capture (Resend or Beehiiv)", desc: "Choose and configure an email service for newsletter/subscriber capture on the site." },
    { title: "Complete content/ideas directory scaffolding", desc: "Verify content/ideas/research-backlog.json is being used by the content pipeline." },
  ];

  let added = 0;
  for (const task of tasks) {
    // Normalize title for comparison
    const base = task.title.toLowerCase();
    const alreadyThere = [...existingTitles].some(t => base.includes(t) || t.includes(base));
    if (alreadyThere) {
      console.log("  ~ already in Linear:", task.title);
      continue;
    }
    await client.createIssue({
      teamId: team.id,
      projectId: project.id,
      title: task.title,
      description: task.desc,
    });
    existingTitles.add(base);
    added++;
    console.log("  ✓", task.title);
  }
  console.log(`\nAdded ${added} new issues`);
}

main().catch(e => console.error(e.message));
