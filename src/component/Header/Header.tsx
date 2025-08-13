import { CaretDownIcon } from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
	return (
		<header className={styles.header}>
			<Link href="/">
				<Image src="/MyChordsLogo.png" alt="Logo" width={50} height={40} />
			</Link>
			<NavigationMenu.Root>
				<NavigationMenu.List className={styles.list}>
					<NavigationMenu.Item>
						<NavigationMenu.Trigger>
							Nouveau <CaretDownIcon />
						</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<ul>
								<li>
									<NavigationMenu.Link href="/new/artist">
										Artiste
									</NavigationMenu.Link>
								</li>
								<li>
									<NavigationMenu.Link href="/new/song">
										Chanson
									</NavigationMenu.Link>
								</li>
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Trigger>
							Recherche <CaretDownIcon />
						</NavigationMenu.Trigger>
						<NavigationMenu.Content>
							<ul>
								<li>
									<Link href="/research/artist">Artiste</Link>
								</li>
								<li>
									<Link href="/research/song">Chanson</Link>
								</li>
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
				</NavigationMenu.List>
			</NavigationMenu.Root>
		</header>
	);
}
