import Service from "@/models/Service"
import StatusHistory from "@/models/StatusHistory"
import { checkService } from "@/utils/checkStatus"
import dbConnect from "@/utils/dbConnect"
import { ArrowDownWideNarrow } from "lucide-react"
import { NextResponse } from "next/server"


export async function GET() {
    try {
        await dbConnect()

        const services = await Service.find({isActive: true})

        if(!services.length) {
            return NextResponse.json(
                {message: 'No active service to check'},
                {status: 200}              
            )
        }

        //check all services in parallel and save results simultaneously
        const results = await Promise.all(
            services.map(async (service) => {
                const {status, responseTime} = await checkService(service.url)

                await StatusHistory.create({
                    serviceId: service._id,
                    status,
                    responseTime,
                    checkedAt: new Date()
                })

                return {name: service.name, status, responseTime}
            })
        )

        return NextResponse.json(
            {
                message: "Cron check completed",
                checked: results.length,
                results 
            }, {status: 200}
        )
    } catch (error) {
        console.error("{GET /api/status/cron", error)
        return NextResponse.json(
            {
                message: "", error: String(error)
            }, {status: 500}
        )
    }
}