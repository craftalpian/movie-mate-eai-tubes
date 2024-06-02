import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oauth Login",
  description: "Cari temen nonton yuk!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={clsx(
        inter.className,
        "bg-gray-100 w-full h-screen justify-center items-center flex"
      )}
    >
      {children}
    </div>
  );
}
