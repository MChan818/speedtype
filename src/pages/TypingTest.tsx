import { useState } from "react";
import Timer from "../components/Timer";
import TextBox from "../components/TextBox";
import SelectorButton from "../components/Selector/SelectorButton";
import { SelectorOptions } from "../components/Selector/SelectorOptions";

const TypingTest = () => {
	const [start, setStart] = useState<boolean>(false);
	const [timeout, setTimeout] = useState<boolean>(false);
	const [disable, setDisable] = useState<boolean>(false);

	const handleStart = () => {
		setStart(true);
	};

	return (
		<div className="w-screen min-h-screen flex flex-col py-4 items-center bg-[#111] text-slate-400 lg:py-12 lg:px-24 roboto-mono">
			<div className="w-full text-center lg:text-start">
				<h1 className="mt-12 text-4xl text-white">Typing Speed Test</h1>
			</div>
			<div className="flex flex-col justify-between mt-8 lg:flex-row lg:w-full lg:mt-4">
				<Timer start={start} setTimeout={setTimeout} />
				<SelectorButton options={SelectorOptions} defaultIndex={0} disable={disable} />
			</div>
			<TextBox handleStart={handleStart}/>
		</div>
	);
};

export default TypingTest;
