import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
	return (
		<main className={styles.main}>
			<h1>MyChords</h1>
			<Image
				src="/guitare.jpeg"
				alt="Guitare sur un drap"
				width={400}
				height={300}
				style={{ width: "400px", height: "auto" }}
			/>
			<article>
				<p>
					Retrouvez les accords de toutes vous chansons préférées sur{" "}
					<strong>MyChords</strong> pour devenir l'acteur principal de vos
					soirées feu de camp l'été prochain !
				</p>
				<p>
					Ceci est un site communautaire et participatif, n'hésitez pas à
					partager vos morceaux préférés ! 🎵🔥
				</p>
			</article>
			<Link href="/research/song">Let's play !</Link>
		</main>
	);
}
