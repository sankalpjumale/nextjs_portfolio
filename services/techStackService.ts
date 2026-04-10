import {StackItem} from "@/types/index"
import { error } from "console"

const BASE_URL = "/api/techstack" //for tech stack API route

//fetch all stacks from API route
export async function getTechStack(): Promise<StackItem[]> {
    try {
        
        //call API route, return everything
        const response = await fetch(BASE_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json" //tell server I want json back
            },
            next: {revalidate: 60} //cache response for 60 seconds
        })

        if(!response.ok) {
            throw new Error(`Failed to fetch tech stack. Status: ${response.status}`)
        }

        //parse and return json response
        const data: StackItem[] = await response.json() 
        return data
    } catch (error) {
        console.error("getTechStack error: ", error)
        throw error
    }
}

export async function getTechStackByProject(projectId: string): Promise<StackItem[]> {
    try {
        //append objectId as a query param 
        const url = `${BASE_URL}?projectId=${encodeURIComponent(projectId)}`

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            next: {revalidate: 60} //cache per project results for 60 seconds
        })

        if(!response.ok) {
            throw new Error(`Failed to fetch stack for project ${projectId}. Status: ${response.status}`)
        }

        //parse and return filtered stack item
        const data: StackItem[] = await response.json()
        return data
    } catch (error) {
        console.error("getTechSTackByProject error: ", error)
        throw error
    }
}

//filter tech stack by category on client side, filter from pre-fetch arrayavoids extra API calls. stacks array which is already fetched
export async function filterStackByCategory(
    stacks: StackItem[], //already fetch data, no new API call 
    category: string
): Promise<StackItem[]> {
    if(category === "All") return stacks

    return stacks.filter((stack) => stack.category === category)
}