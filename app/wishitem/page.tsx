"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import MoneyInput from "@/components/ui/money-input";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion";
import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
    MoreVertical,
} from "lucide-react"
import { formatCurrency } from "@/utils/currency";

const formSchema = z.object({
    bulan: z.string(),
    harga: z.number(),
    dp: z.string(),
    inflasi: z.string().optional(),
    aktual: z.number(),
    targetinvest: z.number(),
    returninvest: z.string()
});

interface State {
    hargaDP: number | null;
    pinjaman: number | null;
    pokok: number | null;
    total: number | null;
    bulanInvest: number | null;
    hasilInvest: number | null;
    totalInvest: number | null;
    bulan: number;
}

export default function WishItem() {
    const [state, setState] = useState<State>({
        hargaDP: null,
        pinjaman: null,
        pokok: null,
        total: null,
        bulanInvest: null,
        hasilInvest: null,
        totalInvest: null,
        bulan: 0
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bulan: "",
            harga: 0,
            dp: "",
            inflasi: "5",
            aktual: 0,
            targetinvest: 0,
            returninvest: "2",
        },
    });

    const calculateValues = (values: z.infer<typeof formSchema>) => {
        const bulan = Number(values.bulan);
        const harga = values.harga;
        const dp = Number(values.dp);
        const inflasi = Number(values.inflasi || "0");
        const returnInvest = Number(values.returninvest);
        const aktual = values.aktual;
        const targetPerBulan = values.targetinvest;

        const hargadp = harga * (dp / 100);
        const pinjaman = 100 - dp;
        const pokok = harga - hargadp;

        const inflasiBulanan = Math.pow(1 + inflasi / 100, 1 / 12) - 1;
        const total = Math.floor(hargadp * Math.pow(1 + inflasiBulanan, bulan));

        const monthlyReturnRate = Math.pow(1 + returnInvest / 100, 1 / 12) - 1;
        let futureValue = aktual;
        let months = 0;

        while (futureValue < hargadp) {
            futureValue = aktual * Math.pow(1 + monthlyReturnRate, months) + targetPerBulan * ((Math.pow(1 + monthlyReturnRate, months) - 1) / monthlyReturnRate);
            months++;
        }
        
        let totalInvestasi = 0
        // looping bulan
        for(let i=0; i < bulan; i++){
            totalInvestasi = aktual * Math.pow(1 + monthlyReturnRate, months) + targetPerBulan * ((Math.pow(1 + monthlyReturnRate, months) - 1) / monthlyReturnRate);
        }

        const hasilInvest = Math.floor(futureValue);

        setState({
            hargaDP: hargadp,
            pinjaman: pinjaman,
            pokok: pokok,
            total: total,
            bulanInvest: months,
            hasilInvest: hasilInvest,
            totalInvest: totalInvestasi,
            bulan: bulan,
        });
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        calculateValues(values);
    };

    return (
        <main className="mx-auto max-w-10xl grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-2">
            <div
                className="relative flex-col items-start gap-8 md:flex"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-start gap-6 mt-5">
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="bulan"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Berapa bulan</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Bulan" type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <MoneyInput
                                    form={form}
                                    label="Harga Barang"
                                    name="harga"
                                    placeholder="Harga barang"
                                />
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="dp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Berapa %DP yang ingin kamu bayarkan?</FormLabel>
                                            <FormControl>
                                                <Input placeholder="%DP" type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="inflasi"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Asumsi inflasi harga (% / tahun)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="inflasi (% / tahun)" type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /></div>
                        </div>
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <MoneyInput
                                    form={form}
                                    label="Uang yang kamu miliki"
                                    name="aktual"
                                    placeholder="Uang yang dimiliki"
                                /></div>
                            <div className="grid gap-3">
                            <MoneyInput
                                    form={form}
                                    label="Target Investasi tiap bulan"
                                    name="targetinvest"
                                    placeholder="target/bulan"
                                />
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                
                            <FormField
                                    control={form.control}
                                    name="returninvest"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Return produk investasi (% / tahun)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="return investasi (% / tahun)" type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
            <div className="relative flex-col items-start gap-8 md:flex">
                {state.hargaDP !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                        <Card
                            className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
                        >
                            <CardHeader className="flex flex-row items-start bg-muted/50">
                                <div className="grid gap-0.5">
                                    <CardTitle className="group flex items-center gap-2 text-lg">
                                        Hasil Perhitungan
                                    </CardTitle>
                                    <CardDescription></CardDescription>
                                </div>
                                <div className="ml-auto flex items-center gap-1">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="outline" className="h-8 w-8">
                                                <MoreVertical className="h-3.5 w-3.5" />
                                                <span className="sr-only">More</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Export</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Trash</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 text-sm">
                                <div className="grid gap-3">
                                    <div className="font-semibold">Data Pinjaman</div>
                                    <ul className="grid gap-3">
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                DP yang dibayarkan
                                            </span>
                                            <span>{formatCurrency(state.hargaDP)}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                % Pinjamanmu
                                            </span>
                                            <span>{state.pinjaman}%</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                Pokok Hutang
                                            </span>
                                            <span>{formatCurrency(state.pokok)}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                Total uang DP
                                            </span>
                                            <span>{formatCurrency(state.total)}</span>
                                        </li>
                                    </ul>
                                    <Separator className="my-2" />
                                    <ul className="grid gap-3">
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Bulan Investasi</span>
                                            <span>{state.bulanInvest}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Hasil Investasi</span>
                                            <span>{formatCurrency(state.hasilInvest)}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Total Investasi {state.bulan} bulan</span>
                                            <span>{formatCurrency(state.totalInvest)}</span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </div>
        </main>
    )
}