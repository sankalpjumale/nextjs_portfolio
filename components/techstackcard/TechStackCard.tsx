'use client'

import { StackItem } from "@/types";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

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
            <CardContent className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                    <span className="text-2xl " aria-label={tech.name}>
                        {tech.icon}
                    </span>
                    <Badge variant="secondary" className={badgeStyle}>
                        {tech.category}
                    </Badge>
                </div>

                <p className="text-sm font-semibold text-gray-800">{tech.name}</p>

                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Proficiency</span>
                        <span>{tech.proficiency} / 5</span>
                    </div>

                    <div className="h-1 w-full rounded-full bg-gray-100">
                        <div 
                            className="h-1.5 rounded-full bg-gray-800 transition-all duration-500"
                            style={{width: `${proficiencyPercent}%`}}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}