import { SiteHeader } from "@/components/site-header";

import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=" h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex items-center h-full justify-center  w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
