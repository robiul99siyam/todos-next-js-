"use client";
import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import CloseForm from "./CloseForm";

// Supabase Client Setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_API;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Todo({ setShow }) {
  const { register, handleSubmit, reset } = useForm();

  const handleInsetData = async (data) => {
    console.log(data);

    const { title, description } = data;

    // Insert data into Supabase
    const { data: insertData, error } = await supabase
      .from("todos")
      .insert([{ title, description }]);
    reset();

    if (error) {
      console.error("Error inserting data:", error.message);
    } else {
      console.log("Data inserted successfully:", insertData);
      window.location.reload();
      setShow(false); // This will hide the modal
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="max-w-md p-5 border rounded-lg shadow-lg  w-full">
          <CloseForm setShow={setShow} />
          <form onSubmit={handleSubmit(handleInsetData)} className="space-y-4">
            <div>
              <label className="block font-medium">Title:</label>
              <input
                {...register("title", { required: true })}
                type="text"
                name="title"
                id="title"
                className="w-full p-2 border rounded-md bg-black/5 text-gray-200 focus:outline-none focus:ring-0"
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block font-medium">Description:</label>
              <textarea
                {...register("description", { required: true })}
                id="description"
                name="description"
                className="w-full p-2 border rounded-md bg-black/5 text-gray-200 focus:outline-none focus:ring-0"
                placeholder="Enter description"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
