import { StackItem } from "@/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";


interface TechStackGridProps {
    stacks: StackItem[];
    activeFilter: string
}

export default function TechStackGrid({
    stacks,
    activeFilter
}: TechStackGridProps) {

    const filtered = 
        activeFilter === "All"
            ? stacks
            : stacks.filter((t) => t.category === activeFilter)

    const badgeVariant = (
        category: string
    ): "default" | "secondary" | "outline" | "destructive" => {
        const map: Record<
            string,
            "default" | "secondary" | "outline" | "destructive"
        > = {
            Frontend: "default",
            Backend: "secondary",
            Database: "outline",
            Devops: "destructive",
        }
        return map[category] ?? "secondary"
    }

    if(filtered.length === 0) {
        return (
            <p className="mt-10 text-center text-sm text-muted-foreground">
                No technologies found for this category
            </p>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {filtered.map((tech) => (
                <Card key={tech.name} className="transition-shadow hover:shadow-md">

                    <CardHeader className="flex flex-row items-center justify-between pb-2">

                        <span className="text-3xl" aria-label={tech.name}>{tech.icon}</span>

                        <Badge variant={badgeVariant(tech.category)}>
                            {tech.category}
                        </Badge>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-3">
                        <p className="text-sm font-semibold text-foreground">{tech.name}</p>

                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Proficiency</span>
                                <span>{tech.proficiency} / 5</span>
                            </div>
                            <Progress value={(tech.proficiency / 5) * 100} className="h-1.5"/>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}