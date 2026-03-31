import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type {Post} from "@/types/index"

// path to content/blog directory - reused by both functions
const contentDirectory = path.join(process.cwd(), "content/blog")

//return sorted array of all posts with frontmatter only (no content)
export function getAllPosts(): Post[] {

    if(!fs.existsSync(contentDirectory)) return []

    return fs
        .readdirSync(contentDirectory)  //read all files in the folder

        .filter(f => f.endsWith(".mdx"))  //keep only .mdx files

        .map(filename => {
            const raw = fs.readFileSync( //read file as utf string
                path.join(contentDirectory, filename), "utf-8"
            )

            const {data: frontmatter} = matter(raw) //extract YAML frontmatter, discard content

            const slug = filename.replace(/\.mdx$/, "") //strip .mdx extension to get slug

            return {slug, ...frontmatter} as Post //return slug + all fontmatter fields
        })

        .sort((a, b) =>  //sort newest first
            new Date(b.date).getTime() - new Date(a.date).getTime())
}

//returns single post with frontmatter + complied MDX content
export async function getPostBySlug(slug: string): Promise<Post> {
    
    const filepath = path.join(contentDirectory, `${slug}.mdx`)  //build full path from slug
    
    if(!fs.existsSync(filepath)) {
        throw new Error(`Post not found: ${slug}`)
    }

    const raw = fs.readFileSync(filepath, "utf-8") //read .mdx file as a string

    const {data: frontmatter, content: body} = matter(raw) //split into frontmatter + MDX body

    return {slug, ...frontmatter, content: body} as Post //return single post with content include
}