import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Admin LPK Aishiro Gakuen",
    description: "Dashboard Admin LPK Aishiro Gakuen",
};

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id">
            <body className={`${inter.className} min-h-screen bg-gray-100`}>
                {children}
            </body>
        </html>
    );
}
