
//post represents  a single MDX blog post or case study and used in blog listing, single post page, and MDX utitlities
export interface Post  {
    slug: string
    title: string
    date: string
    description: string
    tags?: string[]
    published: boolean
    content: string
}

//post without content field, used in listing page
export type PostMeta = Omit<Post, "content"> //give me post and remove content

//project represents a portfolio project or case study entry and use in project section and stack breakdown feature
export interface Project {
    slug: string;
    title: string;
    description: string;
    stack: string[]
    links: {
        live?: string;
        github?: string
    }
    featured: boolean
}

//with problem-solution structure used in problem-solution feature
export interface CaseStudy extends Post {
    problem: string
    solution: string
    outcome: string
    projectSlug?: string
}


//stack category is union type for grouping stack items and case sensitive
export type StackCategory =
    | "Frontend"
    | "Backend"
    | "Database"
    | "DevOps"
    | "Testing"
    | "Other";


//stackitem for stack breakdown and use in stack breakdown feature per project
export interface StackItem {
    _id?: string
    name: string;
    category: StackCategory;
    url?: string
    proficiency: number
    projectIds: string[]
}

export interface TechStack extends Document{
    name: string
    category: string
    // icon: string
    proficiency: number
    projectIds: string[]
}


//system status represents a live health of a service/project and used in automated system status feature
export interface SystemStatus {
    service: string;
    status: StatusLevel;
    latency?: number;
    checkedAt: string
}

//status level is union type and keeps status values consistent across all status components
export type StatusLevel = 
    | "operational" //everything is working normally
    | "degraded" //working but slower 
    | "outage"; //completely down

//api response is wrapper for all APi route response, both success and error returns
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string
}