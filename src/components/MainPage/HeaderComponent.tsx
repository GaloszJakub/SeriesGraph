// HeaderComponent.tsx
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

interface HeaderComponentProps {
	onSearch: (query: string) => void
}

export default function HeaderComponent({ onSearch }: HeaderComponentProps) {
	const [searchTerm, setSearchTerm] = useState('')

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSearch(searchTerm)
		}
	}

	const handleSearchClick = () => {
		onSearch(searchTerm)
	}

	return (
		<div className="flex flex-col bg-[#202020] text-white items-center gap-y-8 sm:p-20 p-6 md:p-8">
			<div className="flex flex-col items-center gap-y-8 text-center">
				<h2 className="font-bold sm:text-3xl md:text-5xl text-2xl">Explore episodes through rating graphs</h2>
				<p className="text-wrap xl:max-w-1/2 mt-3 lg:w-3/5 text-md md:text-xl sm:text-2xl font-thin md:leading-5">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit blanditiis eaque id facilis fugiat possimus
					adipisci ut ducimus repudiandae, minima pariatur aperiam eligendi tempore sequi.
				</p>
				<label
					htmlFor="searchInput"
					className="bg-gray-600 rounded-full w-full md:w-3/5 lg:w-1/2 flex items-center px-4 py-2 focus-within:ring-2 focus-within:ring-gray-200">
					<FaSearch onClick={handleSearchClick} className="mr-2 text-gray-200 cursor-pointer" />
					<input
						id="searchInput"
						type="text"
						placeholder="Search..."
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						onKeyDown={handleKeyDown}
						className="bg-transparent text-gray-200 focus:outline-none w-full"
					/>
				</label>
			</div>
		</div>
	)
}
