"use client";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleSubmitTextAndChords } from "@/actions/song/actions";

const initialState = {
	status: "",
	message: "",
};

export default function LyricsAndChords({
	song,
}: {
	song: {
		id: number;
		textAndChords: string;
	};
}) {
	const [isModifying, setIsModifying] = useState(false);

	const [state, action, isPending] = useActionState(
		handleSubmitTextAndChords.bind(null, song.id),
		initialState,
	);

	useEffect(() => {
		if (state?.status === "success") {
			toast.success(state.message);
			setIsModifying(false);
		} else if (state?.status === "error") {
			toast.error(state.message);
		}
	}, [state]);

	return (
		<section>
			{isModifying ? (
				<form action={action}>
					<textarea
						name="textAndChords"
						id="text_and_chords_input"
						defaultValue={song.textAndChords}
					/>
					{isPending && <p>Modification en cours...</p>}
					<button type="submit">Valider</button>
					<button
						type="button"
						onClick={() => {
							setIsModifying(false);
						}}
					>
						Annuler
					</button>
				</form>
			) : (
				<>
					<button type="button" onClick={() => setIsModifying(true)}>
						Modifier
					</button>
					<p>{song.textAndChords}</p>
				</>
			)}
		</section>
	);
}
