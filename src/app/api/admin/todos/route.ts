import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const TASKS_PATH = "content/admin/todos.json";

function readTasks() {
  try {
    const raw = require("fs").readFileSync(TASKS_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { tasks: [] };
  }
}

function writeTasks(data: any) {
  require("fs").writeFileSync(TASKS_PATH, JSON.stringify(data, null, 2));
}

export async function GET() {
  const data = readTasks();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const data = readTasks();
  const body = await request.json();
  const task = {
    id: Date.now().toString(),
    title: body.title,
    description: body.description || "",
    priority: body.priority || "medium",
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  data.tasks.push(task);
  writeTasks(data);
  return NextResponse.json(task, { status: 201 });
}

export async function PUT(request: Request) {
  const data = readTasks();
  const body = await request.json();
  const index = data.tasks.findIndex((t: any) => t.id === body.id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  data.tasks[index] = { ...data.tasks[index], ...body };
  writeTasks(data);
  return NextResponse.json(data.tasks[index]);
}

export async function DELETE(request: Request) {
  const data = readTasks();
  const body = await request.json();
  data.tasks = data.tasks.filter((t: any) => t.id !== body.id);
  writeTasks(data);
  return NextResponse.json({ success: true });
}
