import ResearchSelector from "@/app/research/ResearchSelector";

export default function SearchLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main>
			<ResearchSelector />
			{children}
		</main>
	);
}
