"use client";

import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { createNewArtist } from "@/actions/new/artist/actions";

const initialState = {
	status: "",
	message: "",
};

export default function NewArtistPage() {
	const [state, action, isPending] = useActionState(
		createNewArtist,
		initialState,
	);

	useEffect(() => {
		if (state.status === "success") {
			toast.success("Artiste créé avec succès !");
			toast.info("Redirection vers la page de l'artiste...", {
				autoClose: 1000,
			});
			setTimeout(() => {
				redirect(`/artist/${state.message}`);
			}, 1500);
		} else if (state?.status === "error") {
			toast.error(state.message);
		}
	}, [state]);

	return (
		<main className="new-artist-page">
			<h1>Ajouter un nouvel artiste</h1>
			<form action={action}>
				<div className="input-group">
					<label htmlFor="artist-name-input">Nom de l'artiste</label>
					<input
						type="text"
						placeholder="Nom..."
						id="artist-name-input"
						name="name"
						required
						maxLength={120}
					/>
				</div>

				<div className="input-group">
					<label htmlFor="artist-photo-input">Photo de l'artiste</label>
					<input
						type="url"
						placeholder="Lien (URL)..."
						id="artist-photo-input"
						name="photo"
						maxLength={255}
					/>
				</div>

				<div className="input-group">
					<label htmlFor="artist-description-input">Description</label>
					<textarea
						placeholder="Description..."
						name="description"
						id="artist-description-input"
						maxLength={750}
					/>
				</div>

				<button type="submit">Valider</button>

				{isPending && <p>Enregistrement en cours...</p>}
			</form>
		</main>
	);
}
