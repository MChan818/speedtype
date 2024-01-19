import useTimer from "../hooks/useTimer";

type PropType = {
	start: boolean;
	timer: number;
};

const Timer = ({ start, timer }: PropType) => {
	const { seconds, minutes } = useTimer({
		timer: timer,
		start: start,
	});

	return (
		<div className="text-6xl text-white font-bold">
			{minutes}:{seconds}
		</div>
	);
};

export default Timer;
