import { getAllPosts, getPostBySlug } from "@/utils/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"


type Props = {
    params: Promise<{slug: string}>
}

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({slug: post.slug}))
}


export default async function BlogPostPage({params}: Props) {
    const {slug} = await params

    let post = null
    try {
     post = await getPostBySlug(slug)   
    } catch (err) {
        console.error(`Failed to load post "${slug}: `, err)
    }
    if(!post) return notFound()
    if(!post.content) return notFound()

    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    return (
        <main className="max-w-2xl mx-auto px-4 py-10">

            {/* post title from frontmatter */}
            <h1 className="text-3xl font-bold mb-2 ">{post.title}</h1>

            {/* post date from frontmatter */}
            <p className="text-sm text-gray-500 mb-8">
                {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric"
                })}
            </p>

            {/* rendered MDX content */}
            <article className="prose prose-neutral max-w-none">
                <MDXRemote source={post.content} />
            </article>
        </main>
    )
}