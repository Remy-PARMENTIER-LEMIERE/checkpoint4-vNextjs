import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();
async function main() {
	const joeDassin = await prisma.artist.create({
		data: {
			name: "Joe Dassin",
			photo: "http://localhost:3000/uploads/joeDassin.jpg",
			description:
				'Joe Dassin était un chanteur et compositeur franco-américain, né le 5 novembre 1938 à New York et décédé le 20 août 1980 à Papeete.\n\nFils du réalisateur Jules Dassin, il est devenu une icône de la chanson française des années 1960 et 1970, connu pour sa voix douce et mélancolique. Ses tubes intemporels incluent "Les Champs-Élysées", "L\'Été indien", "Salut les amoureux", et "Et si tu n\'existais pas".\n\nArtiste populaire, il a vendu des millions de disques et a marqué des générations par ses mélodies entraînantes et ses textes poétiques, devenant l\'une des figures les plus aimées du paysage musical francophone.',
			songs: {
				create: [
					{
						title: "Salut Les Amoureux !",
						textAndChords:
							"C             G               C\nLes matins se suivent et se ressemblent,\nAm                 F               C\nQuand l\\'amour fait place au quotidien.\nC              G                  C\nOn n\\'était pas faits pour vivre ensembles.\n     Am            F                C\nÇa n\\'suffit pas toujours de s\\'aimer bien.\n\n\n      Am\nC\\'est drôle, hier, on s\\'ennuyait\n   Em\nEt c\\'est à peine si l\\'on trouvait\n    G                              D\nDes mots pour se parler du mauvais temps.\n   Am\nEt maintenant qu\\'il faut partir,\n   Em\nOn a cent mille choses à dire,\n    G               F                   C\nQui tiennent trop à cœur pour si peu de temps.\n\n\nF          G               C\nOn s\\'est aimés comme on se quitte,\n     Am              F          C\nTout simplement sans penser à demain,\nG     C                 G                 Am       D\n  À demain qui vient toujours un peu trop vite,\n      F                G                            C\nAux adieux qui, quelquefois, se passent un peu trop bien.\n\n\nOn fait c\\'qu\\'il faut; on tient nos rôles,\nOn se regarde, on rit, on crâne un peu\nOn a toujours oublié quelque chose\nC\\'est pas facile de se dire adieu.\n\n\nEt l\\'on sait trop bien que, tôt ou tard,\nDemain peut-être ou même ce soir,\nOn va se dire que tout n\\'est pas perdu\nDe ce roman inachevé,\nOn va se faire un conte de fées\nMais on a passé l\\'âge; on n\\'y croirait plus.\n\n\nOn s\\'est aimés comme on se quitte,\nTout simplement sans penser à demain,\nÀ demain qui vient toujours un peu trop vite,\nAux adieux qui, quelquefois, se passent un peu trop bien.\n\n\nRoméo, Juliette et tous les autres,\nAu fond de vos bouquins, dormez en paix !\nUne simple histoire comme la nôtre\nEst de celles qu\\'on n\\'écrira jamais.\n\n\nAllons, petite, il faut partir,\nLaisser ici nos souvenirs !\nOn va descendre ensemble si tu veux\nEt, quand elle va nous voir passer,\nLa patronne du café\nVa encore nous dire : \" Salut les amoureux \"\n\n\nOn s\\'est aimés comme on se quitte,\nTout simplement sans penser à demain,\nÀ demain qui vient toujours un peu trop vite,\nAux adieux qui, quelquefois, se passent un peu trop bien.",
						difficulty: 2,
					},
				],
			},
		},
	});

	const goldman = await prisma.artist.create({
		data: {
			name: "Jean-Jacques Goldman",
			photo: "http://localhost:3000/uploads/jean-jacquesGoldman.jpg",
			description:
				'Jean-Jacques Goldman est un auteur-compositeur-interprète et producteur emblématique de la chanson française. Il a marqué plusieurs générations avec ses textes poétiques, engagés et ses mélodies accrocheuses. On lui doit des tubes intemporels comme "Quand la musique est bonne" ou "Envole-moi". \n\nTrès prolifique, il a également écrit pour de nombreux artistes majeurs (Céline Dion, Johnny Hallyday, etc.). Sa discrétion médiatique et son intégrité artistique en font une des personnalités préférées des Français. L\'œuvre de Goldman résonne toujours, le consacrant comme une légende vivante de la musique francophone.',
		},
	});

	console.log({ joeDassin, goldman });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
