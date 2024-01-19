import { useContext, useEffect, useState } from "react";
import useGetWords from "../hooks/useGetWords";
import { AppContext } from "./Context/AppContext";

import { defaultList } from "./WordList/WordList";

type PropType = {
	handleStart: () => void;
};

const TextBox = ({ handleStart }: PropType) => {
	const { lang } = useContext(AppContext);
	const [inputValue, setInputValue] = useState<string>("");
	const [currentWord, setCurrentWord] = useState<number>(0);
	const [currentLetter, setCurrentLetter] = useState<number>(0);
	const { data, loading } = useGetWords({ number: 100, language: lang || "en" });

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleInput = (event: any) => {
		const word: string = event.target.value;
		const lastLetter: string = event.nativeEvent.data;
		setInputValue(word);
		if (lastLetter === " ") {
			setCurrentLetter(0);
			setCurrentWord((prev) => prev + 1);
			return setInputValue("");
		}
		if (lastLetter === null) {
			const element = document.getElementById(
				"word" + currentWord + "-letter" + (currentLetter - 1),
			);
			if (!element) return console.error("Letter id not found");
			element.style.color = "gray";
			setCurrentLetter((prev) => prev - 1);
			return;
		}
		const letterElement = document.getElementById(
			"word" + currentWord + "-letter" + currentLetter,
		);
		if (!letterElement) return console.error("Letter id not found");
		if (letterElement.innerHTML === word.substring(word.length - 1, word.length)) {
			letterElement.style.color = import.meta.env.VITE_COLOR_GREEN;
		} else {
			letterElement.style.color = import.meta.env.VITE_COLOR_RED;
		}
		setCurrentLetter((prev) => prev + 1);
	};

	useEffect(() => {
		if (inputValue.length > 0) handleStart();
	}, [inputValue, handleStart]);

	return data && !loading ? (
		<>
			<div className="h-[25vh] w-[80vw] mt-24 overflow-hidden">
				<span className="w-full h-full flex p-2 flex-wrap relative">
					{defaultList.map((word: string, index: number) => {
						return (
							<span id={`word` + index} className="text-xl flex" key={index}>
								{word.split("").map((letter: string, innerIndex: number) => (
									<span
										id={`word` + index + "-letter" + innerIndex}
										key={innerIndex}
										className={
											currentLetter === innerIndex && currentWord === index
												? "bg-white text-black"
												: ""
										}
									>
										{letter}
									</span>
								))}
								<span
									id={"letter" + index + "" + word.length}
									key={"space" + index}
									className={
										currentLetter === word.length && currentWord === index
											? "bg-white text-black"
											: ""
									}
								>
									&nbsp;
								</span>
							</span>
						);
					})}
				</span>
			</div>
			<input
				id="textbox"
				type="text"
				placeholder="Escribí para empezar"
				className="bg-[transparent] border-2 border-white h-16 w-64 mt-24 p-4 text-lg"
				onChange={handleInput}
				value={inputValue}
			/>
		</>
	) : (
		<div className="h-[25vh] w-[80vw] mt-24 flex items-center justify-center">
			<p id="wordList" className="text-lg p-4">
				Loading
			</p>
		</div>
	);
};

export default TextBox;
