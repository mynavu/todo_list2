import { Link, Navigate } from 'react-router-dom';
import React from "react";
import type { AuthProps } from '../types/AuthProps';
import { ClipboardList, Leaf, Atom } from "lucide-react";

export default function Home({ isAuthenticated, setIsAuthenticated }: AuthProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="font-bold text-stone-300">Todo List </h1>
            <p className='mb-3 text-stone-300'>made with React <Atom className='inline size-4 !text-cyan-200'/> and SpringBoot <Leaf className='inline size-4 !text-lime-200'/></p>
            <div className="flex gap-4">
            <Link to="/login" className="p-2 border-2 rounded-sm  bg-white/10 hover:bg-white/20 transition cursor-pointer !text-stone-300">Login</Link>
            <Link to="/register" className="p-2 border-2 rounded-sm bg-white/10 hover:bg-white/20 transition cursor-pointer !text-stone-300">Register</Link>
            </div>
            {isAuthenticated && <Navigate to="/todo" replace />}
        </div>
    );
}