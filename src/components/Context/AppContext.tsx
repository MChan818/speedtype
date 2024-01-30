import { ReactNode, createContext, useMemo, useState } from "react";

export interface TStats {
	wpm: string;
	accuracy: string;
	correct: string;
	incorrect: string;
}

export interface ContextType {
	lang: string;
	handleLang: (lang: string) => void;
	appLoading: boolean;
	handleAppLoading: () => void;
	handleStats: (stats: TStats) => void;
	stats: TStats | undefined;
}

export const AppContext = createContext<ContextType>({
	lang: "en",
	handleLang: () => {},
	appLoading: false,
	handleAppLoading: () => {},
	handleStats: () => {},
	stats: {
		wpm: "",
		accuracy: "",
		correct: "",
		incorrect: "",
	},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
	const [appLoading, setAppLoading] = useState<boolean>(false);
	const [lang, setLang] = useState<string>("en");
	const [stats, setStats] = useState<TStats>();

	const handleLang = (lang: string) => {
		setLang(lang);
	};

	const handleAppLoading = () => {
		setAppLoading((prev) => !prev);
	};

	const handleStats = (stats: TStats) => {
		setStats(stats);
	};

	const value = useMemo(
		() => ({
			lang,
			handleLang,
			appLoading,
			handleAppLoading,
			handleStats,
			stats,
		}),
		[lang, appLoading, stats],
	);

	return (
		<AppContext.Provider
			// Values to be shared
			value={value}
		>
			{children}
		</AppContext.Provider>
	);
};
