
//post represents  a single MDX blog post or case study and used in blog listing, single post page, and MDX utitlities
export interface Post  {
    slug: string
    title: string
    date: string
    description: string
    tags?: string[]
    published: boolean
}

export type PostMeta = Omit<Post, "content"> //give me post and remove content

//project represents a portfolio project or case study entry and use in project section and stack breakdown feature
export interface Project {
    slug: string;
    title: string;
    description: string;
    stack: string[]
    liveUrl?: string;
    repoUrl: string
    featured: boolean
}

//case study extends post with problem/solution structure and use for the "problem-Solution" case study feature
export interface caseStudy extends Post {
    problem: string;
    solution: string;
    outcome: string;
    projectSlug?: string
}

//stackitem for stack breakdown and use in stack breakdown feature per project
export interface StackItem {
    name: string;
    category: StackCategory;
    url?: string
}

//stack category is union type for grouping stack items and case sensitive
export type StackCategory =
    | "Frontend"
    | "Backend"
    | "Database"
    | "DevOps"
    | "Testing"
    | "Other";


//system status represents a live health of a service/project and used in automated system status feature
export interface SystemStatus {
    services: string;
    status: StatusLevel;
    latency?: number;
    checkedAt: string
}

//status level is union type and keeps status values consistent across all status components
export type StatusLevel = 
    | "operational" //everything is working normally
    | "degraded" //working but slower 
    | "outrage"; //completely down


//api response is wrapper for all APi route response, both success and error returns
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string
}