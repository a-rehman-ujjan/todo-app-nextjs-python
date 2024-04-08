import { Modal } from "@/components/ui/Modal";
import TodoTable from "@/components/TodoTable";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <section className="flex justify-center items-center">
        <Modal title="Add Task" Add={true}>
        <Button variant="outline" className="bg-emerald-400 w-48 text-white font-semibold px-2 py-1 capitalize text-lg">Add New Task</Button>
        </Modal>
      </section>
      <section className="flex justify-center items-center mt-8">
        <TodoTable/>
      </section>
    </main>
  );
}
