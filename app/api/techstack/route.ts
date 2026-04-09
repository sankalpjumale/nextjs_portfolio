import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import TechStack from "@/models/TechStack";


export async function GET(req: NextRequest) {
    try {
        await dbConnect()

        const {searchParams} = new URL(req.url)
        const projectId = searchParams.get("projectId")

        const query = projectId ? {projectsIds: projectId} : {}

        const stacks = await TechStack.find(query).sort({category: 1, name: 1})
        return NextResponse.json(
            {
                success: true,
                data: stacks
            }, {status: 200}
        )
    } catch (error) {
        //log error srver-side
        console.error("[GET /api/techstack] Error: ", error)

        //return safe error response - never exposing raw error to client
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch tech stack data"
            }, {status: 500}
        )
    }
}