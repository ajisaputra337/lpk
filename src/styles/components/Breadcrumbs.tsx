"use client";

import { Link } from "../../i18n/routing";
import { ChevronRight, Home } from "lucide-react";
import { useTranslations } from "next-intl";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items = [] }: BreadcrumbsProps) {
    const t = useTranslations("Breadcrumbs");

    return (
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 py-4">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li className="flex items-center">
                    <Link href="/" className="hover:text-red-700 flex items-center transition-colors">
                        <Home className="h-4 w-4 mr-1" />
                        <span className="sr-only">{t("home")}</span>
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center">
                        <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
                        {index === items.length - 1 ? (
                            <span className="font-bold text-red-700" aria-current="page">
                                {item.label}
                            </span>
                        ) : (
                            <Link href={item.href} className="hover:text-red-700 transition-colors">
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>

            {/* Schema.org BreadcrumbList */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            {
                                "@type": "ListItem",
                                position: 1,
                                name: t("home"),
                                item: `${window.location.origin}/`,
                            },
                            ...items.map((item, index) => ({
                                "@type": "ListItem",
                                position: index + 2,
                                name: item.label,
                                item: `${window.location.origin}${item.href}`,
                            })),
                        ],
                    }),
                }}
            />
        </nav>
    );
}
