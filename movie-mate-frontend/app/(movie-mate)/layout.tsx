"use client";

import Header from "./_components/header";
import ReactQueryProvider from "./_providers/react-query";
import ReduxProvider from "./_providers/store-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        <div className="max-w-sm bg-white mx-auto h-screen">
          <Header />
          {children}
        </div>
      </ReactQueryProvider>
    </ReduxProvider>
  );
}
