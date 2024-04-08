import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import AddTask from "../AddTask"
import EditTask from "../EditTask"
import { Todo } from "../../../types"

export function Modal({children, title, Add, Edit, task}:{children:React.ReactNode, title:string, Add?:boolean, Edit?:boolean, task: Todo}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#171d40] border-none">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
        </DialogHeader>
        {Add && <AddTask/>}
        {Edit && <EditTask task={task} />}
      </DialogContent>
    </Dialog>
  )
}
