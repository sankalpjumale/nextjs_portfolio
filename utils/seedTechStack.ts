import TechStackModel from "@/models/TechStack"
import mongoose from "mongoose"

const techStackData = [
    //Frontend
    {
        name: "Next.js",
        category: "Frontend",
        icon: "nextjs",
        proficiency: 5,
        projectIds: ["portfolio"]  //which projects use this tech
    },
    {
        name: "TypeScript",
        category: "Frontend",
        icon: "typesript",
        proficiency: 4,
        projectIds: ["portfolio"]
    },
    {
        name: "Tailwind CSS",
        category: "Frontend",
        icon: "tailwind",
        proficiency: 5,
        projectIds: ["portfolio"]
    },

    //Backend
    {
        name: "Node.js",
        category: "Backend",
        icon: "nodejs",
        proficiency: 4,
        projectIds: ["portfolio"]
    },
    {
        name: "Node.js API Routes",
        category: "Backend",
        icon: "nextjs",
        proficiency: 4,
        projectIds: ["portfolio"]
    },

    //Database
    {
        name: "MongoDB",
        category: "Database",
        icon: "mongodb",
        proficiency: 4,
        projectIds: ["portfolio"]
    },
    {
        name: "Mongoose",
        category: "Database",
        icon: "mongoose",
        proficiency: 4,
        projectIds: ["portfolio"]
    },

    //Devops
    {
        name: "Vercel",
        category: "DevOps",
        icon: "vercel",
        proficiency: 4,
        projectIds: ["portfolio"]
    },
    {
        name: "GitHub",
        category: "DevOps",
        icon: "github",
        proficiency: 5,
        projectIds: ["portfolio"]
    },
]

async function seedTechStack() {
    const uri = process.env.MONGODB_URI
    if(!uri) {
        throw new Error("MONGO_URI is not defined")
    }

    await mongoose.connect(uri)
    console.log("Connected to MongoDB")

    //clear existing tech stack data to avoid duplicates on re-run
    await TechStackModel.deleteMany({})
    console.log("Cleared existing TechStack data")

    //insert the seed data to the collection
    await TechStackModel.insertMany(techStackData)
    console.log(`Seeded ${techStackData.length} tech stack items`)

    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
}

seedTechStack().catch((err) => {
    console.error("Seed failed: ", err)
    process.exit(1) //exit with error code so CI/CD can detect failure
})