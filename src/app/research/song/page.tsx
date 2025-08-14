import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "./../research.module.css";

export default async function SearchSong({
	searchParams,
}: {
	searchParams: Promise<{ title?: string }>;
}) {
	const songs = await prisma.song.findMany({
		where: { title: { contains: (await searchParams)?.title || "" } },
		include: { artist: true },
		orderBy: { title: "asc" },
	});

	console.log("songs", songs);

	return (
		<>
			<form className={styles.form}>
				<input
					type="text"
					name="title"
					id="song-input"
					defaultValue={(await searchParams)?.title || ""}
					placeholder="Rechercher une chanson..."
				/>
			</form>

			<h2 className={styles.resultsTitle}>Résultats</h2>
			<ul className={styles.resultsSongList}>
				{songs.map((song) => (
					<li key={song.id}>
						<Link href={`/song/${song.id}`}>
							<Image
								src={song.artist.photo || "/music.jpg"}
								alt={song.artist.name}
								width={56}
								height={56}
								style={{ objectFit: "cover" }}
							/>
							<div>
								<h3>{song.title}</h3>
								<Link href={`/artist/${song.artist.id}`}>
									<p>{song.artist.name}</p>
								</Link>
								<p>Difficulté : {song.difficulty}</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
