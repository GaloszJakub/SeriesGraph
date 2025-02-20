// SearchList.tsx
import { useState, useEffect } from 'react'
import { TvShow, searchTvShows } from '../../services/ApiService'
import { useNavigate } from 'react-router-dom'

interface SearchListProps {
	query: string
}

export default function SearchList({ query }: SearchListProps) {
	const [results, setResults] = useState<TvShow[]>([])
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		setLoading(true)
		searchTvShows(query)
			.then(data => {
				setResults(data)
				setLoading(false)
			})
			.catch(error => {
				console.error('Error in search:', error)
				setLoading(false)
			})
	}, [query])

	const handleRoute = (id: number) => {
		navigate(`/show/${id}`)
	}

	if (loading) return <div className="text-white p-4 container mx-auto">Loading...</div>
	if (results.length === 0) return <div className="text-white p-4 container mx-auto">No results found.</div>

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:p-8 p-6 container mx-auto gap-y-10">
			{results.map(tv => (
				<div
					key={tv.id}
					onClick={() => handleRoute(tv.id)}
					className="bg-gray-800 p-2 rounded-lg shadow-md text-center cursor-pointer">
					<img src={tv.img} alt={tv.title} className="w-full h-auto rounded-md mb-4 shadow-2xl" />
					<h2 className="text-sm sm:text-lg md:text-xl font-semibold">{tv.title}</h2>
				</div>
			))}
		</div>
	)
}
