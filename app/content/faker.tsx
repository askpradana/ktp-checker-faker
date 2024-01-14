"use client";

import { SyntheticEvent } from "react";

export default function KtpFaker() {
	const handleSubmit = (e: SyntheticEvent): void => {
		e.preventDefault();
		console.log(e);
		console.log("Form submitted");
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<select className="select select-primary w-full max-w-xs" defaultValue='nol'>
					<option disabled value='nol'>
						What is the best TV show?
					</option>
					<option value="Game of Thrones">Game of Thrones</option>
					<option value="Lost">Lost</option>
					<option value="Breaking Bad">Breaking Bad</option>
					<option value="Walking Dead">Walking Dead</option>
				</select>
				<button className="btn btn-active btn-primary" type="submit">
					Primary
				</button>
			</form>
		</div>
	);
}
