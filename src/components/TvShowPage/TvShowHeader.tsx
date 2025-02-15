import React, { useEffect, useState } from "react";
import { fetchTvShowImages } from "../../services/ApiService";

interface TvShowHeaderProps {
    tvShowId: number;
}

interface Image {
    file_path: string;
}

export default function TvShowHeader({ tvShowId }: TvShowHeaderProps) {
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        async function loadImages() {
            try {
                const data = await fetchTvShowImages(tvShowId);
                setImages(data);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        }
        loadImages();
    }, [tvShowId]);

    return (
        <div className="relative h-[36rem] overflow-hidden ">
    {images.length > 0 ? (
    <>
      <img
        src={`https://image.tmdb.org/t/p/original${images[0].file_path}`}
        alt="TV Show"
        className="w-full h-full bg-black object-contain"
      />
    
      <div
        className="absolute inset-0 pointer-events-none "
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0, 0, 0, 0.8))',
        }}
      />
    </>
  ) : (
    <p className="text-white text-center">Brak obrazów</p>
  )}
</div>

    );
}
