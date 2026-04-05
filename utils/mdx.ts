import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type {CaseStudy, Post} from "@/types/index"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"

// path to content/blog directory - reused by both functions
const BLOG_DIR = path.join(process.cwd(), "content/blog")

//path case study folder
const CASE_STUDY_DIR = path.join(process.cwd(), "content/case-studies")

//return sorted array of all posts with frontmatter only (no content)
//return PostMeta[] - no content, correct for list pages
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
            description: data.description as string,
            published: data.published as boolean
        }
    })

    return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
}

//returns single post with frontmatter + complied MDX content
//return Post - includes content, correct for single post page
export async function getPostBySlug(slug: string): Promise<Post> {
    
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`)  //build full path from slug

    if(!fs.existsSync(filePath)) {
        throw new Error(`Post not found: ${slug}`)
    }

    const fileContent = await fs.readFileSync(filePath, "utf-8")

    const {data, content} = matter(fileContent)

    return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        published: data.published as boolean,
        content //raw MDX string - rendered by next-mdx-remote in [slug]/page.tsx
    }
}

export function getCaseStudies(): CaseStudy[] {
    const files = fs.readdirSync(CASE_STUDY_DIR)

    const caseStudies = files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
            const slug = file.replace(/\.mdx$/, '')

            const raw = fs.readFileSync(path.join(CASE_STUDY_DIR, file), 'utf-8')

            const {data} = matter(raw)

            return {
                slug,
                title: data.title ?? 'Untitled',
                date: data.date ?? '',
                summary: data.summary ?? '',
                stack: data.stack ?? [],
            } as CaseStudy
        })

    return caseStudies.sort((a,b) => (a.date < b.date ? 1 : -1))
}

//read case study by slug, returns content + metadata
export async function getCaseStudyBySlug(slug: string) {
    const filePath = path.join(CASE_STUDY_DIR, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    // const {data, content} = matter(fileContent)
    const {frontmatter, content} = await compileMDX({
        source: fileContent,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight, rehypeSlug]
            }
        }
    })

    return {
        meta: frontmatter as CaseStudy,
        content
    }
}