import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import CV from "./components/CV";
import About from "./components/About";
import Projects from "./components/Projects";
import Project from "./components/Project";
import AI from "./components/projects/ai/AI";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" Component={About} />
                    <Route path="/cv" Component={CV} />
                    <Route path="/projects" Component={Projects} />
                    <Route path="/projects/:id" Component={Project} />
                    <Route path="/projects/flower-ai" Component={AI} />
                    <Route path="*" Component={PageNotFound} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
