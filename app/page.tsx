import KtpChecker from "./content/checker";

export default function Home() {
	return (
		<main>
			<div className="flex flex-col">
				<KtpChecker />

				<div className="divider"></div>
			</div>
		</main>
	);
}
