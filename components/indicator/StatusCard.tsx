import { ServiceStatus } from '@/types'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import StatusBadge from '../statusbadge/StatusBadge'

interface StatusCardProps {
    service: ServiceStatus
}

function formatLastChecked(lastChecked: string | Date): string {
    const date = new Date(lastChecked)
    const diffMs = Date.now() - date.getTime()
    const diffMin = Math.floor(diffMs / 60000)

    if (diffMin < 1) return "just now"
    if (diffMin === 1) return "1 min ago"
    return `${diffMin} min ago`
}

function StatusCard({service}: StatusCardProps) {
  return (
    <Card
        className="border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800/60"
    >
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <CardTitle className="font-mono text-sm font-semibold text-zinc-100">{service.name}</CardTitle>
            <StatusBadge status={service.status} responseTime={service.responseTime}/>
        </CardHeader>

        <CardContent className="pb-3">
            <p className="truncate font-mono text-xs text-zinc-500">{service.url}</p>
        </CardContent>

        <Separator className="bg-zinc-800"/>

        <CardFooter className="flex items-center justify-between pt-3">
            <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path d="M12 6v614 2" strokeLinecap="round" strokeWidth="2"/>
                </svg>
                Checked {formatLastChecked(service.lastChecked)}
            </span>

            {service.uptime !== undefined && (
                <span className="font-mono text-xs text-zinc-400">
                    {service.uptime}% uptime
                </span>
            )}
        </CardFooter>
    </Card>
  )
}

export default StatusCard