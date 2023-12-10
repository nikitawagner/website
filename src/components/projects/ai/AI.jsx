import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import Button from "../../Button.jsx";
import { predictImage } from "../../../helper/ai/predictImage.js";
import LoadingSpinner from "../../LoadingSpinner.jsx";

const AI = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageElement, setSelectedImageElement] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const calculateResult = async () => {
        setLoading(true);
        const result = await predictImage(selectedImageElement);
        setResult(result);
        setLoading(false);
    };
    const resetAll = () => {
        setSelectedImage(null);
        setResult(null);
    };
    return (
        <div className="container bg-white">
            <h1 className="mb-3 mt-2 text-center text-4xl font-bold text-primary">
                Flower AI
            </h1>
            {!selectedImage && (
                <div className="text-center">Choose Image to start!</div>
            )}
            {selectedImage && (
                <div className="m-3 flex flex-col items-center justify-center">
                    <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(selectedImage)}
                        className="animation mb-2 rounded-lg duration-150 
                        hover:scale-101 hover:shadow-[5px_5px_0px_0px_rgba(100,108,255)]"
                    />
                    {!result ? (
                        loading ? (
                            <LoadingSpinner />
                        ) : (
                            <Button
                                text={"Calculate"}
                                action={() => calculateResult()}
                            />
                        )
                    ) : null}
                </div>
            )}

            {result && selectedImage && (
                <div className="flex flex-col items-center justify-center">
                    <div>It's a {result.name}!</div>
                    <div
                        className="w-full rounded-full bg-gray-200 dark:bg-gray-700"
                        style={{ width: "250px" }}>
                        <div
                            className="rounded-full bg-primary p-0.5 text-center text-xs 
                        font-medium leading-none text-white "
                            style={{
                                width: `${Math.round(result.percentage * 100)}%`
                            }}>
                            {" "}
                            {result.percentage}
                        </div>
                    </div>
                </div>
            )}
            <div className="m-3 flex items-center justify-around gap-4">
                <input
                    className="focus:shadow-te-primary relative m-0 block w-full min-w-0 
                    flex-auto rounded-xl border border-solid border-neutral-300 bg-white
                    px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition 
                    duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden 
                    file:rounded-none file:border-0 file:border-solid file:border-inherit 
                    file:bg-primary file:px-3 file:py-[0.32rem] file:text-white
                    file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] 
                    file:[margin-inline-end:0.75rem] hover:cursor-pointer file:hover:cursor-pointer 
                    hover:file:bg-secondary focus:border-primary focus:text-neutral-700 focus:outline-none 
                    dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 
                    dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file"
                    id="formFile"
                    onChange={(event) => {
                        resetAll();
                        setSelectedImage(event.target.files[0]);
                        if (event.target.files && event.target.files[0]) {
                            const imageUrl = URL.createObjectURL(
                                event.target.files[0]
                            );

                            // Create a new HTMLImageElement
                            const img = new Image();
                            img.src = imageUrl;
                            setSelectedImageElement(img);
                        }
                    }}
                />
                {selectedImage ? (
                    <FaTrash
                        onClick={() => resetAll()}
                        className="hover:cursor-pointer"
                        color="DarkRed"
                    />
                ) : (
                    <FaTrash className="opacity-40 hover:cursor-not-allowed" />
                )}
            </div>
        </div>
    );
};

export default AI;
