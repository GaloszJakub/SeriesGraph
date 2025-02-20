// MainPage.tsx
import { useState } from 'react'
import HeaderComponent from './HeaderComponent'
import SeriesListComponent from './SeriesListComponent'
import SearchList from './SearchList'
import Navbar from './NavBar'

export default function MainPage() {
	const [searchQuery, setSearchQuery] = useState('')

	const handleSearch = (query: string) => {
		setSearchQuery(query)
	}

	return (
		<div className="min-h-screen bg-[#121212]">
			<Navbar />
			<HeaderComponent onSearch={handleSearch} />
			{searchQuery.trim() ? <SearchList query={searchQuery} /> : <SeriesListComponent />}
		</div>
	)
}
