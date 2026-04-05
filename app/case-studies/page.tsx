import { getCaseStudies } from "@/utils/mdx";
import { CaseStudy } from "@/types";
import Link from "next/link";



export default async function CaseStudiesPage() {
    const caseStudies: CaseStudy[] = await getCaseStudies()

    return (
        <main className="min-h-screen px-4 py-12 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
                Case Studies
            </h1>
            <p className="text-gray-500 mb-10 text-sm">Real problems. Real solutions. Mesurable results.</p>

            {/* if no case study */}
            {caseStudies.length === 0 ? (
                <p className="text-gray-400 text-sm">No case studies yet.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {caseStudies.map((study) => (
                        <li key={study.slug} className="py-6">
                            <Link href={`/case-studies/${study.slug}`} className="group block">
                                <h2 className="text-lg font-semibold text-gray-900 group-hover:underline">{study.title}</h2>
                                <p className="text-xs text-gray-400 mt-1">{study.date}</p>
                                <p className="text-sm text-gray-600 mt-2">{study.summary}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}