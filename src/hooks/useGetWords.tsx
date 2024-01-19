/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from "react";

export type TApiWordsResponse = {
	data: string[];
	error: any;
	loading: boolean;
};

type PropType = {
	number: number;
	language?: string;
};

const useGetWords = ({ number, language }: PropType): TApiWordsResponse => {
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<string[]>([]);
	const [error, setError] = useState<any>();

	useLayoutEffect(() => {
		const fetchWords = async () => {
			if(import.meta.env.VITE_ENDPOINT_ACTIVATE === "false") return;
			setLoading(true);
			await fetch(
				`https://random-word-api.herokuapp.com/word?number=${number}&lang=${language}`,
			)
				.then((res: any) => {
					if (res.ok) return res.json();
					throw new Error("Error fetching words");
				})
				.then((res: string[]) => {
					const noSpacesArray:string[] = res.map((word:string)=>word.replace(/ /g, ""))
					setData(noSpacesArray);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
				});
		};
		fetchWords();
	}, [number, language]);

	return { data, error, loading };
};

export default useGetWords;
