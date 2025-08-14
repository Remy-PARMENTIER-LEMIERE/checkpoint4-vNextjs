"use client";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { deleteSong } from "@/actions/song/actions";
import styles from "./SongPage.module.css";

const initialState = {
	status: "",
	message: "",
};

export default function SongHeader({
	song,
}: {
	song: {
		id: number;
		title: string;
		difficulty: number;
		artist: { name: string; photo?: string; id: number };
	};
}) {
	const [state, action, isPending] = useActionState(
		deleteSong.bind(null, song.id),
		initialState,
	);

	useEffect(() => {
		if (state?.status === "success") {
			toast.success(state.message);
			toast.info("Redirection vers la page de la chanson...", {
				autoClose: 1000,
			});
			setTimeout(() => {
				redirect(`/artist/${song.artist.id}`);
			}, 1500);
		} else if (state?.status === "error") {
			toast.error(state.message);
		}
	}, [state, song.artist.id]);

	return (
		<section className={styles.songHeader}>
			<Image
				src={song.artist.photo || "/music.jpg"}
				alt={song.artist.name}
				width={300}
				height={300}
				style={{ objectFit: "cover" }}
			/>
			<div>
				<h1>{song.title}</h1>
				<form action={action}>
					<button type="submit" disabled={isPending}>
						{!isPending ? "Supprimer" : "Suppression..."}
					</button>
				</form>
				<Link href={`/artist/${song.artist.id}`}>{song.artist.name}</Link>
				<p>Difficulté: {song.difficulty}</p>
			</div>
		</section>
	);
}
