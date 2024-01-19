import React, { useContext } from "react";
import "./Selector.css";
import { AppContext } from "../Context/AppContext";

export interface TSelectorButton {
	title: string;
	id: number;
	code: string;
}

type PropType = {
	options: TSelectorButton[];
	defaultIndex: number;
	disable: boolean;
};

const buttonWidth = 7.5;
const SelectorButton = ({ options, defaultIndex, disable }: PropType) => {
	const { handleLang } = useContext(AppContext);
	const [left, setLeft] = React.useState(defaultIndex * buttonWidth);

	const onClick = (index: number) => {
		setLeft(buttonWidth * index);
	};

	return (
		<div
			className={`h-12 flex z-0 rounded-[2rem] relative items-center bg-[#000]/30 mt-8 lg:mt-0 ${
				disable ? "pointer-events-none bg-[#111]/10" : ""
			}`}
			style={{ width: `${buttonWidth * options.length}rem` }}
		>
			{options.map((option: TSelectorButton, index: number) => {
				return (
					<div
						onClick={() => {
							handleLang(option.code);
							onClick(index);
						}}
						key={option.code}
						className="w-full flex justify-center items-center z-[2] cursor-pointer lg:w-full"
					>
						{option.title}
					</div>
				);
			})}
			<div
				className={`selector-slider bg-[white]/10 ${
					disable ? " bg-transparent" : ""
				}`}
				style={{ left: `${left}rem` }}
			></div>
		</div>
	);
};

export default SelectorButton;
