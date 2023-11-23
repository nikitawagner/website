import Button from "./Button.jsx";
import { cvLanguages } from "../helper/cvLanguages";

const CV = () => {
	return (
		<div className="container bg-white">
			<h1 className="text-4xl font-bold text-center mb-1 mt-2">CV</h1>
			<p className="text-center">
				Feel free explore my CV in your prefered language!{" "}
			</p>

			<div className="flex justify-around flex-wrap gap-3 mt-5">
				{cvLanguages.map((language) => {
					return <CV_Box language={language} />;
				})}
			</div>
			<p className="font-thin text-center">
				{"("}last updated 2023-11-23{")"}
			</p>
		</div>
	);
};

const CV_Box = ({ language }) => {
	return (
		<div className="flex flex-col justify-center items-center bg-gray-50 p-5 rounded-md hover:bg-gray-100">
			<img
				src={language.flag}
				alt={language.language}
				className="rounded-lg w-32 h-32"
			/>
			<div className="flex justify-around mt-2 mb-5 gap-3">
				<a href={language.file} target="_blank">
					<Button text={"view"} />
				</a>
				<a
					href={language.file}
					download={`WAGNER_Nikita_CV_${language.language}`}
				>
					<Button text={"download"} />
				</a>
			</div>
		</div>
	);
};

export default CV;
