"use client";

import ReactQueryProvider from "@/app/(movie-mate)/_providers/react-query";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
