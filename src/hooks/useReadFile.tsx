import { useEffect, useState } from "react";
import en_top500 from "../assets/word_list/en_top500.txt";
import es_top500 from "../assets/word_list/es_top500.txt";

type InputProp = {
	lang: string;
};

const shuffle = (array: string[]): string[] => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

const useReadFile = ({ lang }: InputProp) => {
	const [words, setWords] = useState<string[]>();

	useEffect(() => {
		const file: string = lang === "en" ? en_top500 : es_top500;
		const fetchWords = () => {
			fetch(file)
				.then((r) => r.text())
				.then((text: string) => {
					setWords(shuffle(text.split("\r\n")));
				});
		};
		fetchWords();
	}, [lang]);
	return { words };
};

export default useReadFile;
