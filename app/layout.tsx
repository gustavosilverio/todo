import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/Header"
import { Providers } from "@/components/Providers/Providers"

const inter = Inter({
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Todo",
	description: "A simple and very robust App using modern technologies",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			suppressHydrationWarning
			lang="en"
		>
			<body className={`${inter.className}`}>
				<Providers>
					<Header />
					{children}
				</Providers>
			</body>
		</html>
	)
}
