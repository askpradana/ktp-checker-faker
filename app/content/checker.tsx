"use client";

import React, { useCallback, useEffect } from "react";

interface JsonData {
	kode: string;
	nama: string;
}

export default function KtpChecker() {
	const [ktpNumber, setKtpNumber] = React.useState("");
	const [namaProv, setnamaProv] = React.useState("");
	const [namaKoKab, setnamaKoKab] = React.useState("");
	const [kodeKec, setkodeKec] = React.useState("");
	const [tglLahir, settglLahir] = React.useState("");
	const [howOld, setHowOld] = React.useState("");
	const [norut, setnorut] = React.useState("");
	const [jsonData, setJsonData] = React.useState<JsonData[] | null>(null);
	const [ktpNotFound, setKtpNotFound] = React.useState(false);
	const [error, setError] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	let [counter, setCounter] = React.useState(0);

	const fetchData = useCallback(async () => {
		try {
			const response = await fetch("/ktp.json");
			const data: JsonData[] = await response.json();
			setJsonData(data);
		} catch (error) {
			console.error("Error fetching JSON data:", error);
			setError("The database for ktp code is broken, pls send help!");
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleSubmit = async () => {
		setIsLoading(true);
		setKtpNotFound(false);
		await simulateIncrement();
		if (!jsonData) {
			console.error("JSON data not loaded");
			return;
		}

		const splitTigaBagian = ktpNumber.match(/.{1,6}/g);

		const result = splitTigaBagian?.[0] ?? "";
		const resultTglLahir = splitTigaBagian?.[1] ?? "";
		const resultNorut = splitTigaBagian?.[2] ?? "";
		const tetemp = jsonData.find((item) => item.kode === result);

		if (tetemp) {
			const temp: RegExpMatchArray | null = tetemp.kode.match(/.{1,2}/g);
			const tempKoKab: RegExpMatchArray | null = tetemp.kode.match(/.{1,4}/g);
			const tempKec: RegExpMatchArray | null = tetemp.kode.match(/.{1,6}/g);
			const haha: string = temp?.[0] ?? "kosong";
			const koKab: string = tempKoKab?.[0] ?? "kosong";
			const kec: string = tempKec?.[0] ?? "kosong";

			const provTemp = jsonData.find((item) => item.kode === haha);
			const koKabTemp = jsonData.find((item) => item.kode === koKab);
			const kecTemp = jsonData.find((item) => item.kode === kec);
			if (provTemp) {
				setnamaProv(provTemp.nama);
			}

			if (koKabTemp) {
				setnamaKoKab(koKabTemp.nama);
			}

			if (kecTemp) {
				setkodeKec(kecTemp.nama);
			}
		} else {
			setKtpNotFound(true);
		}

		if (resultTglLahir) {
			const day = parseInt(resultTglLahir.substring(0, 2), 10);
			const month = parseInt(resultTglLahir.substring(2, 4), 10) - 1; // month are start in 0
			const year = parseInt(resultTglLahir.substring(4), 10);
			const parsedDate = new Date(year, month, day);
			settglLahir(resultTglLahir);
			console.log(parsedDate);

			const currentDate = new Date();
			const age = currentDate.getFullYear() - parsedDate.getFullYear();
			setHowOld(age.toString());
		}

		if (resultNorut) {
			setnorut(resultNorut);
		}

		setIsLoading(false);
		setCounter(0);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKtpNumber(e.target.value);
	};

	const simulateIncrement = () => {
		return new Promise<void>((resolve) => {
			const intervalId = setInterval(() => {
				// console.log(counter);

				if (counter >= 100) {
					clearInterval(intervalId);
					resolve();
				} else {
					counter++;
					setCounter(counter);
				}
			}, 20);
		});
	};
	return (
		<>
			{error && (
				<div className="m-12">
					<div role="alert" className="alert alert-error">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>{error}</span>
					</div>
				</div>
			)}
			<div className="w-screen flex flex-row my-24">
				<div className="flex flex-1 justify-center">
					<div className="card w-96 bg-base-100 shadow-xl h-0.5">
						<div className="card-body">
							{/* // TODO => bikin jagaan kalau ktp not found, no ktp ngaco dll. jagainnya di const biar dipanggil full aja */}
							<h2 className="card-title">Hasil Scan KTP</h2>
							{namaProv && <p>Provinsi: {namaProv}</p>}
							{namaKoKab && <p>Kota/kabupaten: {namaKoKab}</p>}
							{kodeKec && <p>Kecamatan: {kodeKec}</p>}
							{tglLahir && <p>tgl lahir: {tglLahir}</p>}
							{norut && <p>nomor urut: {norut}</p>}
							{howOld && <p>Udah umur: {howOld}</p>}
						</div>
					</div>
				</div>

				<div className="flex flex-col flex-1 my-12 w-1/2 items-center">
					<input
						type="text"
						placeholder="Type here"
						className="input input-bordered input-primary w-1/2 mb-12"
						value={ktpNumber}
						onChange={handleChange}
						maxLength={16}
					/>

					<div className=" flex flex-col justify-center w-1/2">
						<button className="btn btn-active" onClick={handleSubmit}>
							Submit
						</button>
					</div>

					{isLoading == true && (
						<div>
							<progress
								className="progress progress-primary w-full my-4"
								value={counter}
								max="100"
							></progress>
							<p className="text-sm">
								This progress bar is useless, I just want to waste your time
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
