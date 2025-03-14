"use client";

import { useState } from "react";
import Todo from "./todo-form/Todo";

export default function Button() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="px-10 py-3 border border-gray-400 text-lg rounded-lg"
      >
        Create Todo
      </button>

      {show && <Todo setShow={setShow} />}
    </>
  );
}
