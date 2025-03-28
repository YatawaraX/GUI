import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/logo.png";
import { LiaTimesSolid } from 'react-icons/lia';
import { FaBars, FaPhone } from 'react-icons/fa6';
import Theme from '../theme/Theme';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/bus", label: "Bus" },
        { href: "/services", label: "Services" },
    ];

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='w-full h-[8ch] bg-neutral-100 dark:bg-neutral-900 flex items-center md:flex-row lg:px-28 md:px-16 sm:px-7 px-4 fixed top-0 z-50'>
            {/* Logo section */}
            <Link to={"/"} className='mr-16'>
                <img src={Logo} alt="logo" className="w-28 h-auto object-contain" />
            </Link>

            {/* Toggle button */}
            <button onClick={handleClick} className="flex-1 lg:hidden text-neutral-600 dark:text-neutral-300 ease-in-out duration-300 flex items-center justify-end">
                {open ? <LiaTimesSolid className='text-xl' /> : <FaBars className='text-xl' />}
            </button>

            {/* Navigation links */}
            <div className={`${open ? 'flex absolute top-14 left-0 w-full h-auto md:h-auto md:relative' : 'hidden'} flex-1 md:flex flex-col md:flex-row gap-x-5 gap-y-2 md:items-center md:p-0 sm:p-4 p-4 justify-between md:bg-transparent bg-neutral-100 md:shadow-none shadow-md rounded-md`}>
                <ul className="list-none flex md:items-center items-start gap-x-5 gap-y-1 flex-wrap md:flex-row flex-col text-base text-neutral-600 dark:text-neutral-500 font-medium">
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <Link to={link.href} onClick={handleClose} className="hover:text-violet-600 ease-in-out duration-300">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex md:items-center items-start gap-x-5 gap-y-2 flex-wrap md:flex-row flex-col text-base font-medium text-neutral-800">
                    {/* Login and Register Buttons */}
                    <button onClick={() => setShowLogin(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
                    <button onClick={() => setShowRegister(true)} className="bg-green-500 text-white px-4 py-2 rounded-md">Register</button>

                    {/* Help Section */}
                    <div className="relative bg-violet-600 rounded-md px-8 py-2 w-fit cursor-pointer">
                        <div className="absolute top-[50%] -left-6 translate-y-[-50%] w-9 h-9 rounded-full bg-violet-600 border-4 border-neutral-100 dark:border-neutral-900 flex items-center justify-center">
                            <FaPhone className='text-neutral-50 text-sm' />
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-xs text-neutral-200 font-light">Need Help?</p>
                            <p className="text-xs font-normal text-neutral-50 tracking-wide">+91 1234567890</p>
                        </div>
                    </div>

                    {/* Theme */}
                    <Theme />
                </div>
            </div>

            {/* Login Modal */}
            {showLogin && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-96 relative">
                        <button onClick={() => setShowLogin(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">✖</button>
                        <h2 className="text-xl font-bold mb-4">Login</h2>
                        <form className="flex flex-col gap-4">
                            <input type="email" placeholder="Email" className="border p-2 rounded" />
                            <input type="password" placeholder="Password" className="border p-2 rounded" />
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember" className="text-sm">Remember Me</label>
                            </div>
                            <button className="bg-blue-500 text-white p-2 rounded">Login</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Register Modal */}
            {showRegister && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-96 relative">
                        <button onClick={() => setShowRegister(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">✖</button>
                        <h2 className="text-xl font-bold mb-4">Register</h2>
                        <form className="flex flex-col gap-4">
                            <input type="text" placeholder="First Name" className="border p-2 rounded" />
                            <input type="text" placeholder="Last Name" className="border p-2 rounded" />
                            <input type="email" placeholder="Email" className="border p-2 rounded" />
                            <input type="password" placeholder="Password" className="border p-2 rounded" />
                            <div className="flex items-center gap-2">
                                <input type="radio" id="passenger" name="role" />
                                <label htmlFor="passenger" className="text-sm">Passenger</label>
                                <input type="radio" id="busowner" name="role" />
                                <label htmlFor="busowner" className="text-sm">Bus Owner</label>
                            </div>
                            <button className="bg-green-500 text-white p-2 rounded">Register</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;