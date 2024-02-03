import { useContext } from "react";
import { AppContext } from "./Context/AppContext";

type PropType = {
	open: boolean;
};

const ResultsModal = ({ open }: PropType) => {
	const { stats } = useContext(AppContext);
	return (
		open && (
			<section>
				<div className="absolute top-0 left-0 w-screen h-screen bg-black/90 flex flex-col justify-center items-center z-30 text-3xl">
					<div className="text-orange-500">
						WPM: <b>{stats?.wpm}</b>
					</div>
					<div>
						Accuracy: <b>{stats?.accuracy}%</b>
					</div>
					<div className="text-[#22bb33]">
						Correct: <b>{stats?.correct}</b>
					</div>
					<div className="text-[#bb2124]">
						Wrong: <b>{stats?.incorrect}</b>
					</div>
					<div className="absolute bottom-44 z-50">
						<button
							className="text-2xl border-2 px-16 py-4"
							onClick={() => {
								window.location.assign("/");
							}}
						>
							Reintentar
						</button>
					</div>
				</div>
			</section>
		)
	);
};

export default ResultsModal;
