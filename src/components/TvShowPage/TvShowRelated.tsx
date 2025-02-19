import { useEffect, useState } from "react";
import { fetchTvShowSimilar } from "../../services/ApiService";
import { useNavigate } from "react-router-dom";

interface TvShowHeaderProps {
    tvShowId: number;
}

interface TvShow {
    id: number;
    title: string;
    img: string;
    airdate: string;
}
export default function TvShowRelated({ tvShowId }: TvShowHeaderProps) {
    const [tvShow, setTvShow] = useState<TvShow[]>([]);
    const navigate = useNavigate()
    
    useEffect(() => {
        async function fetchTvShows() {
            const data = await fetchTvShowSimilar(tvShowId);
            setTvShow(data);
        }
        fetchTvShows();
    },[]);

    const handleRoute = (showId: number) => {
		navigate(`/show/${showId}`)
	}
    return (
        <div className="px-56 pt-10 bg-black text-white font-bold text-2xl">
            <div>
                <p>
                Similar Shows
                </p>
            </div>
            <div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-8  container mx-auto gap-y-10">
                    {tvShow.map(show => (
                        <div
                            key={show.id}
                            onClick={() => handleRoute(show.id)}
                            className="bg-gray-800 p-2 rounded-lg shadow-md text-center cursor-pointer">
                            <img src={show.img} alt={show.title} className="w-full h-auto rounded-md mb-4 shadow-2xl" />
                            <h2 className="text-sm sm:text-lg md:text-xl pb-2 font-semibold">{show.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}