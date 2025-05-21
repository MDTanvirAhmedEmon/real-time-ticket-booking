import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

const Header = () => {
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-blue-600"></div>
                        <span className="text-xl font-bold text-blue-600">BusBooker</span>
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex space-x-8">
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-blue-600">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-blue-600">
                                    My Bookings
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-blue-600">
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Link href="#" className="hidden text-gray-600 hover:text-blue-600 md:block">
                            Sign In
                        </Link>
                        <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;