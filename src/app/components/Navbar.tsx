'use client';

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {

    return (
        <nav className="fixed top-0 w-full flex items-center justify-around py-4 bg-green-400 text-white">
            <header>
                <Link href={"/"}>
                    <h1 className="text-2xl font-bold">A sample website</h1>
                </Link>
            </header>
            <ul className="flex gap-8">
                <li className=" text-lg"><Link href={'/about-us'}>About Us</Link></li>
                <Dropdown />
            </ul>
        </nav>
    )
}


function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className="relative text-lg">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1"
            >
                Account
                <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>

            {isOpen && (
                <ul className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2">
                    <li
                        onClick={() => setIsOpen(!isOpen)}
                        className="hover:bg-gray-100">
                        <Link href="/login" className="block px-4 py-2">
                            Login
                        </Link>
                    </li>
                    <li
                        onClick={() => setIsOpen(!isOpen)}
                        className="hover:bg-gray-100">
                        <Link href="/register" className="block px-4 py-2">
                            Register
                        </Link>
                    </li>
                </ul>
            )}
        </li>
    );
}