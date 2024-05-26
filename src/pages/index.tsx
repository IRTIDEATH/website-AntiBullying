import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {data} = useSession()
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col items-center justify-center space-y-4 py-[10rem]">
        <h1 className="text-5xl text-black font-semibold">Stop Bullying</h1>
        <p className="text-black font-medium text-sm">Website laporan pembulian</p>
      </div>

      <div className="flex items-center justify-center">
        <h1 className="text-xl">Kena bully? Lapor sini : <Link href="/main" className="underline text-red-400">lapor</Link></h1>
      </div>
    </div>
  );
}
