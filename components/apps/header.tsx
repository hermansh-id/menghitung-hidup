import {
    Share,
    DraftingCompass
} from "lucide-react"
import { ModeToggle } from "@/components/apps/themechanger"
import { Button } from "@/components/ui/button"

import Link from "next/link"
import { MenuHeader } from "@/components/apps/menu"
import { CommandMenu } from "@/components/apps/command-menu"
import { MainNav } from "@/components/apps/main-nav"
import { MobileNav } from "@/components/apps/mobile-nav"

export default function HeaderPage() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <MainNav />
                <MobileNav />
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <CommandMenu />
                    </div>
                    <nav className="flex items-center">
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 text-sm"
                        >
                            <Share className="size-3.5" />
                            Share
                        </Button>
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}