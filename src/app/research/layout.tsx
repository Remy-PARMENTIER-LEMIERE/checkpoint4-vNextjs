import ResearchSelector from "@/component/research/ResearchSelector";

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
