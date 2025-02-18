import { useEffect, useState } from "react";
import { fetchSeasonDetails } from "../../services/ApiService";

interface TvShowHeaderProps {
  tvShowId: number;
  number_of_seasons: number;
}

interface Details {
  name: string;
  vote_average: number;
  vote_count: number;
  episode_number: number;
}

export default function TvShowGraph({ tvShowId, number_of_seasons }: TvShowHeaderProps) {
  // Tablica, w której dla każdego sezonu zapiszemy dane (każdy element to tablica danych dla danego sezonu)
  const [allSeasonsDetails, setAllSeasonsDetails] = useState<Details[][]>([]);

  useEffect(() => {
    async function loadAllSeasons() {
      const seasons: Details[][] = [];
      // Pętla po sezonach (od 1 do number_of_seasons)
      for (let season = 1; season <= number_of_seasons; season++) {
        try {
          const data = await fetchSeasonDetails(tvShowId, season);
          seasons.push(data);
        } catch (error) {
          console.error(`Error fetching details of season ${season}:`, error);
          seasons.push([]); // w razie błędu wrzuć pustą tablicę
        }
      }
      setAllSeasonsDetails(seasons);
    }
    loadAllSeasons();
  }, [tvShowId, number_of_seasons]);

  return (
    <div className="flex flex-col items-start h-full w-2/3 pt-20">
      {/* Sekcja z legendą */}
      <div className="text-white flex flex-row gap-x-4 items-end justify-center h-1/5">
        <div className="bg-green-950 w-4 h-4 rounded-full" />
        <p>to je dobre</p>

        <div className="bg-green-500 w-4 h-4 rounded-full" />
        <p>git</p>

        <div className="bg-yellow-300 w-4 h-4 rounded-full" />
        <p>srednie</p>

        <div className="bg-orange-400 w-4 h-4 rounded-full" />
        <p>ponizen sredniej</p>

        <div className="bg-red-500 w-4 h-4 rounded-full" />
        <p>złe</p>

        <div className="bg-violet-700 w-4 h-4 rounded-full" />
        <p>ciulowe</p>
      </div>

      {/* Wyświetlenie numerów sezonów */}
      {/* <div className="flex flex-row py-8 justify-center items-center text-white">
        {Array.from({ length: number_of_seasons }).map((_, i) => (
          <div key={i} className="w-8 h-4">
            <p>{i + 1}</p>
          </div>
        ))}
      </div> */}

      {/* Wyświetlenie danych dla każdego sezonu */}
      <div className="flex flex-row pt-12 justify-center flex-wrap  pr-8">
        {allSeasonsDetails.map((seasonDetails, seasonIndex) => (
          <div key={seasonIndex} className="text-white flex flex-col justify-start items-center mx-2 p-2">
            {/* Numer sezonu */}
            <p className="font-bold mb-4    ">Sezon {seasonIndex + 1}</p>
            {/* Jeśli są dane, wypisujemy każdy element */}
            {seasonDetails.length > 0 ? (
              seasonDetails.map((detail, i) => (
                <div key={i} className="flex flex-col justify-center items-center ">
                    <div
                    className={`w-20 text-center my-[0.4rem] rounded-2xl text-black 
                         ${
                        detail.vote_average > 9
                        ? 'bg-green-950 text-white'       // ciemny zielony, gdy vote_average > 9
                        : detail.vote_average > 8
                        ? 'bg-green-500'
                        : detail.vote_average > 6   
                        ? 'bg-yellow-300'      
                        : detail.vote_average > 4
                        ? 'bg-orange-400'
                        : detail.vote_average > 2
                        ? 'bg-red-500'
                        : 'bg-violet-700'
                    }`}
                    >
                        <p className="p-2">S{seasonIndex + 1}E{detail.episode_number}</p>
                        <p className="my-[0.4rem] font-bold">{detail.vote_average.toFixed(1)}</p>
                    </div>
                </div>
              ))
            ) : (
              <p className="text-white text-center font-bold">Zapowiedziany</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
