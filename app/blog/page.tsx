import { Post } from "@/types";
import { getAllPosts } from "@/utils/mdx";
import Link from "next/link";


export default async function BlogPage() {
    let posts: Post[] = []
    try {
        posts = await getAllPosts()
    } catch (err) {
        console.error("Failed to load posts: ", err)
    }

    return (
        <main className="max-w-2xl mx-auto px-4 py-10">
            
            {/* Page heading */}
            <h1 className="text-3xl font-bold mb-8">Blog</h1>
            {/* No Post */}
            {posts.length === 0 && (
                <p className="text-gray-500">No post yet. Check back soon</p>
            )}

            {/* List of post - one item per MDX file */}
            <ul className="flex flex-col gap-6">
                {posts.map((post) => (

                    //each post is a list item - keyed by unique slug
                    <li key={post.slug} className="border-b pb-4"> 

                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                            <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800">{post.title}</h2>
                        </Link>

                        <p className="text-sm text-gray-500 mt-1">
                            {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric", month: "long", day: "numeric"
                            })}
                        </p>

                        <p className="text-gray-700 mt-2">{post.description}</p>

                    </li>
                ))}
            </ul>
        </main>
    )
}