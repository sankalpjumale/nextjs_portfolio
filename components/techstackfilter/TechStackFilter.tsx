'use client'

import { StackItem } from "@/types"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"


const CATEGORIES = ["All", "Frontend", "Backend", "Database", "DevOps"]

interface TechStackFilterProps {
    activeFilter: string
    onFilterChange: (category: string) => void
    stacks: StackItem[]
}

export default function TechStackFilter({
    activeFilter,
    onFilterChange,
    stacks
}: TechStackFilterProps) {

    const getCount = (category: string): number => {
        if(category === "All") return stacks.length
        return stacks.filter((t) => t.category === category).length
    }

    return (
        <div className="flex w-full gap-2 overflow-x-auto pb-1">

            {CATEGORIES.map((category) => {
                const isActive = category === activeFilter

                return (
                    <Button
                        key={category}
                        onClick={() => onFilterChange(category)}
                        variant={isActive ? "default": "outline"}
                        size="sm"
                        className="flex shrink-0 items-center gap-1.5 rounded-full"
                        aria-pressed={isActive}
                    >
                        {category}
                        <Badge variant={isActive ? "secondary" : "outline"} className="ml-0.5 h-4 min-w-4 rounded-full px-1 text-[10px]">
                            {getCount(category)}
                        <Badge/>
                    </Button>

                )
            })}
        </div>
    )
}