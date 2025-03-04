import { useEffect, useState } from 'react'
import { fetchTvShows } from '../../services/ApiService'
import { useNavigate } from 'react-router-dom'
import * as Tabs from '@radix-ui/react-tabs'

interface tvShow {
	id: number
	title: string
	img: string
	airdate: string
}
export default function SeriesList() {
	const [tvShow, setTvShow] = useState<tvShow[]>([])
	const [page, setPage] = useState(1)
	const [category, setCategory] = useState('top_rated')
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			const tvData = await fetchTvShows(category,page)
			if (tvShow.length == 0) {
				setTvShow(tvData)
			} else {
				setTvShow(prevShows => [...prevShows, ...tvData])
			}
		}

		fetchData()
	}, [page,category])

	const handleLoadPage = () => {
		setPage(prevPage => prevPage + 1)
	}

	const handleRoute = (showId: number) => {
		navigate(`/show/${showId}`)
	}

	const handleChange = (category: string) => {
		setCategory(category)
		setTvShow([])
		setPage(1)
		}
	return (

		<div className="bg-black text-white text-4xl font-bold flex flex-col justify-center ">
			<div className=" border-b-[1px]  w-full border-gray-600 container text-sm  sm:text-md mx-auto">
				<Tabs.Root defaultValue="tv" className="w-full max-w-md mx-auto ">
					<Tabs.List className="flex justify-center mb-[-1px]">
						<Tabs.Trigger
							onClick={() => handleChange('top_rated')}
							value="tv"
							className="flex px-8 py-2 text-center font-medium text-gray-200 hover:text-blue-500 data-[state=active]:border-b-[1px] data-[state=active]:border-blue-500 data-[state=active]:text-blue-500">
							
							Top Rated
						</Tabs.Trigger>
						<Tabs.Trigger
							onClick={() => handleChange('popular')}
							value="series"
							className="flex px-8 py-2 text-center font-medium text-gray-200 hover:text-blue-500 data-[state=active]:border-b-[1px] data-[state=active]:border-blue-500 data-[state=active]:text-blue-500">
							Popular
						</Tabs.Trigger>
					</Tabs.List>
				</Tabs.Root>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:p-8 p-6 container mx-auto gap-y-10">
				{tvShow.map(show => (
					<div
						key={show.id}
						onClick={() => handleRoute(show.id)}
						className="bg-gray-800 p-2 rounded-lg shadow-md text-center cursor-pointer">
						<img src={show.img} alt={show.title} className="w-full h-auto rounded-md mb-4 shadow-2xl" />
						<h2 className="text-sm sm:text-lg md:text-xl font-semibold">{show.title}</h2>
					</div>
				))}
			</div>
			<div className="flex justify-center items-center p-4">
				<button
					className="bg-violet-950 hover:bg-violet-600 cursor-pointer text-gray-300 hover:text-white font-bold py-2 px-4 rounded duration-300"
					onClick={handleLoadPage}>
					Load More
				</button>
				
			</div>
		</div>
	)
}
