import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest) {
	try {
		const artists = await prisma.artist.findMany({
			select: { id: true, name: true },
		});

		console.log(artists);

		return NextResponse.json(artists, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Erreur lors de la récupération des artistes" },
			{ status: 500 },
		);
	}
}
