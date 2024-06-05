'use client'
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn, formatRupiah } from "@/lib/utils"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Input
} from "@/components/ui/input"

import {
    InputMoney
} from "@/components/ui/input-money"

import {
    Button
} from "@/components/ui/button"

import { useState } from "react"

const simulatorFormSchema = z.object({
    price: z
        .string({
            required_error: "Masukan nominal penghasilan anda.",
        }),
    tenor: z
        .string({
            required_error: "Masukan jangka waktu kredit anda.",
        })
        .min(1, "Jangka waktu kredit minimal 1 tahun.")
        .max(25, "Jangka waktu kredit maksimal 25 tahun."),
    interest_rate: z.string({
        required_error: "Masukan suku bunga kredit anda.",
    }),
    other_loan: z.string().optional(),
    down_payment: z.string({
        required_error: "Masukan uang muka anda.",
    }),
})

type SimulationFormValues = z.infer<typeof simulatorFormSchema>

const defaultValues: Partial<SimulationFormValues> = {}

export default function Home() {
    const [installment, setInstallment] = useState(0)
    const [downPayment, setDownPayment] = useState(0)
    const [loanAmount, setLoanAmount] = useState(0)
    const [minimumIncome, setMinimumIncome] = useState(0)
    const [provisionCost, setProvisionCost] = useState(0)
    const [adminCost, setAdminCost] = useState(0)
    const [totalCost, setTotalCost] = useState(0)

    const form = useForm<SimulationFormValues>({
        resolver: zodResolver(simulatorFormSchema),
        defaultValues,
        mode: "onChange",
    })

    function onSubmit(data: SimulationFormValues) {
        const price = parseInt((data.price || '0').replaceAll('.', ''))
        const downPayment = parseInt((data.down_payment || '0').replaceAll('.', ''))
        const minimumDownPayment = price * 0.1
        const tenor = parseInt(data.tenor || '0') * 12
        const interestRate = parseFloat(data.interest_rate || '0')
        const otherLoan = parseInt(data.other_loan || '0')

        //validate
        if (downPayment < minimumDownPayment) {
            toast("Perhatikan Uang Muka", {
                description: `Uang muka minimal 10% dari harga rumah (${formatRupiah(minimumDownPayment)})`,
            })
            return
        }

        const monthlyInterestRate = (interestRate / 12) / 100

        const loanAmount = price - downPayment

        const installment = loanAmount * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -tenor)))
        const minimumIncome = (installment * 3) + otherLoan
        const provisionCost = loanAmount * 0.01
        const adminCost = 500000 // based on majority bank in Indonesia
        const totalCost = downPayment + provisionCost + adminCost

        setDownPayment(downPayment)
        setLoanAmount(loanAmount)
        setInstallment(installment)
        setMinimumIncome(minimumIncome)
        setProvisionCost(provisionCost)
        setAdminCost(adminCost)
        setTotalCost(totalCost)
    }

    return (
        <div className="lg:max-w-screen-lg md:max-w-screen-md mx-auto space-y-6 p-10 pb-16 md:block">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Simulasi KPR Indonesia</h2>
                <p className="text-muted-foreground">
                    Kalkulator simulasi perhitungan KPR mulai dari bunga, cicilan perbulan hingga total biaya selama mencicil.
                </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <div className="flex-1 lg:max-w-2xl">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Harga Rumah</FormLabel>
                                        <FormControl>
                                            <InputMoney placeholder="100.000.000" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Masukan harga rumah yang ingin anda cari / beli.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="down_payment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Uang Muka</FormLabel>
                                        <FormControl>
                                            <InputMoney placeholder="100.000.000" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Masukan uang muka yang sudah anda siapkan, rekomendasi 30% dari harga rumah.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="other_loan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cicilan Lainnya</FormLabel>
                                        <FormControl>
                                            <InputMoney defaultValue={0} placeholder="0" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Jika anda memiliki cicilan lainnya, masukan nilai angsurannya.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tenor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jangka Waktu / Tenor (Tahun)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="0" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Jangka waktu kredit, sesuai dengan peraturan yang ada saat ini maksimal 25 tahun.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="interest_rate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Suku Bunga Kredit</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="0" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Hitung Simulasi Kredit</Button>
                        </form>
                    </Form>
                </div>
                <div className="flex-1 lg:max-w-2xl">
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                        <div className="flex-1 lg:max-w-2xl">
                            <div className="space-y-0.5 my-5">
                                <p className="text-muted-foreground">Angsuran</p>
                                <h4 className="text-2xl font-bold tracking-tight">{formatRupiah(installment)}</h4>
                            </div>
                        </div>
                        <div className="flex-1 lg:max-w-2xl">
                            <div className="space-y-0.5 my-5">
                                <p className="text-muted-foreground">Uang Muka</p>
                                <h4 className="text-2xl font-bold tracking-tight">{formatRupiah(downPayment)}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                        <div className="flex-1 lg:max-w-2xl">
                            <div className="space-y-0.5 my-5">
                                <p className="text-muted-foreground">Pokok Hutang</p>
                                <h4 className="text-2xl font-bold tracking-tight">{formatRupiah(loanAmount)}</h4>
                            </div>
                        </div>
                        <div className="flex-1 lg:max-w-2xl">
                            <div className="space-y-0.5 my-5">
                                <p className="text-muted-foreground">Minimum Pendapatan</p>
                                <h4 className="text-2xl font-bold tracking-tight">{formatRupiah(minimumIncome)}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                        <div className="flex-1 lg:max-w-2xl">
                            <div className="space-y-0.5 my-5">
                                <p className="text-muted-foreground">(Est 1%) Biaya Provisi</p>
                                <h4 className="text-2xl font-bold tracking-tight">{formatRupiah(provisionCost)}</h4>
                            </div>
                        </div>
                        <div className="flex-1 lg:max-w-2xl">
                            <div className="space-y-0.5 my-5">
                                <p className="text-muted-foreground">Biaya Administrasi </p>
                                <h4 className="text-2xl font-bold tracking-tight">{formatRupiah(adminCost)}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-0.5 my-5">
                        <p className="text-muted-foreground">(Est) Total Biaya</p>
                        <h4 className="text-2xl font-bold tracking-tight">{formatRupiah(totalCost)}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}