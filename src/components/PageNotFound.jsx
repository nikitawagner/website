import { useNavigate } from "react-router";
import Button from "./Button.jsx";

const PageNotFound = () => {
	const navigate = useNavigate();
	return (
		<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-base font-semibold text-primary">404</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Seite nicht gefunden :{"("}
				</h1>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Button text={"Home"} action={() => navigate("/")} />
				</div>
			</div>
		</main>
	);
};

export default PageNotFound;
