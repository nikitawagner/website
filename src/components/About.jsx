import React, { useRef, useState } from "react";
import nikita from "../assets/about/nikita.jpg";
import { aboutImages } from "../helper/aboutImages";
import { useNavigate } from "react-router-dom";
import picture1 from "../assets/techstack/auth0.png";
import picture2 from "../assets/techstack/css3.png";
import picture3 from "../assets/techstack/docker.png";
import picture4 from "../assets/techstack/edge.png";
import picture5 from "../assets/techstack/figma.png";
import picture6 from "../assets/techstack/github.png";
import picture7 from "../assets/techstack/gitlab.png";
import picture8 from "../assets/techstack/html5.png";
import picture9 from "../assets/techstack/java.png";
import picture10 from "../assets/techstack/js.png";
import picture11 from "../assets/techstack/json.png";
import picture12 from "../assets/techstack/kubernetes.png";
import picture13 from "../assets/techstack/lightroom.png";
import picture14 from "../assets/techstack/linux.png";
import picture15 from "../assets/techstack/material-ui.png";
import picture16 from "../assets/techstack/mongodb.png";
import picture17 from "../assets/techstack/mysql.png";
import picture18 from "../assets/techstack/nodejs.png";
import picture19 from "../assets/techstack/npm.png";
import picture20 from "../assets/techstack/postman.png";
import picture21 from "../assets/techstack/prettier.png";
import picture22 from "../assets/techstack/prisma.png";
import picture23 from "../assets/techstack/python.png";
import picture24 from "../assets/techstack/react-router.png";
import picture25 from "../assets/techstack/reactjs.png";
import picture26 from "../assets/techstack/tailwind.png";
import picture27 from "../assets/techstack/vitejs.png";
import picture28 from "../assets/techstack/vs.png";
import picture29 from "../assets/techstack/wordpress.png";

const About = () => {
    return (
        <>
            <ShortInfo />
            <ImageScroller />

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
                                onClick={() => navigate("/cv")}>
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
                            className={`flex h-20 w-20 animate-pulse
                      items-center justify-center rounded-lg bg-gray-100
                      object-cover lg:h-32 ${
                          loading ? "hidden md:block" : "hidden"
                      }`}></div>
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
            <ol className="relative m-3 border-s border-gray-200 pr-2">
            <li className="mb-10 ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-8 ring-white">
                        <img
                            src="./about/dreifach.jpg"
                            className="h-3.5 w-3.5"
                        />
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                        Working Student at{" "}
                        <span className="text-primary">
                            &nbsp;dreifach.ai&nbsp;
                        </span>{" "}
                        (Remote)
                        <span className="me-2 ms-3 rounded bg-primary px-2.5 py-0.5 text-sm font-medium text-white ">
                            Latest
                        </span>
                    </h3>
                    <time className="mb-2 block font-normal leading-none text-gray-600">
                        2025/04 - 
                    </time>
                    <div className="text-base font-normal text-gray-500">
                        <ul className="list-inside list-disc">
                            <li>
                                Full Stack Software Engineering:{" "}
                                <b className="text-primary">
                                    TypeScript, EffectJS, NextJS, Prisma, Git
                                </b>
                            </li>
                            <li>
                                Process Automation:{" "}
                                <b className="text-primary">
                                    Copilot Studio with Microsoft Power Platform
                                </b>
                            </li>
                        </ul>
                    </div>
                </li>
            <li className="mb-10 ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-8 ring-white">
                        <img
                            src="./about/luh.png"
                            className="h-3.5 w-3.5"
                        />
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                        Msc Computer Science at{" "}
                        <span className="text-primary">
                            &nbsp;Leibniz Universität Hannover&nbsp;
                        </span>{" "}
                        (Hannover)
                    </h3>
                    <time className="mb-2 block font-normal leading-none text-gray-600">
                        2025/04 - 2027/03
                    </time>
                    <div className="text-base font-normal text-gray-500">
                        <ul className="list-inside list-disc">
                            <li>
                                Artificial Intelligence:{" "}
                                <b className="text-primary">
                                    Automated Machine Learning
                                </b>
                            </li>
                            <li>
                                Software Engineering:{" "}
                                <b className="text-primary">
                                    Software Quality
                                </b>
                                and {" "}
                                <b className="text-primary">Requirements Engineering</b>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="mb-10 ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-8 ring-white ">
                        <img src="./about/vw.png" className="h-6 w-6" />
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                        Dual Study Program at{" "}
                        <span className="text-primary">
                            &nbsp;VOLKSWAGEN&nbsp;
                        </span>{" "}
                        (Hannover)
                    </h3>
                    <time className="mb-2 mb-4 block font-normal leading-none text-gray-600 ">
                        2021/09 - 2025/04
                    </time>
                    <p className="mb-4 text-base font-normal text-gray-500 "></p>
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
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-8 ring-white">
                        <img src="./about/iut.png" className="h-3.5 w-3.5" />
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                        ERASMUS Computer Science at{" "}
                        <span className="text-primary">
                            &nbsp;IUT D'ORSAY&nbsp;
                        </span>{" "}
                        (Paris)
                    </h3>
                    <time className="mb-2 block font-normal leading-none text-gray-600">
                        2023/09 - 2024/02
                    </time>
                    <div className="text-base font-normal text-gray-500">
                        <ul className="list-inside list-disc">
                            <li>
                                Introduction to AI:{" "}
                                <b className="text-primary">Python</b>
                            </li>
                            <li>
                                Webapplication with{" "}
                                <b className="text-primary">Django</b>
                            </li>
                            <li>
                                Developement of a{" "}
                                <b className="text-primary">Unity Game</b> in a
                                team of 20 people{" "}
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
                    </div>
                </li>
                <li className="mb-10 ms-6">
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-8 ring-white">
                        <img
                            src="./about/ostfalia.png"
                            className="h-3.5 w-3.5"
                        />
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900">
                        BSc Computer Science at{" "}
                        <span className="text-primary">
                            &nbsp;OSTFALIA&nbsp;
                        </span>{" "}
                        (Wolfenbüttel)
                    </h3>
                    <time className="mb-2 block font-normal leading-none text-gray-600">
                        2021/09 - 2025/02
                    </time>
                    <div className="text-base font-normal text-gray-500">
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
                    </div>
                </li>
            </ol>
        </div>
    );
};

const ImageScroller = () => {
    const images = [
        picture1,
        picture2,
        picture3,
        picture4,
        picture5,
        picture6,
        picture7,
        picture8,
        picture9,
        picture10,
        picture11,
        picture12,
        picture13,
        picture14,
        picture15,
        picture16,
        picture17,
        picture18,
        picture19,
        picture20,
        picture21,
        picture22,
        picture23,
        picture24,
        picture25,
        picture26,
        picture27,
        picture28,
        picture29
    ];

    return (
        <div className="container-no-border">
            <div
                className="inline-flex w-full flex-nowrap overflow-hidden 
            [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]
            md:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
                <ul className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-1 md:[&_li]:mx-5">
                    {images.map((image, index) => {
                        return (
                            <li key={index}>
                                <img
                                    src={image}
                                    alt="Image"
                                    className="h-14 hover:scale-110 hover:cursor-pointer"
                                />
                            </li>
                        );
                    })}
                </ul>
                <ul className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-1 md:[&_li]:mx-5">
                    {images.map((image, index) => {
                        return (
                            <li key={index}>
                                <img
                                    src={image}
                                    alt="Image"
                                    className="h-14 hover:scale-110 hover:cursor-pointer"
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default About;
