'use client'

import StatusGrid from "@/components/indicator/StatusGrid"
import StatusHistory from "@/components/indicator/StatusHistory"
import { useStatusStore } from "@/store/statusStore"
import { ServiceStatus } from "@/types"
import { useEffect, useState } from "react"

const REFRESH_INTERVAL_SECONDS = 60

function page() {

    const {services, loading, lastUpdated, fetchStatus} = useStatusStore()

    const [selectedServices, setSelectedServices] = useState<ServiceStatus | null>(null)

    const [countdown, setCountdown] = useState(REFRESH_INTERVAL_SECONDS)

    useEffect(() => {
        fetchStatus()
    }, [fetchStatus])

    useEffect(() => {
        setCountdown(REFRESH_INTERVAL_SECONDS)

        const timer = setInterval(() => {
            setCountdown((prev) => (prev <= 1 ? REFRESH_INTERVAL_SECONDS : prev - 1))
        }, 1000)

        return () => clearInterval(timer)
    }, [lastUpdated])

    const overallStatus = services.every((s) => s.status === "up")
        ? "up"
        : services.some((s) => s.status === "down")
        ? "down"
        : "degraded"

    const statusLabel = {
        up: "All System Opeerational",
        degraded: "Partial Degradation",
        down: "Major Outrage"
    }[overallStatus]

    const statusColor = {
        up: "bg-green-950 border-green-700",
        degraded: "bg-yellow-950 border-yellow-700",
        down: "bg-red-950 border-red-700"
    }[overallStatus]

    const statusTextColor = {
        up: "text-green-400",
        degraded: "text-yellow-400",
        down: "text-red-400"
    }[overallStatus]


  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 px-4 py-10 md:px-8">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-1">System Status</h1>
            <p className="text-gray-400 text-sm mb-6">Live health monitoring for all active services</p>

            <div className={`rounded-lg border px-5 py-4 mb-8 ${statusColor}`}>
                <div className="flex items-center justify-between flex-wrap gap-2">

                    <div className="flex items-center gap-3">
                        <span className={`relative flex h-3 w-3`}>
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                overallStatus === "up" ? "bg-green-400" :
                                overallStatus === "degraded" ? "bg-yellow-400" : "bg-red-400"
                            }`}/>

                            <span className={`relative inline-flex rounded-full h-3 w-3 ${
                                overallStatus === "up" ? "bg-green-400" : 
                                overallStatus === "degraded" ? "bg-yellow-400" : "bg-red-400"
                            }`}/>
                        </span>

                        <span className={`font-semibold text-lg ${statusTextColor}`}>{statusLabel}</span>
                    </div>

                    <span className="text-gray-400 text-xs">
                        Next refresh in{" "}
                        <span className="text-gray-200 font-mono">{countdown}s</span>
                    </span>
                </div>
            </div>

            {loading && (
                <p className="text-gray-400 text-sm text-center py-12">Checking services...</p>
            )}

            {!loading && (
                <>
                    <StatusGrid 
                        services={services}
                        onSelect={(service) => 
                            setSelectedServices((prev) => 
                                prev?.name === service.name ?  null : service
                            )
                        }
                        selectedServiceName={selectedServices?.name ?? null}
                    />

                    {selectedServices && (
                        <div className="mt-10">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">
                                    History:{" "}
                                    <span>{selectedServices.name}</span>
                                </h2>
                                <button onClick={() => setSelectedServices(null)} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                                    Close ✕
                                </button>
                            </div>

                            <StatusHistory 
                                serviceId={selectedServices.name}
                                serviceName={selectedServices.name}
                                history={selectedServices.history ?? []}
                            />
                        </div>
                    )}

                    {lastUpdated && (
                        <p className="text-center text-gray-600 text-xs mt-10">
                            Last checked at{" "}
                            <span>
                                {new Date(lastUpdated).toLocaleString()}
                            </span>
                        </p>
                    )}
                </>
            )}
        </div>
    </main>
  )
}

export default page