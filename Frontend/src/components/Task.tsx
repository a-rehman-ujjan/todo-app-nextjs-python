'use client'

import { FaCheckCircle, FaTrash, FaEdit, FaPen } from "react-icons/fa";
import { Todo } from "../../types";
import Tooltip from "./ToolTip";
import { Modal } from "./ui/Modal";
import { delete_todo, edit_todo, status_change } from "@/actions/actions";
import toast from "react-hot-toast";

export default function Task({task}: {task:Todo}) {
  
  const handleStatus = async () =>{
    const response = await status_change(
      task.id,
      task.content,
      task.is_completed
    )
    if (response.status == "success") {
      toast.success(response.message);
    } else if (response.status == "error") {
      toast.error(response.message);
    }
  }


  const handleDelete = async () =>{
    const response = await delete_todo(task.id)
    if (response.status == "Error") {
      toast.error("Something Went task Wrong");
    } else {
      toast.success(response.message);
    }
  }

  return (
    <tr className="flex justify-between items-center border-b border-[#46518c] px-2 py-2">
        <td className={`${task.is_completed ? "text-white flex align-middle justify-center opacity-50 gap-1 line-through" : "text-white flex align-middle justify-center"}`}>
        <Tooltip tool_tip_content="Mark As Completed" >
          <button onClick={handleStatus}>
          <FaCheckCircle  size={24} className={`${task.is_completed ? "text-green-800 mx-1" : "text-gray-400 opacity-20 mx-1"}`}/>
          </button>
          </Tooltip>
          {task.content}</td>
        <td className="flex gap-x-2 ">
          
          <Tooltip tool_tip_content="Edit Task" >
          <Modal title="Edit Task" Edit={true} task={task}>
          <FaPen size={20} className="text-blue-500 cursor-pointer opacity-70 mx-1"/>
          </Modal>
          </Tooltip>
          <Tooltip tool_tip_content="Delete Task" >
          <button onClick={handleDelete}>
          <FaTrash  size={22} className="text-red-600 opacity-70 mx-1"/>
          </button>
          </Tooltip>
        </td>
    </tr>
  )
}
