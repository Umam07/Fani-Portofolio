import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fani | Product designer",
  description: "Product Designer with 3.5 years of experience in insurance, finance, SaaS, and telco. Focused on behavior-driven design and transforming complexity into impactful product experiences.",
  keywords: ["Product Designer", "UI/UX Designer", "Behavior-driven Design", "Fani Abdillah", "Jakarta", "Fintech", "SaaS", "Telco", "Insurance"],
  authors: [{ name: "Muhammad Fani Abdillah" }],
  openGraph: {
    title: "Fani | Product designer",
    description: "Product Designer with 3.5 years of experience solving real problems through scalable, behavior-driven design.",
    url: "https://faniabdillah.design", // Placeholder, user can update
    siteName: "Fani Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fani | Product designer",
    description: "Product Designer with 3.5 years of experience solving real problems through scalable, behavior-driven design.",
    creator: "@faniabdillah", // Placeholder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

