import NavListItem from "@frontend/components/nav-list-item";
import NavTodos from "@frontend/components/nav-todos";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LogoutBtn from "@frontend/components/logout-btn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo List App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " h-[100vh]"}>
        <div className="m-0 h-full flex flex-row">
          <nav className="border-r-2 border-gray-300 w-64 h-full">
            <input
              type="search"
              placeholder="search..."
              className="flex p-4 bg-gray-200"
            />
            <NavListItem href="/my-day" label="My Day" />
            <NavTodos />
            <LogoutBtn />
          </nav>
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
