/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from "react";

export type TApiWordsResponse = {
	lang: string[];
	error: any;
	loading: boolean;
};

const useGetLang = (): TApiWordsResponse => {
	const [loading, setLoading] = useState<boolean>(false);
	const [lang, setLangs] = useState<string[]>([]);
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
					console.log(res);
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
	return { lang, error, loading };
};

export default useGetLang;
