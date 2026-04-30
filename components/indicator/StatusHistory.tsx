import {IStatusHistory as StatusHistoryType} from "@/models/StatusHistory";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";

interface StatusHistoryProps {
  history: StatusHistoryType[];
  serviceName: string
}

const dotColor: Record<StatusHistoryType["status"], string> = {
  up: "bg-emerald-400",
  down: "bg-red-400",
  degraded: "bg-yellow-400"
}

const badgeClass: Record<StatusHistoryType["status"], string> = {
  up: "bg-emerald-950 text-emerald-400 border-emerald-700 hover:bg-emerald-950",
  down: "bg-red-950 text-red-400 border-red-700 hover:bg-red-950",
  degraded: "bg-yellow-950 text-yellow-400 border-yellow-700 hover:bg-yellow-950"
}

function formatRelative(dateStr: string | Date): string {
  const date = new Date(dateStr)
  const diffMs = Date.now() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)

  if(diffMin < 1) return "just now"
  if(diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if(diffHr < 24) return `${diffHr}h ago`
  return `${Math.floor(diffHr / 24)}d ago`
}

function formatFull(dateStr: string | Date): string {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export default function StatusHistory({history, serviceName}: StatusHistoryProps) {

  const recent = history.slice(0, 10)

  return (
    <Card className="border-zinc-800 bg-zinc-900">

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="font-mono text-sm font-semibold text-zinc-100">
          {serviceName}
        </CardTitle>

        <Badge variant="outline" className="font-mono text-xs text-zinc-500 boder-zinc-700">
          {history.length} checks
        </Badge>
      </CardHeader>

      <Separator className="bg-zinc-800"/>

      <CardContent>
        {history.length === 0 && (
          <p className="py-8 text-center font-mono text-xs text-zinc-600">No history recorded yet</p>
        )}

        {history.length > 0 && (
          <ScrollArea className="h-80 px-5 py-4">

            <TooltipProvider>
              <ol className="space-y-0">
                {recent.map((record, index) => (
                  <li key={index} className="flex items-start gap-3">

                    <div className="flex flex-col items-center pt-1">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor[record.status]}`}/>

                      {index < recent.length -1 && (
                        <span className="mt-1 h-8 w-px bg-zinc-800"/>
                      )}
                    </div>

                    <div className="pb-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`font-mono text-xs capitalize ${badgeClass[record.status]}`}>
                          {record.status}
                        </Badge>

                        {record.responseTime !== undefined && (
                          <span className="font-mono text-xs text-zinc-500">{record.responseTime}ms</span>
                        )}
                      </div>

                      <Tooltip>
                        <TooltipTrigger>
                          <p className="mt-0.5 cursor-default font-mono text-xs text-zinc-60">
                            {formatRelative(record.checkedAt)}
                          </p>
                        </TooltipTrigger>

                        <TooltipContent side="right" className="border-zinc-700 bg-zinc-800 font-mono text-xs text-zinc-300">
                          {formatFull(record.checkedAt)}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </li>
                ))}
              </ol>
            </TooltipProvider>

            {history.length > 10 && (
              <p className="mt-2 text-center font-mono text-xs text-zinc-600">Showing latest 10 of {history.length} records</p>
            )}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
