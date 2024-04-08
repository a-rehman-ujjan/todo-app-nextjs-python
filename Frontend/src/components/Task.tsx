'use client'

import { CiSquareCheck } from "react-icons/ci";
import { Todo } from "../../types";
import { FiEdit, FiTrash2 } from "react-icons/fi";
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
    <tr className="flex justify-between items-center border-b border-gray-200 px-2 py-2">
        <td>{task.content}</td>
        <td className="flex gap-x-2 ">
          <Tooltip tool_tip_content="Mark As Completed" >
          <button onClick={handleStatus}>
          <CiSquareCheck  size={28} className={`${task.is_completed ? "text-green-800 shadow-md" : "text-gray-400"}`}/>
          </button>
          </Tooltip>
          <Tooltip tool_tip_content="Edit Task" >
          <Modal title="Edit Task" Edit={true} task={task}>
          <FiEdit size={24} className="text-blue-500"/>
          </Modal>
          </Tooltip>
          <Tooltip tool_tip_content="Delete Task" >
          <button onClick={handleDelete}>
          <FiTrash2  size={24} className="text-red-600"/>
          </button>
          </Tooltip>
        </td>
    </tr>
  )
}
