import React from 'react';
import { SlNote } from "react-icons/sl";
import { motion } from "framer-motion";

const Name = () => {
    return (
        <div>
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1 }}
            >
                <div className="my-4 mb-8">
                    <div className="flex flex-wrap content-center justify-evenly">
                        <div className="relative inline-flex group">
                            <div
                                className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
                            </div>
                            <motion.h3
                                className="relative inline-flex items-center justify-center px-6 py-1.5 text-lg font-bold text-white transition-all duration-200 rounded-3xl bg-gradient-to-bl from-yellow-400 to-orange-400 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                role="button"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                Ants GPT
                            </motion.h3>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className='flex items-center justify-between mt-10 my-6'>
                <motion.div 
                    className='lg:w-[50px] lg:h-[50px] h-10 w-10 rounded-full overflow-hidden' 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                    <img 
                        src="https://t3.ftcdn.net/jpg/08/19/48/62/360_F_819486282_aqzzc9LnCeUSTb4gpr9txtrIWRmZRwVJ.jpg" 
                        alt="logo" 
                        className='w-full h-full object-cover' 
                    />
                </motion.div>
                <SlNote className='text-yellow-400 lg:text-4xl text-2xl animate-pulse bg-gradient-to-tl from-pink-500 to-amber-500 p-1' />
            </div>
        </div>
    );
};

export default Name;
