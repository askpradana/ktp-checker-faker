"use client";

import React, { useEffect } from "react";

interface JsonData {
	kode: string;
	nama: string;
}

export default function Home() {
  const [ktpNumber, setKtpNumber] = React.useState("");
  const [jsonData, setJsonData] = React.useState<JsonData[] | null>(null);
  const [searchResult, setSearchResult] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/ktp.json');
        const data: JsonData[] = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    if (!jsonData) {
      console.error('JSON data not loaded');
      return;
    }

    const result = jsonData.find(item => item.kode === ktpNumber);

    if (result) {
      setSearchResult(result.nama);
      console.log(result.nama);
    } else {
      setSearchResult(null);
      setSearchResult('Invalid ktp number')
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKtpNumber(e.target.value);
  };

  return (
    <main>
      <div className="flex flex-col mx-24 my-12">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs mb-12"
          value={ktpNumber}
          onChange={handleChange}
        />
        <button className="btn btn-active" onClick={handleSubmit}>
          Submit
        </button>
        {searchResult && (
          <p>Result: {searchResult}</p>
        )}
      </div>
    </main>
  );
};
