"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
	{ href: "/research/artist", label: "Artiste" },
	{ href: "/research/song", label: "Chanson" },
];

export default function ResearchSelector() {
	const location = usePathname();
	return (
		<div className="research-selector">
			{links.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className={location === link.href ? "active" : undefined}
				>
					{link.label}
				</Link>
			))}
		</div>
	);
}
