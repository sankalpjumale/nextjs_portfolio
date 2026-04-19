import { getCurrentStatus, getStatusHistory } from "@/services/statusService";
import { ServiceStatus, StatusHistory } from "@/types";
import { create } from "zustand";




interface StatusStore {
    services: ServiceStatus[]
    history: Record<string, StatusHistory[]>
    loading: boolean
    error: string | null
    lastUpdated: string | null
    intervalId: ReturnType<typeof setInterval> | null
    fetchStatus: () => Promise<void>
    fetchHistory: (serviceId: string) => Promise<void>
    startAutoRefresh: () => void
    stopAutoRefresh: () => void
}

export const getOverallHealth = (
    services: ServiceStatus[]
): "up" | "down" | "degraded" => {
    if (services.length === 0) return "degraded"

    const hasDown = services.some ((s) => s.status === "down")
    if (hasDown) return "down"

    const hasDegraded = services.some((s) => s.status === "degraded")
    if(hasDegraded) return "degraded"

    return "up"
}

export const useStatusStore = create<StatusStore>((set, get) => ({
    services: [],
    history: {},
    loading: false,
    error: null,
    lastUpdated: null,
    intervalId: null,

    fetchStatus: async () => {
        set({loading: true, error: null})

        try {
            const data = await getCurrentStatus()
            set({
                services: data,
                loading: false,
                lastUpdated: new Date().toISOString()
            })
        } catch (err) {
            set({
                loading: false,
                error: err instanceof Error ? err.message : "Failed to fetch status"
            })
        }
    },

    fetchHistory: async (serviceId: string) => {
        try {
            const data = await getStatusHistory(serviceId)
            set((state) => ({
                history: {
                    ...state.history,
                    [serviceId]: data
                }
            }))
        } catch (err) {
            console.error(`Failed to fetch history for ${serviceId}: `, err)
        }
    },

    startAutoRefresh: () => {
        if(get().intervalId !== null) return

        get().fetchStatus()

        const id = setInterval(() => {
            get().fetchStatus()
        }, 60000)

        set({intervalId: id})
    },

    stopAutoRefresh: () => {
        const {intervalId} = get()

        if(intervalId !== null) {
            clearInterval(intervalId)
            set({intervalId: null})
        }
    }
}))