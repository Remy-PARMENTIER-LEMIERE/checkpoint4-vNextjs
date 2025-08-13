import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DetailledArtistPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const artistId = (await params).id;

	const artist = await prisma.artist.findUnique({
		where: { id: Number(artistId) },
		include: {
			songs: true,
		},
	});

	if (!artist) {
		notFound();
	}

	return (
		<main className="artist-page">
			<section className="details">
				<Image
					src={
						artist?.photo
							? artist.photo
							: "https://t4.ftcdn.net/jpg/05/32/74/31/360_F_532743182_BoEChfMkPfUjfzqzFP9Tm887nxLyhmIK.jpg"
					}
					alt={artist ? artist.name : "Avatar"}
					width={300}
					height={300}
					style={{ objectFit: "cover" }}
				/>
				<article>
					{artist && (
						<>
							<h1>{artist.name}</h1>
							<p>{artist.description}</p>
						</>
					)}
				</article>
			</section>
			<section className="songs">
				<h2>Ses titres :</h2>
				<ul>
					{artist?.songs?.map((song) => (
						<li key={song.id}>
							<Link href={`/song/${song.id}`}>{song.title}</Link>
							<p>
								Difficulté : <span>{song.difficulty}</span> 🎵
							</p>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
