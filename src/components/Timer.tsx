import React from "react";
import useTimer from "../hooks/useTimer";

type PropType = {
	start: boolean;
	setTimeout: React.Dispatch<React.SetStateAction<boolean>>;
};

const Timer = ({ start, setTimeout }: PropType) => {
	const { seconds, minutes } = useTimer({ timer: 180, start: start, setTimeout: setTimeout });
	return (
		<div className="text-6xl text-white font-bold">
			{minutes}:{seconds}
		</div>
	);
};

export default Timer;
