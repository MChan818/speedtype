import { ReactNode, createContext, useMemo, useState } from "react";

export interface ContextType {
	lang: string;
	handleLang: (lang: string) => void;
	appLoading: boolean;
	handleAppLoading: () => void;
}

export const AppContext = createContext<ContextType>({
	lang: "en",
	handleLang: () => {},
	appLoading: false,
	handleAppLoading: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
	const [appLoading, setAppLoading] = useState<boolean>(false);

	const [lang, setLang] = useState<string>("en");

	const handleLang = (lang: string) => {
		setLang(lang);
	};

	const handleAppLoading = () => {
		setAppLoading((prev) => !prev);
	};

	const value = useMemo(
		() => ({
			lang,
			handleLang,
			appLoading,
			handleAppLoading,
		}),
		[lang, appLoading],
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
