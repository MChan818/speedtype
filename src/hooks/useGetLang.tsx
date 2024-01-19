/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from "react";

export type TApiWordsResponse = {
	languages: string[];
	error: any;
	loading: boolean;
};

const useGetLang = (): TApiWordsResponse => {
	const [loading, setLoading] = useState<boolean>(false);
	const [languages, setLangs] = useState<string[]>([]);
	const [error, setError] = useState<any>();

	useLayoutEffect(() => {
		const fetchWords = async () => {
			setLoading(true);
			await fetch(
				`https://random-word-api.herokuapp.com/languages`,
			)
				.then((res: any) => {
					if (res.ok) return res.json();
					throw new Error("Error fetching words");
				})
				.then((res: any) => {
					setLangs(res);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setLoading(false);
				});
		};
		fetchWords();
	}, []);
	return { languages, error, loading };
};

export default useGetLang;
