import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "hunterTMS for Carriers — Run your fleet from one platform",
  description:
    "The carrier-side TMS by LoadHunter. Dispatch, loads, invoicing, factoring, expenses, payroll, driver compliance and a live map — automated by AI, in one place.",
  keywords: ["carrier TMS", "trucking software", "fleet management", "dispatch", "invoicing", "factoring", "payroll", "LoadHunter"],
  openGraph: {
    title: "hunterTMS for Carriers",
    description: "Run your fleet from one platform — dispatch, billing, payroll and compliance, automated by AI.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-dvh bg-bg font-body text-body antialiased">
        {children}
      </body>
    </html>
  );
}
