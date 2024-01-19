import { useContext } from "react";
import useGetWords from "../hooks/useGetWords";
import useGetLang from "../hooks/useGetLang";
import { AppContext } from "./Context/AppContext";

const TextBox = () => {
	const { lang } = useContext(AppContext);
	const { data } = useGetWords({ number: 50, language: lang || "es" });
	const { languages } = useGetLang();

	return (
		<div id="textbox" className="min-h-[20vh] border-2 border-white mt-12">
			<p className="text-lg p-4">{data.join(" ")}</p>
		</div>
	);
};

export default TextBox;
