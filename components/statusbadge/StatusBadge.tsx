import { Badge } from "../ui/badge"
import { ServiceStatus } from "@/types"

// props for navbar
interface StatusBadgeProps {
    status: ServiceStatus["status"] //up | down | degraded
    responseTime?: number //in millisecond
    compact?: boolean //hide label when true navbar use
}

// tailwind class overrides per status that is why applied on top of badge base
const statusClasses: Record<ServiceStatus["status"], string> = {
    up: "bg-emerald-950 text-emerald-400 border-emerald-700 hover:bg-emerald-950",
    down: "bg-red-950 text-red-400 border-red-700 hover:bg-red-950",
    degraded: "bg-yellow-950 text-yellow-400 border-yellow-700 hover:bg-yellow-950"
}

// readable label
const statusLabel: Record<ServiceStatus["status"], string> = {
    up: "Operational",
    down: "Outrage",
    degraded: "Degraded"
}

// pulsing dot color
const dotColor: Record<ServiceStatus["status"], string> = {
    up: "bg-emerald-400",
    down: "bg-red-400",
    degraded: "bg-yellow-400"
}

function StatusBadge({status, responseTime, compact = false}: StatusBadgeProps) {
  return (
    <Badge
        variant="outline"
        className={`
            gap-1.5 font-mono text-xs font-medium ${statusClasses[status]} ${compact ? "px-2 py-0.5" : "px-3 py-1"}    
        `}
    >
        {/* live pulsing dot animated ring when service is up only */}
        <span className="relative flex h-2 w-2 shrink-0">
            {status === "up" && (
                // ping animation ring
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${dotColor[status]}`}/>
            )}

            {/* static dot always visible */}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${dotColor[status]}`}/>
        </span>

        {/* status label text hidden in compact mode */}
        {!compact && <span>{statusLabel[status]}</span>}

        {/* response time only shown when provided and full mode */}
        {!compact && responseTime !== undefined && (
            <span className="opacity-60">{responseTime}ms</span>
        )}
    </Badge>
  )
}

export default StatusBadge