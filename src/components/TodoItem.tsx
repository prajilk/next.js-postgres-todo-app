"use client";

type TodoItemProps = {
    id: string;
    title: string;
    completed: boolean;
    toggleTodo: (id: string, complete: boolean) => void;
    deleteTodo: (id: string) => void;
};

const TodoItem = ({
    id,
    title,
    completed,
    toggleTodo,
    deleteTodo,
}: TodoItemProps) => {
    return (
        <li className="flex justify-between mb-1">
            <div className="flex gap-1 items-center">
                <input
                    id={id}
                    type="checkbox"
                    className="cursor-pointer peer"
                    defaultChecked={completed}
                    onChange={(e) => toggleTodo(id, e.target.checked)}
                />
                <label
                    htmlFor={id}
                    className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
                >
                    {title}
                </label>
            </div>
            <button
                onClick={() => deleteTodo(id)}
                className="text-xl outline-none focus-within:text-red-500 hover:text-red-500"
            >
                &times;
            </button>
        </li>
    );
};

export default TodoItem;
