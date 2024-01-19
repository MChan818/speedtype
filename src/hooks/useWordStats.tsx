import { useEffect, useState } from "react";

type PropType = {
	timer: number;
	totalWords: number;
	correctWords: number;
	start: boolean;
};

const useWordStats = ({ timer, totalWords, correctWords, start }: PropType) => {
	const [accuracy, setAccuracy] = useState<number>(100);
	const [wpm, setWpm] = useState<number>(0);

	useEffect(() => {
		const calculateStats = () => {
			if (!start) return;
			if (totalWords === 0) return;
			setAccuracy((correctWords * 100) / totalWords);
			setWpm(correctWords / (timer / 60));
		};
		calculateStats();
	}, [totalWords, correctWords, timer, start]);

	return { accuracy, wpm };
};

export default useWordStats;
