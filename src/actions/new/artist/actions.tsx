"use server";

import { prisma } from "@/lib/prisma";

export async function createNewArtist(
	_state: { status: string; message: string },
	formData: FormData,
) {
	const name = formData.get("name")?.toString();
	if (!name) {
		return {
			status: "error",
			message: "Le nom de l'artiste est requis.",
		};
	}

	const photo = formData.get("photo")?.toString() || null;

	if (photo && !/^https?:\/\//.test(photo)) {
		return {
			status: "error",
			message: "L'URL de la photo doit commencer par http:// ou https://.",
		};
	}

	const description = formData.get("description")?.toString() || null;

	if (description && description.length > 750) {
		return {
			status: "error",
			message: "La description ne doit pas dépasser 750 caractères.",
		};
	}

	try {
		const existingArtist = await prisma.artist.findFirst({
			where: { name },
		});
		if (existingArtist) {
			return {
				status: "error",
				message: "Un artiste avec ce nom existe déjà.",
			};
		}
		const newArtist = await prisma.artist.create({
			data: {
				name,
				photo,
				description,
			},
		});

		if (!newArtist) {
			return {
				status: "error",
				message: "Echec de la création de l'artiste.",
			};
		}

		return {
			status: "success",
			message: newArtist.id.toString(),
		};
	} catch (error) {
		console.error("Erreur lors de la création de l'artiste :", error);
		return {
			status: "error",
			message: "Une erreur est survenue lors de la création de l'artiste.",
		};
	}
}
