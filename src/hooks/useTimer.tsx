import { useContext, useEffect, useState } from "react";
import { TimeContext } from "../components/Context/TimeContext";

type PropType = {
	timer: number;
	start: boolean;
};

const useTimer = ({ timer, start }: PropType) => {
	const { handleTimeLeft, handleTimePassed } = useContext(TimeContext);
	const [timeLeft, setTimeLeft] = useState<number>(timer);
	const [minutes, setMinutes] = useState<string>("");
	const [seconds, setSeconds] = useState<string>("");

	useEffect(() => {
		if (!start) return;
		if (timeLeft <= 0) {
			return;
		}
		const countDown = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1000);
		return () => {
			clearInterval(countDown);
		};
	}, [timeLeft, start]);

	useEffect(() => {
		const handleTimeout = () => {
			handleTimePassed(timer - timeLeft);
			handleTimeLeft(timeLeft);
			setMinutes(Math.floor(timeLeft / 60).toString());
			setSeconds((timeLeft % 60).toString().padStart(2, "0"));
		};
		handleTimeout();
	}, [timeLeft, handleTimeLeft, handleTimePassed, timer]);

	return { timeLeft, seconds, minutes };
};

export default useTimer;
