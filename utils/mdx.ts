import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type {Post} from "@/types/index"

// path to content/blog directory - reused by both functions
const BLOG_DIR = path.join(process.cwd(), "content/blog")

//return sorted array of all posts with frontmatter only (no content)
export function getAllPosts(): Omit<Post, "content">[] {

    //read all filenames in the blog directory
    const files = fs.readdirSync(BLOG_DIR)

    //filter to only .mdx files
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"))

    //map each file and extract frontmatter
    const posts = mdxFiles.map((filename) => {

        //strip .mdx extension to get the slug
        const slug = filename.replace(".mdx", "")

        //build the full file path
        const filePath = path.join(BLOG_DIR, filename)

        //read raw file content
        const fileContent = fs.readFileSync(filePath, "utf-8")

        //only need data (frontmatter) not content
        const {data} = matter(fileContent)

        //return post object
        return {
            slug,
            title: data.title as string,
            date: data.date as string,
            description: data.description as string
        }
    })

    return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
}

//returns single post with frontmatter + complied MDX content
export async function getPostBySlug(slug: string): Promise<Post> {
    
    const filepath = path.join(BLOG_DIR, `${slug}.mdx`)  //build full path from slug
    
    if(!fs.existsSync(filepath)) {
        throw new Error(`Post not found: ${slug}`)
    }

    const raw = fs.readFileSync(filepath, "utf-8") //read .mdx file as a string

    const {data: frontmatter, content: body} = matter(raw) //split into frontmatter + MDX body

    return {slug, ...frontmatter, content: body} as Post //return single post with content include
}