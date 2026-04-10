import { StackItem } from "@/types";
import { Card } from "../ui/card";




interface TechStackCardProps {
    tech: StackItem
}

const categoryStyles: Record<string, string> = {
    Frontend: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    Backend: "bg-green-100 text-green-700 hover:bg-green-100",
    Database: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    DevOps: "bg-red-100 text-red-700 hover:bg-red-100"
}

export default function TechStackCard({tech}: TechStackCardProps) {
    const proficiencyPercent = (tech.proficiency / 5) * 100

    const badgeStyle = categoryStyles[tech.category] ?? "bg-gray-100 text-gray-600 hover:bg-gray-100"

    return (
        <Card className="w-full">
            CardC
        </Card>
    )
}