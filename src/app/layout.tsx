import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
// import ReduxProviders from "@/utils/ReduxProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ticket Booking",
  description: "Ticket Booking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        data-new-gr-c-s-check-loaded="14.1235.0"
        data-gr-ext-installed=""
        cz-shortcut-listen="true"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <ReduxProviders> */}
          <Header></Header>
          {children}
          <Footer></Footer>
        {/* </ReduxProviders> */}
      </body>
    </html >
  );
}
