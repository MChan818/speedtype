import { ReactNode, createContext, useMemo, useState } from "react";

export interface ContextType {
	handleTimeLeft: (time: number) => void;
	handleTimePassed: (time: number) => void;
	timeLeft: number;
	timePassed: number;
}

export const TimeContext = createContext<ContextType>({
	handleTimeLeft: () => {},
	handleTimePassed: () => {},
	timeLeft: 0,
	timePassed: 0,
});

export const TimeContextProvider = ({ children }: { children: ReactNode }) => {
	const [timeLeft, setTimeLeft] = useState<number>(0);
	const [timePassed, setTimePassed] = useState<number>(0);

	const handleTimeLeft = (time: number) => {
		setTimeLeft(time);
	};
	const handleTimePassed = (time: number) => {
		setTimePassed(time);
	};

	const value = useMemo(
		() => ({
			handleTimeLeft,
			handleTimePassed,
			timeLeft,
			timePassed,
		}),
		[timeLeft, timePassed],
	);

	return (
		<TimeContext.Provider
			// Values to be shared
			value={value}
		>
			{children}
		</TimeContext.Provider>
	);
};
