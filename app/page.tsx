import {
  Info
} from "lucide-react"

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header"

import { Button } from "@/components/ui/button"
import { ButtonHeading } from "@/components/ui/button-heading"

export default function Home() {
  return (
        <main className="mx-auto my-10 ">
          <PageHeader>
            <ButtonHeading>
              <span>Aplikasi lainnya</span>
              </ButtonHeading>
            <PageHeaderHeading className="mt-5">Hitung hidupmu, Hidup lebih tertata</PageHeaderHeading>
            <PageHeaderDescription>
            Solusi pengelolaan keuangan yang indah dan mudah digunakan. Siap pakai untuk semua orang. Fleksibel dan dapat disesuaikan.
            </PageHeaderDescription>
          </PageHeader>       
        </main>
  )
}
