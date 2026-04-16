import StatusHistory from "@/models/StatusHistory";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        await dbConnect()

        const {searchParams} = new URL(req.url)
        const serviceId = searchParams.get("serviceId") //null if not provided

        const query = serviceId ? {serviceId} : {}

        const history = await StatusHistory.find(query)
            .sort({checkedAt: -1}) //newest first
            .limit(100) //cap results to avoid large payloads
        return NextResponse.json(
            {
                message: "History fetched successfully", data: history
            }, {status: 200}
        )

    } catch (error) {
        console.error("[GET /api/status/history] Error: ", error)
        return NextResponse.json(
            {
                message: "Failed to fetch history", error: String(error)
            }, {status: 500}
        )
    }
}