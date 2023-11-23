import { useState } from "react";
import { navItems } from "../helper/navItems";
import Button from "./Button.jsx";
import { useNavigate } from "react-router";

const Navbar = () => {
	const [hamburgerOpen, setHamburgerOpen] = useState(false);
	const navigate = useNavigate();
	const toggleHamburgerMenu = () => {
		console.log(!hamburgerOpen);
		setHamburgerOpen(!hamburgerOpen);
	};
	return (
		<>
			<header className="bg-gray-50 w-screen shadow-sm">
				<nav className="flex justify-around items-center max-w-7xl mx-auto p-3">
					<a href="/">
						<div className="cursor-pointer">
							<img src="/nikita_logo.png" alt="logo" className="w-8" />
						</div>
					</a>
					<div
						className={`${
							hamburgerOpen
								? "top-[56px] font-bold text-2xl md:text-base p-5 shadow-lg"
								: ""
						} nav-links md:static absolute bg-gray-50
                        md:min-h-fit min-h-[150px] left-0 top-[-100%] md:w-auto w-full flex items-start justify-center px-5`}
					>
						<ul className="flex gap-4 items-start flex-col md:flex-row md:items-start md:gap-[4vw] ">
							{navItems.map((item) => {
								return (
									<li
										className="cursor-pointer text-primary-blue"
										key={item.name}
									>
										<a href={item.link}>{item.name}</a>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="flex items-center gap-5">
						<Button text={"Contact"} action={() => navigate("/contact")} />
						<div
							name="menu"
							className="text-3xl cursor-pointer md:hidden"
							onClick={toggleHamburgerMenu}
						>
							{hamburgerOpen ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="2.5"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="2.5"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
							)}
						</div>
					</div>
				</nav>
			</header>
		</>
	);
};

export default Navbar;
