"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function handleSubmitTextAndChords(
	songId: number,
	_state: { status: string; message: string },
	formData: FormData,
) {
	const textAndChords = formData.get("textAndChords")?.toString();
	if (!textAndChords) {
		return {
			status: "error",
			message: "Le texte et les accords sont requis.",
		};
	}

	try {
		const updatedSong = await prisma.song.update({
			where: { id: songId },
			data: { textAndChords: textAndChords },
		});

		if (!updatedSong) {
			return {
				status: "error",
				message: "La chanson n'a pas été trouvée.",
			};
		}

		revalidatePath(`/song/${songId}`);
		return {
			status: "success",
			message: "Les modifications ont été enregistrées.",
		};
	} catch (error) {
		console.error("Erreur lors de la mise à jour de la chanson :", error);
		return {
			status: "error",
			message: "Une erreur est survenue lors de la mise à jour de la chanson.",
		};
	}
}

export async function deleteSong(
	songId: number,
	_state: { status: string; message: string },
) {
	try {
		const deletedSong = await prisma.song.delete({
			where: { id: songId },
		});

		if (!deletedSong) {
			return {
				status: "error",
				message: "La chanson n'a pas été trouvée.",
			};
		}

		return {
			status: "success",
			message: "La chanson a été supprimée avec succès.",
		};
	} catch (error) {
		console.error("Erreur lors de la suppression de la chanson :", error);
		return {
			status: "error",
			message: "Une erreur est survenue lors de la suppression de la chanson.",
		};
	}
}
