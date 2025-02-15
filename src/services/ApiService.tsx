interface TvShow {
    id: number;
    title: string;
    img: string;
    airdate: string;
}

interface Image {
    file_path: string;
}
export async function fetchTvShows(page:number): Promise<TvShow[]> {
    try {
        const url = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmU1ZWIxYzViMzUxYzY3YTgyYzAxNzkxY2I5ZjhhMSIsIm5iZiI6MTcwOTM5NTY0OC41ODksInN1YiI6IjY1ZTM0ZWMwOTk3OWQyMDE3Y2IwNmI5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F5mm5q_Bv0I3mWtj2S4Kd23iFHcXeEugmVbSxzCIRi4'
            }
        };

        const response = await fetch(url, options);
        const data = await response.json();

      
        return data.results.map((tv: any) => ({
            id: tv.id,
            title: tv.name,
            img: `https://image.tmdb.org/t/p/w500${tv.poster_path}`, 
            airdate: tv.first_air_date
        }));
    } catch (error) {
        console.error("Error fetching TV shows from API:", error);
        return [];
    }
}



export async function fetchTvShowImages(tvShowId: number): Promise<Image[]> {
    try {
        const url = `https://api.themoviedb.org/3/tv/${tvShowId}/images`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmU1ZWIxYzViMzUxYzY3YTgyYzAxNzkxY2I5ZjhhMSIsIm5iZiI6MTcwOTM5NTY0OC41ODksInN1YiI6IjY1ZTM0ZWMwOTk3OWQyMDE3Y2IwNmI5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F5mm5q_Bv0I3mWtj2S4Kd23iFHcXeEugmVbSxzCIRi4'
            }
        };

        const response = await fetch(url, options);
        const data = await response.json();
        console.log(tvShowId)

        return data.posters.map((image: any) => ({
            file_path: image.file_path,
           
        }));
    } catch (error) {
        console.error("Error fetching TV show images from API:", error);
        return [];
    }
}
