import React, { useState } from "react";
import useGetWords from "../hooks/useGetWords";
import useGetLang from "../hooks/useGetLang";

const TextBox = () => {
	const [country, setCountry] = useState<string>("es");
	const { data } = useGetWords({ number: 50, language: country });
	const { lang } = useGetLang();

	const handleLanguage = (data: string) => {
		setCountry(data);
	};

	return (
		<div id="textbox" className="border-2 border-white">
			{data.join(" ")}
		</div>
	);
};

export default TextBox;
