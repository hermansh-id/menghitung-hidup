'use client'
import {
    ShoppingBag,
    LifeBuoy,
    SquareUser,
    Triangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function Sidebar() {
    const pathname = usePathname()
    return (
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
            <div className="border-b p-2">
                <Button variant="outline" size="icon" aria-label="Home">
                    <Triangle className="size-5 fill-foreground" />
                </Button>
            </div>
            <nav className="grid gap-1 p-2">
                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`rounded-lg ${pathname === "/wishitem" ? 'bg-muted' : ''}`}
                            aria-label="Playground"
                        >
                            <Link href="/wishitem">
                                <ShoppingBag className="size-5" />
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Barang Impian
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>
            </nav>
            <nav className="mt-auto grid gap-1 p-2">
                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mt-auto rounded-lg"
                            aria-label="Help"
                        >
                            <a href="https://hermansh.my.id" target="_blank" rel="noopener noreferrer">
                            <LifeBuoy className="size-5" />
                            </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Aplikasi Lainnya
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    )
}