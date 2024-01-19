import { useState } from "react";
import Timer from "../components/Timer";
import TextBox from "../components/TextBox";
import SelectorButton from "../components/Selector/SelectorButton";
import { SelectorOptions } from "../components/Selector/SelectorOptions";

const TypingTest = () => {
	const [start, setStart] = useState<boolean>(false);
	const [timeout, setTimeout] = useState<boolean>(false);
    
	return (
		<div className="w-screen h-screen flex flex-col bg-[#111] text-slate-400 p-12 px-24 roboto-mono">
			<div className="w-full">
				<h1 className="mt-12 text-4xl text-white">Typing Speed Test</h1>
			</div>
			<div className="w-full flex justify-between">
				<Timer start={start} setTimeout={setTimeout} />
				<SelectorButton options={SelectorOptions} defaultIndex={0} />
			</div>
			<TextBox />
		</div>
	);
};

export default TypingTest;
