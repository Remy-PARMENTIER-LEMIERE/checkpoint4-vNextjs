import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SearchArtist({
	searchParams,
}: {
	searchParams: Promise<{ name?: string }>;
}) {
	const artists = await prisma.artist.findMany({
		where: { name: { contains: (await searchParams)?.name || "" } },
	});

	return (
		<>
			<form>
				<input
					type="text"
					name="name"
					id="artist-input"
					defaultValue={(await searchParams)?.name || ""}
				/>
			</form>

			<h2>Résultats</h2>
			<ul>
				{artists.map((artist) => (
					<li key={artist.id}>
						<Link href={`/artist/${artist.id}`}>{artist.name}</Link>
					</li>
				))}
			</ul>
		</>
	);
}
