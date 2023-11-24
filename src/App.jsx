import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import CV from "./components/CV";
import About from "./components/About";

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" Component={About} />
					<Route path="/cv" Component={CV} />
					<Route path="*" Component={PageNotFound} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
