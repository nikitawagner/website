const button = ({ text, action }) => {
    return (
        <button
            className=" rounded-full bg-primary px-4 py-1 uppercase text-white transition duration-200 ease-in hover:bg-secondary hover:text-white focus:outline-none"
            onClick={() => action()}
        >
            {text}
        </button>
    );
};

export default button;
