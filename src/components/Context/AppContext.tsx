import { ReactNode, createContext, useMemo, useState } from "react";

export interface ContextType {
	lang: string;
	handleLang: (lang: string) => void;
}

export const AppContext = createContext<ContextType>({
	lang: "es",
	handleLang: () => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
	const [lang, setLang] = useState<string>("es");

	const handleLang = (lang: string) => {
		setLang(lang);
	};
	const value = useMemo(
		() => ({
			lang,
			handleLang,
		}),
		[lang],
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
