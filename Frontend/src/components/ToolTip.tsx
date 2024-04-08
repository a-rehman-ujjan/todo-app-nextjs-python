import {
  Toltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Tooltip({tool_tip_content, children}:{tool_tip_content: string, children:React.ReactNode}) {
  return (
    <TooltipProvider>
      <Toltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tool_tip_content}</p>
        </TooltipContent>
      </Toltip>
    </TooltipProvider>
  )
}