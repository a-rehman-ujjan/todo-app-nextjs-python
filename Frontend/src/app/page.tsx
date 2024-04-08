import { Modal } from "@/components/ui/Modal";
import TodoTable from "@/components/TodoTable";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24 bg-[#050515]">
      <section className="flex justify-center items-center">
        <Modal title="Add Task" Add={true}>
        <Button variant="default" className="bg-[#034aa6] w-48 text-white font-semibold px-2 py-1 capitalize text-pretty">Add New Task &nbsp;<FaPlus/></Button>
        </Modal>
      </section>
      <section className="flex justify-center items-center mt-8">
        <TodoTable/>
      </section>
    </main>
  );
}
