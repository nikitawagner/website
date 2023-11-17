const button = ({ text, action }) => {
	return (
		<button
			className=" px-4 py-1 text-white bg-primary transition ease-in duration-200 uppercase rounded-full hover:bg-secondary hover:text-white focus:outline-none"
			onClick={() => action()}
		>
			{text}
		</button>
	);
};

export default button;
