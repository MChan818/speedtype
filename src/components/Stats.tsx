import { useContext, useEffect } from "react";
import useWordStats from "../hooks/useWordStats";
import { TimeContext } from "./Context/TimeContext";

type PropType = {
	totalWords: number;
	correctWords: number;
	wrongWords: number;
	start: boolean;
	handleStop: () => void;
};

const Stats = ({ totalWords, correctWords, wrongWords, start, handleStop }: PropType) => {
	const { timePassed, timeLeft } = useContext(TimeContext);
	const { accuracy, wpm } = useWordStats({
		timer: timePassed,
		totalWords: totalWords,
		correctWords: correctWords,
		start: start,
	});

	useEffect(() => {
		if (timeLeft <= 0 && start) {
			// console.log("Stop")
			handleStop();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeLeft]);

	return (
		<div className="w-48 absolute bottom-6 right-0 flex flex-col items-start justify-start">
			<div className="text-orange-500">
				WPM: <b>{(Math.floor(wpm * 100) / 100).toFixed(2)}</b>
			</div>
			<div>
				Accuracy: <b>{Math.floor(accuracy)}%</b>
			</div>
			<div className="text-[#22bb33]">
				Correct: <b>{correctWords}</b>
			</div>
			<div className="text-[#bb2124]">
				Wrong: <b>{wrongWords}</b>
			</div>
		</div>
	);
};

export default Stats;
