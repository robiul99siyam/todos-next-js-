import Landing from "@/components/Landing";
import Navbar from "@/components/Navbar";
import TodoList from "@/components/TodoList";

export default function page() {
  return (
    <div>
      <Navbar />
      <Landing />
      <TodoList />
    </div>
  );
}
