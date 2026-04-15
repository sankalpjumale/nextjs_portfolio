import Service from "@/models/Service";
import { ServiceStatus, StatusLevel } from "@/types";
import { checkService } from "@/utils/checkStatus";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        dbConnect()

        const services = await Service.find({isActive: true})

        if(!services.length) {
            return NextResponse.json(
                {message: "No active service found", data: []},
                {status: 200}
            )
        }

        const statusResults: ServiceStatus[] = await Promise.all(
            services.map(async (service) => {
                const {status, responseTime} = await checkService(service.url)

                return {
                    _id: service._id.toString(),
                    name: service.name,
                    url: service.url,
                    description: service.description,
                    status: status as StatusLevel, //"up" | "down" | "degrsaded"
                    responseTime, //in milliseconds
                    lastChecked: new Date() //timestamp of this check
                }
            })
        )

        return NextResponse.json(
            {message: "Status fetched successfully", data: statusResults},
            {status: 200}
        )
    } catch (error) {
        console.error("[GET /api/status] Error: ", error)
        return NextResponse.json(
            {message: "Failed to fetch status", error: String(error)},
            {status: 500}
        )
    }
}