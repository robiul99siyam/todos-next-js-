"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// Supabase Client Setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_API;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("todos").select("*");
      if (error) {
        console.error("Error fetching todos:", error.message);
      } else {
        setTodoList(data);
      }
    };

    fetchData();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.error("Error deleting todo:", error.message);
    } else {
      setTodoList(todoList.filter((todo) => todo.id !== id));
    }
  };

  // Handle edit
  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const handleSaveEdit = async () => {
    if (!editingTodo) return;

    const { error } = await supabase
      .from("todos")
      .update({ title: editTitle, description: editDescription })
      .eq("id", editingTodo.id);

    if (error) {
      console.error("Error updating todo:", error.message);
    } else {
      setTodoList(
        todoList.map((todo) =>
          todo.id === editingTodo.id
            ? { ...todo, title: editTitle, description: editDescription }
            : todo
        )
      );
      setEditingTodo(null);
      setEditTitle("");
      setEditDescription("");
    }
  };

  return (
    <div className="mt-20 px-6">
      <h2 className="text-2xl font-bold font-serif mb-5 text-center">
        Todo List
      </h2>

      {todoList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {todoList.map((todo) => (
            <div
              key={todo.id}
              className="border border-gray-400 rounded-xl shadow-lg p-6 relative"
            >
              <h3 className="text-lg font-semibold text-gray-300">
                {todo.title}
              </h3>
              <p className="text-gray-400 mt-2">{todo.description}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(todo)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No todos available</p>
      )}

      {/* Edit Modal */}
      {editingTodo && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 ">
          <div className="p-6 rounded-lg w-96 border">
            <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-2 bg-black/5 focus:outline-none text-gray-300"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4 bg-black/5  focus:outline-none text-gray-300"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingTodo(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
