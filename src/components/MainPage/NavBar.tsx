import React from 'react'
import { FaMoon, FaSearch } from 'react-icons/fa'

export default function NavBar() {
	const [darkMode, setDarkMode] = React.useState(true)

	const darkModeHandler = () => {
		setDarkMode(!darkMode)
		document.body.classList.toggle('dark')
	}
	return (
		<div className=" bg-[#202020] dark:text-white text-black  h-[60px] flex items-center border-b border-gray-600">
			<div className="flex flex-row justify-between container mx-auto">
				<div className="font-bold text-2xl">
					<h2 className="text-3xl uppercase">Series Graph</h2>
				</div>
				<div className="flex items-center gap-x-6">
					<div>
						<label
							htmlFor="searchInput"
							className="bg-gray-600 rounded-full flex items-center px-4 py-1 focus-within:ring-2 focus-within:ring-gray-200">
							<FaSearch className="mr-2 text-gray-200" />
							<input
								id="searchInput"
								type="text"
								placeholder="Search..."
								className="bg-transparent text-gray-200 focus:outline-none w-full"
							/>
						</label>
					</div>
					<div>
						<button onClick={() => darkModeHandler()}>
							<FaMoon />
						</button>
					</div>
					<div>
						<select className="w-full bg-transparent border-0 border-gray-300 text-gray-200  p  rounded leading-tight focus:outline-none  focus:bg-[#383838] duration-300 text-sm font-semibold">
							<option>PL</option>
							<option>US</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	)
}
