import TodoItem from "@/components/TodoItem";
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";
async function getTodos() {
    return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
    "use server";

    await prisma.todo.update({ where: { id }, data: { completed: complete } });
}
async function deleteTodo(id: string) {
    "use server";

    await prisma.todo.delete({ where: { id } });
    revalidatePath("/");
}

export default async function Home() {
    const todos = await getTodos();

    return (
        <>
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl">Todos</h1>
                <Link
                    href="/new"
                    className="border border-slate-300 text-slate-200 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
                >
                    New
                </Link>
            </header>
            <ul className="pl-4">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        {...todo}
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
        </>
    );
}
