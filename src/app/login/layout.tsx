import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Login Admin | LPK Aishiro Gakuen",
    description: "Secure Admin Login Area",
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} min-h-screen bg-gray-50 antialiased`}>
                {children}
            </body>
        </html>
    );
}
