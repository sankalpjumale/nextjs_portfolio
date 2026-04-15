
export type StatusResult = "up" | "down" | "degraded"

export interface CheckResult {
    status: StatusResult
    responseTime: number
    checkedAt: Date
    statusCode: number | null
    error: string | null
}

const DEGRADED_THRESHOLD_MS = 2000 //milliseconds

const TIMEOUT_MS = 5000 //milliseconds

export async function checkService(url: string): Promise<CheckResult> {
    const startTime = Date.now()

    const checkedAt = new Date()

    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

        const response = await fetch(url, {
            method: "HEAD",
            signal: controller.signal,
            cache: "no-store"
        })

        clearTimeout(timeoutId)

        const responseTime = Date.now() - startTime

        const status = deriveStatus(response.status, responseTime)

        return {
            status,
            responseTime,
            checkedAt,
            statusCode: response.status,
            error: null
        }
    } catch (err: unknown) {
        const responseTime = Date.now() - startTime

        const isTimeout = err instanceof Error && err.name === "AbortError"

        return {
            status: "down",
            responseTime,
            checkedAt,
            statusCode: null,
            error: isTimeout
                ? `Request timed out after ${TIMEOUT_MS}`
                : (err instanceof Error ? err.message : "Unknown error")
        }
    }
}

function deriveStatus(statusCode: number, responseTime: number): StatusResult {
    if (statusCode >= 500) return "down"

    if (statusCode >= 400 && statusCode != 404) return "degraded"

    if(responseTime > DEGRADED_THRESHOLD_MS) return "degraded"

    return "up"
}

export async function checkAllServices(
    servises: {id: string; url: string}[]
): Promise<{id: string; result: CheckResult}[]>{

    const results: {id: string, result: CheckResult}[] = []

    const promises = servises.map(({id, url}) => 
        checkService(url)
            .then((result) => ({id, result}))
            .catch(() => ({
                id,
                result: {
                    status: "down" as StatusResult,
                    responseTime: 0,
                    checkedAt: new Date(),
                    statusCode: null,
                    error: "Check failed unexpectedly"
                }
            }))
    )

    const resolved = await Promise.all(promises)
    resolved.forEach((item) => results.push(item))

    return results
}