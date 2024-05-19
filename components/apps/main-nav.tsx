"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Badge } from "@/components/ui/badge"

export function MainNav() {
    const pathname = usePathname()

    return (
        <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <Icons.logo className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">
                    HitungSemua
                </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm lg:gap-6">
                <Link
                    href="/investasi"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname?.startsWith("/investasi") ? "text-foreground" : "text-foreground/60"
                    )}
                >
                    Investasi
                </Link>
            </nav>
        </div>
    )
}