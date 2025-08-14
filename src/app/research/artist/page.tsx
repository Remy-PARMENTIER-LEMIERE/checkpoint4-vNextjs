import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "./../research.module.css";

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
			<form className={styles.form}>
				<input
					type="text"
					name="name"
					id="artist-input"
					defaultValue={(await searchParams)?.name || ""}
					placeholder="Rechercher un artiste..."
				/>
			</form>

			<h2 className={styles.resultsTitle}>Résultats</h2>
			<ul className={styles.resultsArtistList}>
				{artists.map((artist) => (
					<li key={artist.id}>
						<Link href={`/artist/${artist.id}`}>
							<figure>
								<Image
									src={artist.photo || "/music.jpg"}
									alt={artist.name}
									width={200}
									height={200}
									style={{ objectFit: "cover" }}
									loading="lazy"
								/>
								<figcaption>{artist.name}</figcaption>
							</figure>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
