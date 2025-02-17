import React, { useEffect, useState } from "react";
import { fetchTvDeails } from "../../services/ApiService";
import TvShowGraph from "./TvShowGraph";

interface TvShowHeaderProps {
  tvShowId: number;
}

interface Details {
  name: string;
  img: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  last_air_date: string;
}

export default function TvShowHeader({ tvShowId }: TvShowHeaderProps) {
  const [details, setDetails] = useState<Details | null>(null);

  useEffect(() => {
    async function loadDetails() {
      try {
        const data = await fetchTvDeails(tvShowId);
        setDetails(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }
    loadDetails();
  }, [tvShowId]);

  // Użycie instrukcji if do warunkowego renderowania
  if (!details || !details.name) {
    return <p className="text-white text-center">Brak obrazów</p>;
  }

  return (
    <div className="h-[36rem] overflow-hidden bg-black flex flex-row">
      
      <div className="flex flex-col items-center justify-center h-full w-1/3">
        <img
        src={`https://image.tmdb.org/t/p/original${details.img}`}
        alt="TV Show"
        className="w-52 h-72 rounded-2xl bg-black object-cover"
      />

        <div className="text-white text-xl text-center font-semibold mt-4">
          <h2 className=" font-bold ">
            {details.name}
          </h2>
          <h3 className="">
            {details.vote_average} ({details.vote_count} głosów)
          </h3>
          <p className="text-sm font-normal">
            {details.first_air_date} - {details.last_air_date}
          </p>
        </div>
      </div>
      <TvShowGraph tvShowId={tvShowId} />
    </div>
  );
}
