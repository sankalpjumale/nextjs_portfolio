import { error } from "console";
import dbConnect from "./dbConnect";
import Service from "@/models/Service";

//services to monitor on the status dashboard, 
const services = [
    {
        name: "Portfolio Site",
        url: "", //main portfolio url
        description: "Main developer portfolio and landing page",
        isActive: true
    },
    {
        name: "Blog",
        url: "", //blog listing page
        description: "MDX-powered technical blog",
        isActive: true
    },
    {
        name: "API Health",
        url: "", //health check route
        description: "Next.js backend API health endpoint",
        isActive: true
    },
    {
        name: "Stack Page",
        url: "", //tech stack page
        description: "Technical stack breakdown page",
        isActive: true
    },
    {
        name: "Portfolio Site",
        url: "", //status dashboard
        description: "Automated system status dashboard",
        isActive: true
    },
]

async function seedServices() {
    if(!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is missing")
    }

    try {
        await dbConnect()
        console.log("Connected to MongoDB")

        //clear all existing services before re-inserting, prevent duplicate key errors on the unique 'name'field
        //remove deleteMany() in production
        await Service.deleteMany({})
        console.log("Cleared existing services")

        await Service.insertMany(services)
        console.log("Seeded ${services.length} services: ")

        services.forEach((s) => console.log(` -${s.name} -> ${s.url}`))
    } catch (error) {
        console.error("Seed failed: ", error)
        process.exit(1)
    }finally {
        const mongoose = await import("mongoose")
        await mongoose.default.disconnect()
        console.log("Disconnect MongoDB")
    }
}

seedServices()