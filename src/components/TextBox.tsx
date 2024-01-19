import { useContext, useEffect, useState } from "react";
import useGetWords from "../hooks/useGetWords";
import { AppContext } from "./Context/AppContext";

type PropType = {
	handleStart: () => void;
};

const TextBox = ({ handleStart }: PropType) => {
	const { lang } = useContext(AppContext);
	const [inputValue, setInputValue] = useState<string>("");
	const [currentWord, setCurrentWord] = useState<number>(0);
	const [currentLetter, setCurrentLetter] = useState<number>(0);
	const { data, loading } = useGetWords({ number: 50, language: lang || "es" });

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
			letterElement.style.color = "lightgreen";
		} else {
			letterElement.style.color = "red";
		}
		setCurrentLetter((prev) => prev + 1);
	};

	useEffect(() => {
		if (inputValue.length > 0) handleStart();
	}, [inputValue, handleStart]);

	return data && !loading ? (
		<>
			<div className="h-[25vh] w-[80vw] border-2 border-white mt-12">
				<span className="w-full h-full flex p-2 flex-wrap relative">
					{data.map((word: string, index: number) => {
						return (
							<span id={`word` + index} className="text-lg flex" key={index}>
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
				className="bg-[transparent] border-2 border-white h-16 w-64 mt-8 p-4 text-lg"
				onChange={handleInput}
				value={inputValue}
			/>
		</>
	) : (
		<div className="h-[25vh] w-[80vw] border-2 border-white mt-12 flex items-center justify-center">
			<p id="wordList" className="text-lg p-4">
				Loading
			</p>
		</div>
	);
};

export default TextBox;
