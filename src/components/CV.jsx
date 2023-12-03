import Button from "./Button.jsx";
import { cvLanguages } from "../helper/cvLanguages";

const CV = () => {
    return (
        <div className="container bg-white">
            <h1 className="mb-1 mt-2 text-center text-4xl font-bold text-primary">
                CV
            </h1>
            <p className="text-center">
                Feel free to explore my CV in your prefered language!{" "}
            </p>

            <div className="mt-5 flex flex-wrap justify-around gap-3">
                {cvLanguages.map((language, index) => {
                    return <CV_Box language={language} key={index} />;
                })}
            </div>
            <p className="text-center font-thin">
                {"("}last updated 2023-11-23{")"}
            </p>
        </div>
    );
};

const CV_Box = ({ language }) => {
    return (
        <div
            className="animation flex flex-col items-center justify-center rounded-md bg-gray-50 
        p-5 duration-150 hover:scale-101 hover:shadow-[5px_5px_0px_0px_rgba(100,108,255)]">
            <img
                src={language.flag}
                alt={language.language}
                className="h-32 w-32 rounded-lg"
            />
            <div className="mb-5 mt-2 flex justify-around gap-3">
                <a href={language.file} target="_blank">
                    <Button text={"view"} />
                </a>
                <a
                    href={language.file}
                    download={`WAGNER_Nikita_CV_${language.language}`}>
                    <Button text={"download"} />
                </a>
            </div>
        </div>
    );
};

export default CV;
