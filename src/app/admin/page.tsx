"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Plus, Trash2, X } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "done";
  createdAt: string;
}

export default function AdminPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");

  async function load() {
    const res = await fetch("/api/admin/todos");
    const data = await res.json();
    setTasks(data.tasks || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function addTask(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, priority }),
    });
    setTitle("");
    setDescription("");
    setPriority("medium");
    setShowForm(false);
    load();
  }

  async function toggleTask(task: Task) {
    await fetch("/api/admin/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, status: task.status === "done" ? "pending" : "done" }),
    });
    load();
  }

  async function deleteTask(id: string) {
    await fetch("/api/admin/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  const pending = tasks.filter((t) => t.status === "pending");
  const done = tasks.filter((t) => t.status === "done");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="mt-1 text-text-secondary">
            AllAboutCreatine — track your todos here
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "New Task"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addTask} className="mb-8 rounded-xl border border-border bg-surface-raised p-6">
          <h2 className="mb-4 text-lg font-semibold">Add Task</h2>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
              placeholder="What needs to be done?"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
              placeholder="Optional details"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task["priority"])}
              className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Add Task
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-text-secondary">Loading...</p>
      ) : (
        <div className="space-y-8">
          <section>
            <h2 className="mb-4 text-xl font-semibold">Pending ({pending.length})</h2>
            {pending.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border p-8 text-center text-text-muted">
                All clear — no pending tasks.
              </p>
            ) : (
              <div className="space-y-3">
                {pending.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-4 rounded-xl border border-border bg-surface-raised p-4 transition hover:shadow-sm"
                  >
                    <button
                      onClick={() => toggleTask(task)}
                      className="mt-1 text-text-muted transition hover:text-primary-600"
                      aria-label="Mark done"
                    >
                      <Circle className="h-5 w-5" />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{task.title}</h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            task.priority === "high"
                              ? "bg-red-50 text-red-700"
                              : task.priority === "medium"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      {task.description && (
                        <p className="mt-1 text-sm text-text-secondary">
                          {task.description}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-text-muted">
                        {new Date(task.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-text-muted transition hover:text-red-600"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {done.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-semibold">Completed ({done.length})</h2>
              <div className="space-y-3">
                {done.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-4 rounded-xl border border-border bg-surface-muted p-4 opacity-75"
                  >
                    <button
                      onClick={() => toggleTask(task)}
                      className="mt-1 text-emerald-600 transition hover:text-emerald-700"
                      aria-label="Mark pending"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                    </button>
                    <div className="flex-1">
                      <h3 className="font-semibold line-through">{task.title}</h3>
                      {task.description && (
                        <p className="mt-1 text-sm text-text-secondary line-through">
                          {task.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-text-muted transition hover:text-red-600"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
