import type { ServiceStatus, StatusHistory } from "@/types";

const BASE_URL = "/api/status"

//fetch live current status, called by zusatnd store fetchStatus(), return array of ServiceStatus object
export async function getCurrentStatus(): Promise<ServiceStatus> {

    const response = await fetch(BASE_URL, {
        cache: "no-store" //no-store for always get fresh data not a cached response
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch status: ${response.statusText}`)
    }

    //to-do
    // const data = await response.json() as ServiceStatus[]
    // console.log("Data: ", data)

    const data = await response.json()

    return data
}

//fetch history from mongodb, called when rendering StatusHistory component for one service
export async function getStatusHistory(serviceId?: string): Promise<StatusHistory[]> {

    const url = serviceId
        ? `${BASE_URL}/history?serviceId=${serviceId}`
        : `${BASE_URL}/history`
    
    const response = await fetch(BASE_URL, {
        cache: "no-store" //for history always reflect latest database records
    })

    if(!response.ok){
        throw new Error(`Failed to fetch status history ${response.statusText}`)
    }

    const data: StatusHistory[] = await response.json()
    return data
}

//manullay trigger cron route to run a fresh status check, use in refresh button on status dashboard, in prod. vercel call this automatically in every 5 minute
export async function triggerStatusCheck(): Promise<{message: string}> {
    const response = await fetch(`${BASE_URL}/cron`, {
        method: "GET",
        cache: "no-store"
    })

    if (!response.ok) {
        throw new Error(`Failed to trigger status check: ${response.statusText}`)
    }

    const data: {message: string} = await response.json()
    return data
}