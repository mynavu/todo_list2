
import React, { use } from "react";
import {useState} from "react";
import {request, setAuthToken, clearAuthToken} from "../axios_helper";
import type { AuthProps } from '../types/AuthProps';
import { Link, Navigate } from 'react-router-dom';
import { Square, SquareArrowRight } from "lucide-react";


export default function Register({ isAuthenticated, setIsAuthenticated }: AuthProps) {

    const [userInfo, setUserInfo] = useState<{ username: string; password: string }>({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        clearAuthToken();
        // Handle registration logic here
        console.log("Registering with", userInfo);
        if (userInfo.username.length < 3 || userInfo.password.length < 3) {
            setErrorMessage("Username must be at least 3 characters and password at least 3 characters.");
            return;
        }
        request('post', '/register', userInfo)
            .then(response => {
                console.log("Registration successful:", response.data);
                setAuthToken(response.data.token);
                setIsAuthenticated(true);
            })
            .catch(error => {
                console.error("Registration failed:", error);
                setErrorMessage("Username may already be taken. Please try again.");
                setIsAuthenticated(false);
            });
    }



    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-3 w-60">
            <div className="flex justify-between w-60">
            <Link to="/" className="hover:underline text-stone-300">← Back</Link>
            <Link to="/login" className="hover:underline text-stone-300">Login →</Link>
            </div>
            <div className="p-3 border rounded-lg">
            <h1 className="font-bold text-stone-300">Register</h1>
            <form  className="flex items-center flex-col">
                <div className="m-3">
                    <label className="text-stone-300">Username </label>
                    <input className="w-30 bg-none border-stone-300 border-2 rounded-sm text-stone-300"
                        type="text"
                        value={userInfo.username}
                        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                    />
                </div>
                <div className="m-3">
                    <label className="text-stone-300">Password </label>
                    <input className="w-30 bg-none border-stone-300 border-2 rounded-sm text-stone-300"
                        type="password"
                        value={userInfo.password}
                        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                    />
                </div>
                {errorMessage && <p className="text-red-300">{errorMessage}</p>}
                <div
                onClick={handleRegister}
                className="text-stone-300 mt-2 cursor-pointer flex items-center gap-2 group border-none outline-none focus:outline-none hover:outline-none focus:ring-0 hover:ring-0 shadow-none"
                >
                Submit
                {/* default */}
                <Square className="block text-stone-300 group-hover:hidden" />

                {/* on hover */}
                <SquareArrowRight className="hidden text-stone-300 group-hover:block" />
                </div>
                {isAuthenticated && <Navigate to="/todo" replace />}
            </form>
            </div>
        </div>
    );
}