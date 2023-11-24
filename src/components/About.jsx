import React, { useRef, useState } from "react";
import nikita from "../assets/about/nikita.jpg";
import { aboutImages } from "../helper/aboutImages";
import { useNavigate } from "react-router-dom";

const About = () => {
	return (
		<>
			<ShortInfo />
			<Timeline />
			<br></br>
			<br></br>
			<br></br>
		</>
	);
};

const ShortInfo = () => {
	const calculateAge = (birthdate) => {
		const birthDate = new Date(birthdate);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};

	const navigate = useNavigate();

	const age = calculateAge("2002-02-26");
	return (
		<div className="container bg-white">
			<div className="flex justify-around items-center flex-wrap">
				<div className="hidden md:block md:w-1/3 p-3 object-cover w-full h-full">
					<img src={nikita} className="rounded-lg object-cover w-full h-full" />
				</div>
				<div className="md:w-2/3 p-3">
					<div className="flex flex-col justify-center">
						<h1 className="text-3xl font-bold mb-3 text-primary">
							NIKITA WAGNER
						</h1>
						<p>
							I am a {age} year old{" "}
							<b className="text-primary">Computer Science</b> student and a
							passionate programmer. I love building{" "}
							<b className="text-primary">Fullstack Applications</b> and see
							people being happy using these solutions! Scroll down to see my
							what I have done the last years. Or view my{" "}
							<b
								className="text-primary hover:cursor-pointer"
								onClick={() => navigate("/cv")}
							>
								CV as a PDF
							</b>
							.
						</p>
						<br />
						<p>
							Apart from that, I love travelling (see below), doing sports and
							eating good food.
						</p>
						<ImageGrid images={aboutImages} />
					</div>
					<div className="md:w-1/3 p-3 md:hidden">
						<img
							src={nikita}
							className="rounded-lg object-cover w-full h-full"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const ImageGrid = ({ images }) => {
	const [loading, setLoading] = useState(true);
	const counter = useRef(0);
	const imageLoaded = () => {
		counter.current += 1;
		if (counter.current >= images.length) {
			setLoading(false);
		}
	};
	return (
		<div className="flex overflow-x-auto gap-1 mt-3 shrink pb-3">
			{images.map((image, index) => (
				<React.Fragment key={index}>
					<div className="flex-none w-auto md:w-auto">
						<div
							className={`h-20 object-cover rounded-lg 
                      bg-gray-100 animate-pulse flex items-center
                      justify-center w-20 ${
												loading ? "hidden md:block" : "hidden"
											}`}
						></div>
						<div>
							<img
								src={image.src}
								alt={image.alt}
								className={`h-20 lg:h-32 object-cover rounded-lg hover:scale-101 
                        transition-all duration-300 select-none
                        ${loading ? "hidden" : ""}`}
								onLoad={() => imageLoaded(index)}
							/>
						</div>
					</div>
				</React.Fragment>
			))}
		</div>
	);
};

const Timeline = () => {
	return (
		<div className="container bg-white">
			<ol className="relative border-s border-gray-200 dark:border-gray-700 pr-2">
				<li className="mb-10 ms-6">
					<span className="absolute flex items-center justify-center w-6 h-6 bg-gray-50 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
						<img src="./about/vw.png" className="w-6 h-6" />
					</span>
					<h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
						Dual Study Program at{" "}
						<span className="text-primary">&nbsp;VOLKSWAGEN&nbsp;</span>{" "}
						(Hannover)
						<span className="bg-primary text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
							Latest
						</span>
					</h3>
					<time className="block mb-2 font-normal leading-none text-gray-600 dark:text-gray-500 mb-4">
						2021/09 - 2025/02
					</time>
					<p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
						Web Application{" "}
						{/* with over <b className="text-primary">1000</b> daily users  */}
						that incubates the communication between teams and team leaders:
					</p>
					<ul className="list-disc list-inside">
						<li>
							Frontend Development: <b className="text-primary">ReactJS</b> and{" "}
							<b className="text-primary">VueJS</b>
						</li>
						<li>
							Backend Development: <b className="text-primary">NodeJS</b> and{" "}
							<b className="text-primary">MySQL</b>
						</li>
						<li>
							Automating workflows: <b className="text-primary">GitLab CI/CD</b>{" "}
							and <b className="text-primary">Linux</b>
						</li>
					</ul>
				</li>
				<li className="mb-10 ms-6">
					<span className="absolute flex items-center justify-center w-6 h-6 bg-gray-50 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
						<img src="./about/iut.png" className="w-3.5 h-3.5" />
					</span>
					<h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
						ERASMUS Computer Science at{" "}
						<span className="text-primary">&nbsp;IUT D'ORSAY&nbsp;</span>{" "}
						(Paris)
					</h3>
					<time className="block mb-2 font-normal leading-none text-gray-600 dark:text-gray-500">
						2023/09 - 2024/02
					</time>
					<p className="text-base font-normal text-gray-500 dark:text-gray-400">
						Due to my interest in travelling, it was clear to me that I wanted
						to go abroad for a semester. I have not only improved my French
						skills but I have also grown as a person. The most interesting
						topics were:
						<ul className="list-disc list-inside">
							<li>
								Introduction to AI: <b className="text-primary">Python</b>
							</li>
							<li>
								Developement of a <b className="text-primary">Unity Game</b> in
								a team of 20 people:{" "}
							</li>
							<li>
								Semantic Web: <b className="text-primary">SPARQL</b>,{" "}
								<b className="text-primary">SHACL</b>
							</li>
							<li>
								Automating workflows: <b className="text-primary">Docker</b>,{" "}
								<b className="text-primary">Kubernetes</b>
							</li>
							<li>
								How to be a project manager:{" "}
								<b className="text-primary">Social Psychology</b>
							</li>
						</ul>
					</p>
				</li>
				<li className="mb-10 ms-6">
					<span className="absolute flex items-center justify-center w-6 h-6 bg-gray-50 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
						<img src="./about/ostfalia.png" className="w-3.5 h-3.5" />
					</span>
					<h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
						BSc Computer Science at{" "}
						<span className="text-primary">&nbsp;OSTFALIA&nbsp;</span>{" "}
						(Wolfenbüttel)
					</h3>
					<time className="block mb-2 font-normal leading-none text-gray-600 dark:text-gray-500">
						2021/09 - 2025/02
					</time>
					<p className="text-base font-normal text-gray-500 dark:text-gray-400">
						In this practical oriented university I chose the specialization in
						Software Engineering and these are some of the most interesting
						topics:
						<ul className="list-disc list-inside">
							<li>
								Software Engineering I/II:{" "}
								<b className="text-primary">Software Design Patterns</b>{" "}
								implemented in <b className="text-primary">Java</b>,{" "}
								<b className="text-primary">UML</b> as a modelling language
							</li>
							<li>
								Theoretical Computer Science:{" "}
								<b className="text-primary">Abstract Machines</b>,{" "}
								<b className="text-primary">Formal languages</b>
							</li>
							<li>
								Webdevelopment: <b className="text-primary">ReactJS</b>,{" "}
								<b className="text-primary">NodeJS</b>
							</li>
						</ul>
					</p>
				</li>
			</ol>
		</div>
	);
};

export default About;
