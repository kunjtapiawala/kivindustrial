import type { Metadata } from "next";
import Header from "@/components/header";
import CatalogPageClient from "@/components/catalog-page-client";

export const metadata: Metadata = {
  title: "Catalog | KIV Industrial Parts",
  description:
    "Browse every electrical, industrial, and automation category KIV Industrial Parts sources with blind shipping and easy payment options.",
};

const CatalogPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <CatalogPageClient />
    </div>
  );
};

export default CatalogPage;
