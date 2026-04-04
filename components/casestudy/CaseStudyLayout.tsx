import { CaseStudy } from "@/types"


type CaseStudyLayoutProps = {
    metadata: CaseStudy;
    children: React.ReactNode //render MDX content
}

export default function CaseStudyLayout({
    metadata,
    children
}: CaseStudyLayoutProps) {
    return (
        <div className="max-w-2xl mx-auto px-4 py-10">

            <div className="mb-8">
            {/* Header section */}
            <h1 className="text-2xl font-bold mb-2">{metadata.title}</h1>

            <p className="text-sm text-gray-500 mb-4">{metadata.date}</p>

            <p className="text-base text-gray-700">{metadata.summary}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
                {metadata.stack.map((tech) => (
                    <span key={tech} className="text-xs border border-gray-300 rounded px-2 py-1">{tech}</span>
                ))}
            </div>

            <hr className="mb-8"/>

            <div className="prose prose-sm max-w-none">{children}</div>
        </div>
    )
}