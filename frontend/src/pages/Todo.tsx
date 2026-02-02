import React from "react";
import {useState, useEffect} from "react";
import type { AuthProps } from '../types/AuthProps';
import { motion } from "framer-motion";

import { Link, Navigate } from 'react-router-dom';
import {request, clearAuthToken} from "../axios_helper";
import { Calendar, CalendarArrowDown, Square, SquareCheck, SquareCheckBig, SquareStar, SquareX } from "lucide-react";

export default function Todo({setIsAuthenticated, isAuthenticated}: AuthProps) {

    interface TodoItem {
        task: string;
        dateCreated?: string;
        dateCompleted?: string;
        isCompleted: boolean;
        id: string;
        isStarred: boolean;
        showDates?: boolean;
    }

    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    useEffect(() => {
        // Fetch existing todos from backend if needed
        request('GET', '/todo_list', {})
            .then(response => {
                console.log("Fetched todos:", response.data);
                setTodos(response.data);
            })
            .catch(error => {
                console.error("Error fetching todos:", error);
                setIsAuthenticated(false);
                
            });

    }, []);

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toISOString().slice(0, 10).replace(/-/g, "/");
    };


    const handleAddTodo = async () => {
        if (newTodo.trim() !== "") {
            try {
                const response = await request('POST', '/create_todo', { task: newTodo });
                console.log("Todo added:", response.data);
                setTodos(prev => [...prev, response.data]);
                setNewTodo("");
            } catch (error) {
                console.error("Error adding todo:", error);
                setIsAuthenticated(false);
            }
        }
    };

    const handleLogout = () => {
        clearAuthToken();
        setIsAuthenticated(false);
    }

    const handleDeleteTodo = async (id: string) => {
        try {
            await request('DELETE', `/delete_todo/${id}`, {});
            setTodos(prev => prev.filter(todo => todo.id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
            setIsAuthenticated(false);
        }
    };

    const handleToggleTodo = async (id: string) => {
  try {
    const response = await request('PUT', `/toggle_todo/${id}`, {});
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...response.data, showDates: todo.showDates }
          : todo
      )
    );
  } catch (error) {
    console.error("Error toggling todo:", error);
    setIsAuthenticated(false);
  }
};

    const handleStarTodo = async (id: string) => {
        try {
            const response = await request('PUT', `/star_todo/${id}`, {});
            setTodos(prev =>
                prev.map(todo =>
                    todo.id === id
                    ? { ...response.data, showDates: todo.showDates }
                    : todo
                )
            ); 
        } catch (error) {
            console.error("Error starring todo:", error);
            setIsAuthenticated(false);
        }
    };


    const handleShowDates = (id: string) => {
        setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, showDates: todo.showDates === null ? true : !todo.showDates } : todo));
    };



    return (
       <div className="w-full flex flex-col items-center justify-center min-h-screen gap-4 p-4">
            {!isAuthenticated && <Navigate to="/" replace />}
            <div onClick={handleLogout} className="hover:underline transition cursor-pointer text-stone-300">← logout</div>
            <h1 className="font-bold text-stone-300">Todo List</h1>
            <div className="flex h-15 pt-2 pb-2 justify-between w-100">
                <input className="p-2 border-2 border-stone-300 rounded-sm text-stone-300" type="text" placeholder="New todo item" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                <div className="p-2 border-2 rounded-sm bg-white/10 hover:bg-white/20 transition cursor-pointer text-stone-300" onClick={handleAddTodo}>Add Todo +</div>
            </div>
            {todos.length > 0 ? (
                <motion.ul
                className=" flex flex-col w-100"
                >
                {todos
                    .sort((a, b) => {
                    if (a.isStarred !== b.isStarred) {
                        return a.isStarred === false ? 1 : -1;
                    }
                    return a.task.localeCompare(b.task);
                    })
                    .map((todo) => (
                    <motion.li
                        key={todo.id}
                        layout
                        className="relative mb-2"
                    >
                        <div className="flex relative justify-between w-full">
                            {/* ACTION BAR */}
                            <div className="flex relative w-20 rounded-sm pl-1 pr-1 bg-stone-800 z-1 ml-2">
                                {/* TOGGLE COMPLETE */}
                                <div
                                    className="cursor-pointer flex items-center gap-2 group"
                                    onClick={() => handleToggleTodo(todo.id)}
                                >
                                    {/* NOT COMPLETED */}
                                    {!todo.isCompleted && (
                                        <>
                                        {/* Square – default */}
                                        <SquareCheck
                                            className="
                                            block
                                            text-stone-300
                                            transition-colors duration-150
                                            group-hover:hidden
                                            "
                                        />

                                        {/* Checked – on hover */}
                                        <SquareCheck
                                            className="
                                            hidden
                                            text-lime-200
                                            transition-colors duration-150
                                            group-hover:block
                                            "
                                        />
                                        </>
                                    )}

                                    {/* COMPLETED */}
                                    {todo.isCompleted && (
                                        <>
                                        {/* Checked – default + hover */}
                                        <SquareCheck
                                            className="
                                            block
                                            text-lime-200
                                            transition-colors duration-150
                                            group-hover:text-lime-300
                                            group-active:hidden
                                            "
                                        />

                                        {/* Square – only while pressed */}
                                        <Square
                                            className="
                                            hidden
                                            text-lime-300
                                            group-active:block
                                            "
                                        />
                                        </>
                                    )}

                                </div>

                                {/* TOGGLE STAR */}
                                <div
                                    className="cursor-pointer flex items-center gap-2 group"
                                    onClick={() => handleStarTodo(todo.id)}
                                >
                                    {/* NOT COMPLETED */}
                                    {!todo.isStarred && (
                                        <>
                                        {/* Square – default */}
                                        <SquareStar
                                            className="
                                            block
                                            text-stone-300
                                            transition-colors duration-150
                                            group-hover:hidden
                                            "
                                        />

                                        {/* Starred – on hover */}
                                        <SquareStar
                                            className="
                                            hidden
                                            text-yellow-200
                                            transition-colors duration-150
                                            group-hover:block
                                            "
                                        />
                                        </>
                                    )}

                                    {/* COMPLETED */}
                                    {todo.isStarred && (
                                        <>
                                        {/* Starred – default + hover */}
                                        <SquareStar
                                            className="
                                            block
                                            text-yellow-200
                                            transition-colors duration-150
                                            group-hover:text-yellow-300
                                            group-active:hidden
                                            "
                                        />

                                        {/* Square – only while pressed */}
                                        <Square
                                            className="
                                            hidden
                                            text-yellow-300
                                            group-active:block
                                            "
                                        />
                                        </>
                                    )}

                                </div>

                                {/* DELETE */}
                                <div
                                    className="cursor-pointer flex items-center gap-2 group"
                                    onClick={() => handleDeleteTodo(todo.id)}
                                >
                                    <SquareX className="block group-hover:hidden text-stone-300" />
                                    <SquareX className="hidden group-hover:block text-red-300" />
                                </div>
                            </div>
                            <div className="flex relative w-8 rounded-sm pl-1 pr-1 bg-stone-800 z-1 mr-2">
                                <div
                                    className="cursor-pointer flex items-center gap-2 group"
                                    onClick={() => handleShowDates(todo.id)}
                                >
                                    {/* NOT COMPLETED */}
                                    {!todo.showDates && (
                                        <>
                                        {/* Square – default */}
                                        <Calendar
                                            className="
                                            block
                                            text-stone-300
                                            transition-colors duration-150
                                            group-hover:hidden
                                            "
                                        />

                                        {/* Checked – on hover */}
                                        <CalendarArrowDown
                                            className="
                                            hidden
                                            text-sky-200
                                            transition-colors duration-150
                                            group-hover:block
                                            "
                                        />
                                        </>
                                    )}

                                    {/* COMPLETED */}
                                    {todo.showDates && (
                                        <>
                                        {/* Checked – default + hover */}
                                        <CalendarArrowDown
                                            className="
                                            block
                                            text-sky-200
                                            transition-colors duration-150
                                            group-hover:text-stone-300
                                            group-active:hidden
                                            "
                                        />

                                        {/* Square – only while pressed */}
                                        <Calendar
                                            className="
                                            hidden
                                            text-sky-400
                                            group-active:block
                                            "
                                        />
                                        </>
                                    )}

                                </div>

                            </div>
                        </div>

                        {/* TASK */}
                        <div className="border-stone-300 border-2 rounded-sm p-4 -top-3.25 w-100 text-wrap flex flex-col relative">
                            <span className="text-stone-300 pt-1">{todo.task}
                            </span>
                            <span className="text-xs ml-2 text-stone-400 text-wrap pt-1 ">
                            {todo.showDates && todo.dateCreated ? `Created on: ${formatDate(todo.dateCreated)}` : ''} {todo.showDates && todo.dateCompleted ? `| Completed on: ${formatDate(todo.dateCompleted)}` : ''}
                            </span>
                        </div>
                    </motion.li>
                    ))}
                </motion.ul>
            ) : (
                <p className="text-stone-300">No todos yet.</p>
            )}
        </div>
    );
}