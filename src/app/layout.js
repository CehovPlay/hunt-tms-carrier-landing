import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "huntTMS for Carriers — Run your fleet from one command center",
  description:
    "The carrier-side TMS by LoadHunter. Dispatch, loads, invoicing, factoring, expenses, payroll, driver compliance and a live map — automated by AI, in one place.",
  keywords: ["carrier TMS", "trucking software", "fleet management", "dispatch", "invoicing", "factoring", "payroll", "LoadHunter"],
  openGraph: {
    title: "huntTMS for Carriers",
    description: "Run your fleet from one command center — dispatch, billing, payroll and compliance, automated by AI.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-dvh bg-deep-space font-body text-starlight antialiased">
        {children}
      </body>
    </html>
  );
}
