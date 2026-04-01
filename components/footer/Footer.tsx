import Link from "next/link";


interface FooterLiink {
    label: string;
    href: string;
    external?: boolean
}

const NAV_LINKS: FooterLiink[] = [
    {label: "Home", href: "/"},
    {label: "Blog", href: "/blog"},
    {label: "Projects", href: "/projects"},
    {label: "Contact", href: "/contact"}
]

const SOCIAL_LINKS: FooterLiink[] = [
    {label: "Github", href: "https://github.com", external: true},
    {label: "Twitter", href: "https://twitter.com", external: true},
    {label: "LinkedIn", href: "https://linkedin.com", external: true},
]

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-gray-200 mt-auto py-6 px-4">

            <div className="max-w-4xl mx-auto flex flex-col gap-4">

                <div className="flex flex-col sm:flex-row sm:justify-between gap-3">

                    <nav className="flex flex-wrap gap-4">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <nav className="flex flex-wrap gap-4">
                        {SOCIAL_LINKS.map((link) => (
                            <Link 
                                key={link.href}
                                href={link.href}
                                target = "_blank"
                                rel ="noopener noreferrer"
                                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <p className="text-xs text-gray-400">
                    © {currentYear} ABC. All rights reserved.
                </p>

            </div>
        </footer>
    )
}