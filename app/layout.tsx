import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Ktp Checker and Faker",
	description: "Indonesian unofficial national ID checker and generator",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
