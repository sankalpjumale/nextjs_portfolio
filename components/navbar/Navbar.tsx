'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

type OverallStatus = "up" | "degraded" | "down" | "loading"

interface ServiceStatus {
  name: string
  status: "up" | "degraded" | "down"
}

interface NavLink {
    label: string
    href: string
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Case Study", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Stacks", href: "/stack" },
  { label: "Status", href: "/status" },
  { label: "Contact", href: "/contact" },
]

function StatusBadge({status}: {status: OverallStatus}) {

  const colorMap: Record<OverallStatus, string> = {
    up: "bg-emerald-400",
    degraded: "bg-yellow-400",
    down: "bg-red-500",
    loading: "bg-zinc-500"
  }

  const labelMap: Record<OverallStatus, string> = {
    up: "All system operational",
    degraded: "Partial degradation",
    down: "Services disruption",
    loading: "Checking status...",
  }

  return (
    <span
      title={labelMap[status]}
      className="flex items-center gap-1.5 cursor-default"
    >
      <span className="relative flex h-2 w-2">
        {status !== "loading" && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${colorMap[status]}`}/>
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${colorMap[status]}`}/>
      </span>
    </span>
  )
}

function useSystemStatus(): OverallStatus {
  const [status, setStatus] = useState<OverallStatus>("loading")

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch("/api/status")

        if (!response.ok) {
          setStatus("down")
          return
        }

        const services: ServiceStatus[] = await response.json()

        if (services.some((s) => s.status === "down")) {
          setStatus('down')
        } else if (services.some((s) => s,status === "degraded")){
          setStatus("degraded")
        } else {
          setStatus('down')
        }
      } catch (error) {
        setStatus("down")
      }
    }

    fetchStatus()

    const interval = setInterval(fetchStatus, 60000)

    return () => clearInterval(interval)
  }, [])

  return status
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const systemStatus = useSystemStatus()

  return (
    <nav className="w-full sticky top-0 z-50 bg-zinc-950/75 border-b border-white/5 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">

        <Link href="/" className="text-white font-mono text-lg font-bold tracking-tight hover:text-zinc-300 transition-colors">ABC</Link>

        {/* Desktop */}
        <ul className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>

              {link.href === "/status" ? (
                <Link href={link.href} className="text-zinc-400 text-sm font-medium hover:text-white transition-colors">
                  {link.label}
                  <StatusBadge status={systemStatus} />
                </Link>
              ) : (
                <Link 
                  href={link.href}
                  className="text-zinc-400 text-sm font-medium hover:text-white transition-colors"
                >{link.label}</Link>
              )}
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

                {link.href === "/status" ? (
                  <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 text-sm hover:text-white"
                >
                  {link.label}
                  <StatusBadge status={systemStatus} />
                </Link>
                ) : (
                  <Link 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-zinc-400 text-sm hover:text-white"
                  >{link.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}







