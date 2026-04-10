import { getTechStack } from "@/services/techStackService"
import {StackItem} from "@/types/index"
import {create} from "zustand"


interface TechStackState {
    stacks: StackItem[]
    filteredStacks: StackItem[]
    activeCategory: string
    loading: boolean
    error: string | null

    fetchStacks: () => Promise<void>
    filterByCategory: (category: string) => void
    resetFilter: () => void
}

export const useTechStackStore = create<TechStackState>((set, get) => ({
    stacks: [],
    filteredStacks: [],
    activeCategory: "All",
    loading: false,
    error: null,

    fetchStacks: async () => {
        set({loading: true, error: null})

        try {
            const data = await getTechStack()
            set({
                stacks: data,
                filteredStacks: data,
                loading: false
            })
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to fetch tech stack"
            set({error: message, loading: false})
        }
    },

    filterByCategory: (category: string) => {
        const {stacks} = get()

        const filtered = category === "All"
            ? stacks
            : stacks.filter((stack) => stack.category === category)
            
        set({
            filteredStacks: filtered,
            activeCategory: category
        })
    },

    resetFilter: () => {
        const {stacks} = get()
        set({
            filteredStacks: stacks,
            activeCategory: "All"
        })
    }
}))