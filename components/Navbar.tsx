'use client'

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">

        <Link href="/" className="text-white font-bold text-lg">ABC</Link>

        {/* Desktop */}
        <ul className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-zinc-400 text-sm hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden text-zinc-400 hover:text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-800 px-4 py-4">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 text-sm hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}