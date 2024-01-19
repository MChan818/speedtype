import { useState } from "react";
import Timer from "../components/Timer";
import TextBox from "../components/TextBox";
import SelectorButton from "../components/Selector/SelectorButton";
import { SelectorOptions } from "../components/Selector/SelectorOptions";
import Stats from "../components/Stats";
import { TimeContextProvider } from "../components/Context/TimeContext";

const TypingTest = () => {
	const timer = 5;
	const [start, setStart] = useState<boolean>(false);
	const [correctWords, setCorrectWords] = useState<number>(0);
	const [totalWords, setTotalWords] = useState<number>(0);
	const [wrongWords, setWrongWords] = useState<number>(0);

	const handleStart = () => {
		setStart(true);
	};
	const handleStop = () => {
		setStart(false);
		if (confirm("Confirma!")) {
			window.location.reload();
		} else {
			return
		}
	};

	const handleWords = (isCorrect: boolean) => {
		if (isCorrect) {
			setCorrectWords((prev) => prev + 1);
		} else {
			setWrongWords((prev) => prev + 1);
		}
		setTotalWords((prev) => prev + 1);
	};

	return (
		<div className="w-screen min-h-screen flex flex-col py-4 items-center bg-[#111] text-slate-400 lg:py-12 lg:px-24 roboto-mono">
			<div className="w-full text-center lg:text-start">
				<h1 className="mt-12 text-4xl text-white">Typing Speed Test</h1>
			</div>
			<TimeContextProvider>
				<div className="flex flex-col justify-between mt-8 lg:flex-row lg:w-full lg:mt-4">
					<Timer start={start} timer={timer} />
					<SelectorButton options={SelectorOptions} defaultIndex={0} disable={start} />
				</div>
				<Stats
					correctWords={correctWords}
					totalWords={totalWords}
					wrongWords={wrongWords}
					start={start}
					handleStop={handleStop}
				/>
			</TimeContextProvider>
			<TextBox handleStart={handleStart} handleWords={handleWords} />
		</div>
	);
};

export default TypingTest;
