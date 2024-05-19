import {
    Share,
} from "lucide-react"
import {ModeToggle} from "@/components/apps/themechanger"
import { Button } from "@/components/ui/button"

import Link from "next/link"
import {MenuHeader } from "@/components/apps/menu"

export default function HeaderPage() {
    return (

        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold mr-3">
                <Link href="/">
                    Menghitung Hidup
                </Link>
            </h1>
            <MenuHeader/>
            <ModeToggle/>
            <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-sm"
            >
                <Share className="size-3.5" />
                Share
            </Button>
        </header>
    )
}