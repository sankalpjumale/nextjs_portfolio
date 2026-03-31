export type Post = {
    slug: string
    title: string
    date: string
    description?: string
    content?: string
}

export type PostMeta = Omit<Post, "content"> //give me post and remove content

export type Project ={
    title: string;
    description: string;
    stack: string[]
    links: {
        live?: string;
        github?: string
    } 
}