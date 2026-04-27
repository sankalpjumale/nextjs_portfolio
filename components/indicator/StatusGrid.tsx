import { ServiceStatus } from "@/types"
import StatusCard from "./StatusCard";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";


// props full array of services with current status
interface StatusGridProps {
  services: ServiceStatus[]
}

// return one of three possible state
function getOverallHealth(
  services: ServiceStatus[]
): "all_up" | "partial" | "all_down" {
  const total = services.length;
  const upCount = services.filter((s) => s.status === "up").length 
  const downCount = services.filter((s) => s.status === "down").length 

  if(upCount === total) return "all_up"
  if(downCount === total) return "all_down"
  return "partial"
}

const healthConfig = {
  all_up: {
    cardClass: "border-emerald-800 bg-emerald-950",
    badgeClass: "bg-emerald-900 text-emerald-400 border-emerald-700 hover:bg-emerald-900",
    dotClass: "bg-emerald-400",
    message: "All Systems Operational"
  },
  partial: {
    cardClass: "border-yellow-800 bg-yellow-950",
    badgeClass: "bg-yellow-900 text-yellow-400 border-yellow-700 hover:bg-yellow-900",
    dotClass: "bg-yellow-400",
    message: "Partial Systems Degradation"
  },
  all_down: {
    cardClass: "border-red-800 bg-red-950",
    badgeClass: "bg-red-900 text-red-400 border-red-700 hover:bg-red-900",
    dotClass: "bg-red-400",
    message: "Major Outrage Dectected"
  },
}

function StatusGrid({services}: StatusGridProps) {

  const health = getOverallHealth(services)
  const config = healthConfig[health]

  // count how many services are currently operational
  const operationalCount = services.filter((s) => s.status === "up").length

  return (
    <div className="w-full space-y-6">
      <Card className={`${config.cardClass}`}>
        <CardContent className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-50 ${config.dotClass}`}/>
              <span className={`relative inline-flex h-3 w-3 rounded-full ${config.dotClass}`}/>
            </span>
            <p className="font-mono text-sm font-semibold text-zinc-100">{config.message}</p>
          </div>
          <Badge
            variant="outline"
            className={`font-mono text-xs ${config.badgeClass}`}
          >
            {operationalCount}/{services.length} services
          </Badge>
        </CardContent>
      </Card>

      <div>
        {services.map((service) => (
          // one status card per service in the array
          <StatusCard 
            key={service.name}
            service={service}
          />
        ))}
      </div>

      {/* empty state when services array is empty */}
      {services.length === 0 && (
        <p className="py-12 text-center font-mono text-sm text-zinc-600">No services configured yet.</p>
      )}
    </div>
  )
}

export default StatusGrid