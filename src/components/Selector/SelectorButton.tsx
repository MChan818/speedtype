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
};

const buttonWidth = 10;
const SelectorButton = ({ options, defaultIndex }: PropType) => {
	const { handleLang } = useContext(AppContext);
	const [left, setLeft] = React.useState(defaultIndex * buttonWidth);

	const onClick = (index: number) => {
		setLeft(buttonWidth * index);
	};

	return (
		<div className="selector-base" style={{ width: `${buttonWidth * options.length}rem` }}>
			{options.map((option: TSelectorButton, index: number) => {
				return (
					<div
						onClick={() => {
							handleLang(option.code);
							onClick(index);
						}}
						className="selector-option"
					>
						{option.title}
					</div>
				);
			})}
			<div className="selector-slider" style={{ left: `${left}rem` }}></div>
		</div>
	);
};

export default SelectorButton;
