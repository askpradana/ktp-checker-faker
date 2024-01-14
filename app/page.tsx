import KtpChecker from "./content/checker";
import KtpFaker from "./content/faker";
import Footer from "./content/footer";

export default function Home() {
	return (
		<main>
			<div className="flex flex-col content-between">
				<KtpChecker />

				{/* <div className="divider"></div> */}

				{/* <KtpFaker /> */}

				<Footer />
			</div>
		</main>
	);
}
