import React from "react";
import { FaMoon } from "react-icons/fa";


export default function NavBar(){
    const [darkMode, setDarkMode] = React.useState(true)

    const darkModeHandler = () =>{
        setDarkMode(!darkMode)
        document.body.classList.toggle("dark")
    }
    return(
        <div className="flex flex-row bg-black dark:text-white text-black justify-between p-8">
            <div className="font-bold text-2xl">
                <h2>Series Graph</h2>
            </div>
            <div>
                <div>
                    <p>szukanie</p>
                </div>
                <div>
                    <button onClick={() => darkModeHandler()}>
                        <FaMoon />        
                    </button>
                </div>
                <div>
                    <p>zminan języka</p>
                </div>
            </div>
        </div>
    )
}