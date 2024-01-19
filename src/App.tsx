import "./App.css";
import { AppContextProvider } from "./components/Context/AppContext";
import TypingTest from "./pages/TypingTest";

const App = () => {
	return (
		<AppContextProvider>
			<TypingTest />
		</AppContextProvider>
	);
};

export default App;
