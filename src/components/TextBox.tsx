import React, { useContext, useEffect, useState } from "react";
import useGetWords from "../hooks/useGetWords";
import { AppContext } from "./Context/AppContext";

const TextBox = () => {
	const { lang } = useContext(AppContext);
	const loading = false;
	const data = [
		"cama",
		"enfermedad",
		"oscuridades",
		"espaciado",
		"misprogramas",
		"cintura",
		"Ratales",
		"legislado",
		"quésis",
		"amoroso",
		"agonista",
		"aclimatises",
		"Frumpier",
		"Sculker",
		"inflexible",
		"Snuggies",
		"erraencias",
		"portero",
		"audacias",
		"Relayed",
		"Sultrier",
		"afrodisíacos",
		"camaradas",
		"nuestroari",
		"Traslado",
		"subjugador",
		"Misers",
		"en medio",
		"justo",
		"cerebrado",
		"transacción",
		"amateur",
		"Fez",
		"pollaeyed",
		"calas",
		"inter",
		"Platón",
		"fotooxidativo",
		"carotida",
		"extensiones",
		"Perdido",
		"estileno",
		"vanidos",
		"buzón de voz",
		"termoformado",
		"sin hablar",
		"después de la vida",
		"antifertilidad",
		"Reacreditación",
		"reflectante",
	];
	const [inputValue, setInputValue] = useState<string>("");
	const [currentWord, setCurrentWord] = useState<number>(0);
	const [currentLetter, setCurrentLetter] = useState<number>(0);
	// const { data, loading } = useGetWords({ number: 50, language: lang || "es" });

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleInput = (event: any) => {
		const word: string = event.target.value;
		const lastLetter: string = event.nativeEvent.data;
		setInputValue(word);
		if (word.includes(" ")) {
			console.log("Empty");
			setCurrentLetter(0);
			setCurrentWord((prev) => prev + 1);
			return setInputValue("");
		}
		if (lastLetter === null) {
			const element = document.getElementById(
				"letter" + currentWord + "" + (currentLetter - 1),
			);
			if (!element) return console.error("Letter id not found");
			element.style.color = "gray";
			setCurrentLetter((prev) => prev - 1);
			return;
		}
		const element = document.getElementById("letter" + currentWord + "" + currentLetter);
		if (!element) return console.error("Letter id not found");
		if (element.innerHTML === word.substring(word.length - 1, word.length)) {
			element.style.color = "lightgreen";
		} else {
			element.style.color = "red";
		}
		setCurrentLetter((prev) => prev + 1);
	};

	return data && !loading ? (
		<>
			<div className="h-[25vh] w-[80vw] border-2 border-white mt-12">
				<span className="w-full h-full flex p-2 flex-wrap relative">
					{data.map((word: string, index: number) => {
						return (
							<span id={`word` + index} className="text-lg flex" key={index}>
								{word.split("").map((letter: string, innerIndex: number) => (
									<span
										id={`letter` + index + "" + innerIndex}
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
									id={"letter"+index+""+word.length}
									key={"space"+index}
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
