import nikita from "../assets/home/nikita.jpg";
import madrid from "../assets/home/madrid.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
    return (
        <div className="container bg-white">
            <PortfolioGrid />
        </div>
    );
};

const PortfolioGrid = () => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-2 gap-4 p-1 md:grid-cols-3 md:p-3">
            <div
                className="aspect-w-1 aspect-h-1 col-span-1 h-40
				rounded-lg bg-primary transition-all duration-300 hover:scale-97 hover:cursor-not-allowed
				md:col-span-1">
                <img
                    src={nikita}
                    className="h-full w-full rounded-lg object-cover"
                />
            </div>
            <div
                className="col-span-1 flex h-40 flex-wrap 
				items-center justify-center rounded-md bg-primarypastel text-center text-3xl 
				font-bold text-white transition-all duration-300 hover:scale-101
				hover:cursor-pointer hover:shadow-[5px_5px_0px_0px_rgba(100,108,255)]
				sm:text-6xl md:col-span-2 md:text-7xl"
                onClick={() => navigate("/about")}>
                <div className="shrink">NIKITA WAGNER</div>
            </div>
            <div
                className="col-span-2 flex flex-wrap items-center justify-center 
				rounded-md bg-primary p-4 text-center text-3xl font-bold 
				text-white transition-all duration-300 hover:scale-101
				hover:cursor-pointer hover:shadow-[5px_5px_0px_0px_rgba(144,149,252)]
				sm:text-5xl md:col-span-3 md:text-7xl"
                onClick={() => navigate("/projects")}>
                <div className="shrink">FULLSTACK DEVELOPEMENT</div>
            </div>
            <div
                className="col-span-1 flex h-40 flex-wrap 
				items-center justify-center rounded-md bg-primarypastel text-center text-5xl 
				font-bold text-white transition-all duration-300 hover:scale-101
				hover:cursor-pointer hover:shadow-[5px_5px_0px_0px_rgba(100,108,255)]
				sm:text-6xl md:col-span-1 md:text-8xl"
                onClick={() => navigate("/cv")}>
                <div className="shrink">CV</div>
            </div>
            <div
                className="aspect-w-1 aspect-h-1 col-span-1 h-40
				rounded-lg bg-primary transition-all duration-300 hover:scale-97 hover:cursor-not-allowed
				md:col-span-2">
                <img
                    src={madrid}
                    className="h-full w-full rounded-lg object-cover"
                />
            </div>
        </div>
    );
};

export default Home;
