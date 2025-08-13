"use server";

import { prisma } from "@/lib/prisma";

export async function createNewSong(
	_state: { status: string; message: string },
	formData: FormData,
) {
	const title = formData.get("title")?.toString();

	if (!title) {
		return {
			status: "error",
			message: "Le titre de la chanson est requis.",
		};
	}

	const textAndChords = formData.get("textAndChords")?.toString();
	if (!textAndChords) {
		return {
			status: "error",
			message: "Le texte et les accords sont requis.",
		};
	}

	const artistId = Number(formData.get("artistId"));
	if (!artistId || Number.isNaN(artistId)) {
		return {
			status: "error",
			message: "L'artiste est requis.",
		};
	}

	const difficulty = Number(formData.get("difficulty")?.toString());
	if (!difficulty || Number.isNaN(difficulty)) {
		return {
			status: "error",
			message: "La difficulté est requise.",
		};
	}

	try {
		const newSong = await prisma.song.create({
			data: {
				title,
				textAndChords,
				artistId,
				difficulty,
			},
		});

		if (!newSong) {
			return {
				status: "error",
				message: "Echec de la création de la chanson.",
			};
		}
		return {
			status: "success",
			message: newSong.id.toString(),
		};
	} catch (error) {
		console.error("Erreur lors de la création de la chanson :", error);
		return {
			status: "error",
			message: "Une erreur est survenue lors de la mise à jour de la chanson.",
		};
	}
}
