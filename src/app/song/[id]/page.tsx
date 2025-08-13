import LyricsAndChords from "@/app/song/[id]/LyricsAndChords";
import SongHeader from "@/app/song/[id]/SongHeader";
import { prisma } from "@/lib/prisma";

export default async function SongPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const song = await prisma.song.findUnique({
		where: { id: Number((await params).id) },
		include: {
			artist: true,
		},
	});

	if (!song) {
		return (
			<main>
				<p>Song not found</p>
			</main>
		);
	}

	return (
		<main>
			<SongHeader
				song={{
					...song,
					artist: {
						...song.artist,
						photo: song.artist.photo ?? undefined,
					},
				}}
			/>
			<LyricsAndChords
				song={{ id: song.id, textAndChords: song.textAndChords }}
			/>
		</main>
	);
}
