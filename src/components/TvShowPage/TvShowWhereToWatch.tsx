import { useEffect, useState } from "react";
import { fetchTvProviders } from "../../services/ApiService";


interface TvShowHeaderProps {
    tvShowId: number;
  }

interface WhereToWatch {
    provider_id: number;    
    provider_name: string;
    provider_logo: string;
    provider_link: string;
}

export default function TvShowWhereToWatch({tvShowId}: TvShowHeaderProps) {
    const [whereToWatch, setWhereToWatch] = useState<WhereToWatch[]>([]);
    useEffect(() => {
        async function fetchWhereToWatch() {
            const data = await fetchTvProviders(tvShowId);
            setWhereToWatch(data);
        }
        fetchWhereToWatch();
        
    },[]);
  
    return (
        <div className="flex flex-col pl-56 pt-10 bg-black">
            <div>
                <p className="font-bold text-2xl text-white">
                    Where to Watch
                </p>
            </div>
            <div className="flex flex-row gap-8 pt-8">
                {whereToWatch.map((provider) => (
                    <div key={provider.provider_id} className="flex">
                        <a href={provider.provider_link} target="_blank" rel="noreferrer">
                        <img src={provider.provider_logo} alt={provider.provider_name} className="w-16 h-16" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}
