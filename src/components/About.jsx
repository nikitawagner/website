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
            <div className="flex flex-wrap items-center justify-around">
                <div className="hidden h-full w-full object-cover p-3 md:block md:w-1/3">
                    <img
                        src={nikita}
                        className="h-full w-full rounded-lg object-cover"
                    />
                </div>
                <div className="p-3 md:w-2/3">
                    <div className="flex flex-col justify-center">
                        <h1 className="mb-3 text-3xl font-bold text-primary">
                            NIKITA WAGNER
                        </h1>
                        <p>
                            I am a {age} year old{" "}
                            <b className="text-primary">Computer Science</b>{" "}
                            student and a passionate programmer. I love building{" "}
                            <b className="text-primary">
                                Fullstack Applications
                            </b>{" "}
                            and see people being happy using these solutions!
                            Scroll down to see my what I have done the last
                            years. Or view my{" "}
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
                            Apart from that, I love travelling (see below),
                            doing sports and eating good food.
                        </p>
                        <ImageGrid images={aboutImages} />
                    </div>
                    <div className="p-3 md:hidden md:w-1/3">
                        <img
                            src={nikita}
                            className="h-full w-full rounded-lg object-cover"
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
        <div className="mt-3 flex shrink gap-1 overflow-x-auto pb-3">
            {images.map((image, index) => (
                <React.Fragment key={index}>
                    <div className="w-auto flex-none md:w-auto">
                        <div
                            className={`flex h-20 w-20 
                      animate-pulse items-center justify-center rounded-lg
                      bg-gray-100 object-cover ${
                          loading ? "hidden md:block" : "hidden"
                      }`}
                        ></div>
                        <div>
                            <img
                                src={image.src}
                                alt={image.alt}
                                className={`h-20 select-none rounded-lg object-cover transition-all 
                        duration-300 hover:scale-101 lg:h-32
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
            <ol className="relative border-s border-gray-200 pr-2 dark:border-gray-700">
                <li className="mb-10 ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-50 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                        <img src="./about/vw.png" className="h-6 w-6" />
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                        Dual Study Program at{" "}
                        <span className="text-primary">
                            &nbsp;VOLKSWAGEN&nbsp;
                        </span>{" "}
                        (Hannover)
                        <span className="me-2 ms-3 rounded bg-primary px-2.5 py-0.5 text-sm font-medium text-white dark:bg-blue-900 dark:text-blue-300">
                            Latest
                        </span>
                    </h3>
                    <time className="mb-2 mb-4 block font-normal leading-none text-gray-600 dark:text-gray-500">
                        2021/09 - 2025/02
                    </time>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        Web Application{" "}
                        {/* with over <b className="text-primary">1000</b> daily users  */}
                        that incubates the communication between teams and team
                        leaders:
                    </p>
                    <ul className="list-inside list-disc">
                        <li>
                            Frontend Development:{" "}
                            <b className="text-primary">ReactJS</b> and{" "}
                            <b className="text-primary">VueJS</b>
                        </li>
                        <li>
                            Backend Development:{" "}
                            <b className="text-primary">NodeJS</b> and{" "}
                            <b className="text-primary">MySQL</b>
                        </li>
                        <li>
                            Automating workflows:{" "}
                            <b className="text-primary">GitLab CI/CD</b> and{" "}
                            <b className="text-primary">Linux</b>
                        </li>
                    </ul>
                </li>
                <li className="mb-10 ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-50 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                        <img src="./about/iut.png" className="h-3.5 w-3.5" />
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                        ERASMUS Computer Science at{" "}
                        <span className="text-primary">
                            &nbsp;IUT D'ORSAY&nbsp;
                        </span>{" "}
                        (Paris)
                    </h3>
                    <time className="mb-2 block font-normal leading-none text-gray-600 dark:text-gray-500">
                        2023/09 - 2024/02
                    </time>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Due to my interest in travelling, it was clear to me
                        that I wanted to go abroad for a semester. I have not
                        only improved my French skills but I have also grown as
                        a person. The most interesting topics were:
                        <ul className="list-inside list-disc">
                            <li>
                                Introduction to AI:{" "}
                                <b className="text-primary">Python</b>
                            </li>
                            <li>
                                Developement of a{" "}
                                <b className="text-primary">Unity Game</b> in a
                                team of 20 people:{" "}
                            </li>
                            <li>
                                Semantic Web:{" "}
                                <b className="text-primary">SPARQL</b>,{" "}
                                <b className="text-primary">SHACL</b>
                            </li>
                            <li>
                                Automating workflows:{" "}
                                <b className="text-primary">Docker</b>,{" "}
                                <b className="text-primary">Kubernetes</b>
                            </li>
                            <li>
                                How to be a project manager:{" "}
                                <b className="text-primary">
                                    Social Psychology
                                </b>
                            </li>
                        </ul>
                    </p>
                </li>
                <li className="mb-10 ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-50 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                        <img
                            src="./about/ostfalia.png"
                            className="h-3.5 w-3.5"
                        />
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                        BSc Computer Science at{" "}
                        <span className="text-primary">
                            &nbsp;OSTFALIA&nbsp;
                        </span>{" "}
                        (Wolfenbüttel)
                    </h3>
                    <time className="mb-2 block font-normal leading-none text-gray-600 dark:text-gray-500">
                        2021/09 - 2025/02
                    </time>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        In this practical oriented university I chose the
                        specialization in Software Engineering and these are
                        some of the most interesting topics:
                        <ul className="list-inside list-disc">
                            <li>
                                Software Engineering I/II:{" "}
                                <b className="text-primary">
                                    Software Design Patterns
                                </b>{" "}
                                implemented in{" "}
                                <b className="text-primary">Java</b>,{" "}
                                <b className="text-primary">UML</b> as a
                                modelling language
                            </li>
                            <li>
                                Theoretical Computer Science:{" "}
                                <b className="text-primary">
                                    Abstract Machines
                                </b>
                                ,{" "}
                                <b className="text-primary">Formal languages</b>
                            </li>
                            <li>
                                Webdevelopment:{" "}
                                <b className="text-primary">ReactJS</b>,{" "}
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
