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
            <header className="z-50 w-screen bg-gray-50 shadow-sm md:sticky md:top-0">
                <nav className="mx-auto flex max-w-7xl items-center justify-around p-3">
                    <a href="/">
                        <div className="cursor-pointer">
                            <img
                                src="/nikita_logo.png"
                                alt="logo"
                                className="w-8"
                            />
                        </div>
                    </a>
                    <div
                        className={`${
                            hamburgerOpen
                                ? "top-[56px] p-5 text-2xl font-bold shadow-lg md:text-base"
                                : ""
                        } nav-links absolute left-0 top-[-100%]
                        flex min-h-[150px] w-full items-start justify-center bg-gray-50 px-5 md:static md:min-h-fit md:w-auto`}
                    >
                        <ul className="flex flex-col items-start gap-4 md:flex-row md:items-start md:gap-[4vw] ">
                            {navItems.map((item) => {
                                return (
                                    <li
                                        className="text-primary-blue cursor-pointer"
                                        key={item.name}
                                    >
                                        <div
                                            onClick={() => navigate(item.link)}
                                        >
                                            {item.name}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="flex items-center gap-5">
                        <Button
                            text={"Contact"}
                            action={() => navigate("/contact")}
                        />
                        <div
                            name="menu"
                            className="cursor-pointer text-3xl md:hidden"
                            onClick={toggleHamburgerMenu}
                        >
                            {hamburgerOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
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
                                    className="h-6 w-6"
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
