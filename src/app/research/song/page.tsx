import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SearchSong({
	searchParams,
}: {
	searchParams: Promise<{ title?: string }>;
}) {
	const songs = await prisma.song.findMany({
		where: { title: { contains: (await searchParams)?.title || "" } },
	});

	return (
		<>
			<form>
				<input
					type="text"
					name="title"
					id="song-input"
					defaultValue={(await searchParams)?.title || ""}
				/>
			</form>

			<h2>Résultats</h2>
			<ul>
				{songs.map((song) => (
					<li key={song.id}>
						<Link href={`/song/${song.id}`}>{song.title}</Link>
					</li>
				))}
			</ul>
		</>
	);
}
