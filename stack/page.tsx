import TechStackFilter from "@/components/techstackfilter/TechStackFilter";
import TechStackGrid from "@/components/techstackgrid/TechStackGrid";
import { useTechStackStore } from "@/store/techStackStore";
import { useEffect, useState } from "react";


export default function StackPage() {

    const {stacks, loading, fetchStacks} = useTechStackStore()

    const [activeCategory, setActiveCategory] = useState<string>("All")

    useEffect(() => {
        fetchStacks
    }, [])

    const categories = [
        "All",
        ...Array.from(new Set(stacks.map((s) => s.category)))
    ]

    const filterStacks = 
        activeCategory === "All"
            ? stacks
            : stacks.filter((s) => s.category === activeCategory)

    return (
        <main className="min-h-screen bg-gray-950 text-white px-4 py-12 md:px-8 lg:px-16">

            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-white">Technical Stack</h1>
                <p className="mt-2 text-gray-400 text-sm">
                    Tools, language and frameworks I work work with - across all projects.
                </p>
            </div>

            {loading && (
                <p className="text-gray-500 text-sm">Loading stack data...</p>
            )}

            {!loading && (
                <>
                    <TechStackFilter 
                        categories={categories}
                        activeFilter={activeCategory}
                        onFilterChange={setActiveCategory}
                        stacks={stacks}
                    />
                    <div>
                        <TechStackGrid
                            stacks={filterStacks}
                            activeFilter={activeCategory}
                        />
                    </div>
                    {filterStacks.length === 0 && (
                        <p className="text-gray-500 text-sm mt-8">
                            No technologies found for this category
                        </p>
                    )}
                </>
            )}

        </main>
    )
}