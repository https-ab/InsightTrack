import React from "react";
import clear_dark from "../assets/clear_dark.png";
import clear_light from "../assets/clear_light.png";
import check from "../assets/check.png";
import { useTheme } from "../context/ThemeContext";

export default function HelpBox({onClose}) {
    const { darkMode } = useTheme();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                 onClick={onClose}/>

            <div className="relative z-10
                            w-[90%] max-w-md
                            rounded-xl
                            bg-white/90 dark:bg-[#364e59]/90
                            backdrop-blur-2px
                            p-6
                            text-gray-800 dark:text-white
                            shadow-xl">

                <img src={darkMode ? clear_dark : clear_light}
 alt="close"
                     className="absolute top-3 right-3 w-5 h-5 sm:w-6 sm:h-6 cursor-pointer opacity-70 hover:opacity-100"
                     onClick={onClose} />

                <h2 className="text-xl font-bold mb-3 text-[#2F434D] dark:text-[#F8FAFC]">What is InsightTrack ?</h2>

                <p className="text-sm leading-relaxed opacity-90 text-[#4B5563] dark:text-[#CBD5E1]">InsightTrack helps you track expenses and habits in one place. 
                            You can search, analyze, and monitor your daily activities with a clean, distraction-free interface.</p>
                
                <ul className="mt-4 space-y-2 text-sm">
                    {
                        [
                            "Track daily expenses",
                            "Monitor habits",
                            "Search and filter data",
                            "Light & dark mode support",
                            "Fully responsive design"
                        ] .map((text, index) => (
                            <li key={index} className="flex items-start gap-2 text-[#4B5563] dark:text-[#CBD5E1]">
                                <img src={check} alt="checks" className="w-4 h-4 mt-0.5" />

                                <span>{text}</span>
                            </li>
                        ))
                    } 
                </ul>
            </div>

        </div>
    )
}