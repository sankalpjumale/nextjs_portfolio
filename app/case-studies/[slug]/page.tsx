import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout"
import { CaseStudy } from "@/types"
import { getCaseStudies, getCaseStudyBySlug } from "@/utils/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"

interface PageProps {
    params: {slug: string}
}

export async function generateStaticParams() {
    const caseStudies: CaseStudy[] = await getCaseStudies()

    return caseStudies.map((study) => ({slug: study.slug}))
}


export default async function CaseStudyPage({params}: PageProps) {
    const {slug} = params

    const result = await getCaseStudyBySlug(slug)

    if(!result) notFound()

    // const {frontmatter, content} = result
    const {meta, content} = result

    return (
        <main className="min-h-screen px-4 py-12 max-w-2xl mx-auto">
            <CaseStudyLayout metadata={meta}>
                <MDXRemote source={content} />
            </CaseStudyLayout>
        </main>
    )
}