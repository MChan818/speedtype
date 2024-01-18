import { useState } from "react";
import Timer from "../components/Timer";
import TextBox from "../components/TextBox";

const TypingTest = () => {
	const [start, setStart] = useState<boolean>(false);
	const [timeout, setTimeout] = useState<boolean>(false);

	return (
		<div className="w-screen h-screen flex flex-col bg-[#111] text-slate-400 p-12 px-24 roboto-mono">
			<div className="w-full">
				<h1 className="mt-12 text-4xl text-white">Typing Speed Test</h1>
			</div>
			<Timer start={start} setTimeout={setTimeout} />
			<TextBox />
		</div>
	);
};

export default TypingTest;
