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
  console.log("Project:", project.id, project.name);

  const tasks = [
    "Set ADMIN_TOKEN in Vercel env to unlock admin dashboard",
    "Sign up for iHerb affiliate program",
    "Apply to Impact/ShareASale for supplement brands",
    "Apply to Thorne, Transparent Labs, CON-CRET direct affiliate programs",
    "Review and approve first published article (tone/accuracy)",
    "Enable Vercel Web Analytics in project settings",
  ];

  for (const title of tasks) {
    await client.createIssue({
      teamId: team.id,
      projectId: project.id,
      title,
      description: "Migrated from allaboutcreatine.com admin todo list.",
    });
    console.log("  ✓", title);
  }
  console.log(`\nCreated ${tasks.length} issues in Linear`);
}

main().catch(e => console.error(e.message));
