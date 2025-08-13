"use client";

import {
	Combobox,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
	Field,
	Fieldset,
	Input,
	Label,
	Legend,
	Textarea,
} from "@headlessui/react";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createNewSong } from "@/actions/new/song/actions";

const initialState = {
	status: "",
	message: "",
};

export default function NewSongPage() {
	const [artists, setArtists] = useState<{ id: string; name: string }[]>([]);
	useEffect(() => {
		fetch("/api/artist")
			.then((response) => response.json())
			.then((data) => {
				setArtists(data);
			})
			.catch((error) => {
				console.error("Erreur lors de la récupération des artistes :", error);
			});
	}, []);

	const [selectedArtist, setSelectedArtist] = useState<
		null | (typeof artists)[0]
	>(null);
	const [query, setQuery] = useState("");

	const filteredArtists =
		query === ""
			? artists
			: artists.filter((artist) => {
					return artist.name.toLowerCase().includes(query.toLowerCase());
				});

	const [state, action, isPending] = useActionState(
		createNewSong,
		initialState,
	);

	useEffect(() => {
		if (state.status === "success") {
			toast.success("Chanson créée avec succès !");
			toast.info("Redirection vers la page de la chanson...", {
				autoClose: 1000,
			});
			setTimeout(() => {
				redirect(`/song/${state.message}`);
			}, 1500);
		} else if (state?.status === "error") {
			toast.error(state.message);
		}
	}, [state]);

	return (
		<main className="new-song-page">
			{artists.length === 0 ? (
				<h1>
					Il n'existe aucun artiste en base de données. Veuillez en ajouter un
					pour pouvoir lui assigner une chanson !
				</h1>
			) : (
				<form action={action}>
					<Fieldset>
						<Legend>
							<h1>Ajouter une nouvelle chanson</h1>
						</Legend>

						<Field>
							<Label htmlFor="song-title">Titre de la chanson</Label>
							<Input id="song-title" name="title" required />
						</Field>

						<Field>
							<Label htmlFor="song-artist">Artiste</Label>
							<Combobox
								value={selectedArtist}
								onChange={setSelectedArtist}
								onClose={() => setQuery("")}
							>
								<ComboboxInput
									id="song-artist"
									displayValue={(artist: (typeof artists)[0]) =>
										artist?.name || ""
									}
									onChange={(event) => setQuery(event.target.value)}
									autoComplete="off"
								/>
								<ComboboxOptions
									anchor="bottom"
									// className="border empty:invisible"
								>
									{filteredArtists.map((artist) => (
										<ComboboxOption
											key={artist.id}
											value={artist}
											// className="data-focus:bg-blue-100"
										>
											{artist.name}
										</ComboboxOption>
									))}
								</ComboboxOptions>
							</Combobox>
							<input
								type="number"
								name="artistId"
								value={selectedArtist?.id || ""}
								required
								hidden
								readOnly
							/>
						</Field>

						<Field>
							<Label htmlFor="difficulty">Difficulté</Label>
							<Input
								id="difficulty"
								name="difficulty"
								type="number"
								min={1}
								max={5}
								defaultValue={3}
							/>
						</Field>

						<Field>
							<Label htmlFor="song-text-and-chords">Texte et accords</Label>
							<Textarea
								id="song-text-and-chords"
								name="textAndChords"
								required
								rows={10}
							/>
						</Field>
					</Fieldset>

					<button type="submit">Ajouter</button>
					{isPending && <p>Enregistrement en cours...</p>}
				</form>
			)}
		</main>
	);
}
