import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import Button from "../../Button.jsx";

const AI = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const calculateResult = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setResult({ name: "Rose", percentage: 0.954 });
        }, 2000);
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
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    class="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
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
