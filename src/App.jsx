import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" Component={Home} />
					<Route path="*" Component={PageNotFound} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
