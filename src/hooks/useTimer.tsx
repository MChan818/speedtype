import React, { useEffect, useState } from "react";

type PropType = {
	timer: number;
	start: boolean;
	setTimeout: React.Dispatch<React.SetStateAction<boolean>>;
};

const useTimer = ({ timer, start, setTimeout }: PropType) => {
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
			setMinutes(Math.floor(timeLeft / 60).toString());
			setSeconds((timeLeft % 60).toString().padStart(2, "0"));
			setTimeout(timeLeft === 0 ?? true);
		};
		handleTimeout();
	}, [timeLeft, setTimeout]);

	return { timeLeft, seconds, minutes };
};

export default useTimer;
