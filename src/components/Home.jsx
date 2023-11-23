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
		<div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-1 md:p-3">
			<div
				className="col-span-1 md:col-span-1 bg-primary rounded-lg
				aspect-w-1 aspect-h-1 h-40 transition-all duration-300 hover:scale-97"
			>
				<img src={nikita} className="rounded-lg object-cover w-full h-full" />
			</div>
			<div
				className="bg-amber-300 text-white rounded-md col-span-1 
				md:col-span-2 text-center text-3xl sm:text-6xl md:text-7xl font-bold 
				flex items-center justify-center flex-wrap h-40
				hover:shadow-[5px_5px_0px_0px_rgba(245,158,11)] hover:cursor-pointer
				transition-all duration-300 hover:scale-101"
				onClick={() => navigate("/about")}
			>
				<div className="shrink">NIKITA WAGNER</div>
			</div>
			<div
				className="bg-primarypastel p-4 text-white rounded-md col-span-2 
				md:col-span-3 text-center text-3xl sm:text-5xl md:text-7xl font-bold 
				flex items-center justify-center flex-wrap
				hover:shadow-[5px_5px_0px_0px_rgba(100,108,255)] hover:cursor-pointer
				transition-all duration-300 hover:scale-101"
				onClick={() => navigate("/projects")}
			>
				<div className="shrink">FULLSTACK DEVELOPEMENT</div>
			</div>
			<div
				className="bg-pink-300 text-white rounded-md col-span-1 
				md:col-span-1 text-center text-5xl sm:text-6xl md:text-8xl font-bold 
				flex items-center justify-center flex-wrap h-40
				hover:shadow-[5px_5px_0px_0px_rgba(236,72,153)] hover:cursor-pointer
				transition-all duration-300 hover:scale-101"
				onClick={() => navigate("/cv")}
			>
				<div className="shrink">CV</div>
			</div>
			<div
				className="col-span-1 md:col-span-2 bg-primary rounded-lg
				aspect-w-1 aspect-h-1 h-40 transition-all duration-300 hover:scale-97"
			>
				<img src={madrid} className="rounded-lg object-cover w-full h-full" />
			</div>
		</div>
	);
};

export default Home;
