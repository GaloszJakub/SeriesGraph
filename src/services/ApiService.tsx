interface TvShow {
    id: number;
    title: string;
    img: string;
    airdate: string;
}

interface Details {
    name: string;
    img: string;
    vote_average: number;
    vote_count: number;
    first_air_date: string;
    last_air_date: string;
    number_of_seasons: number;
}

interface SeasonDetails {
    name: string;
    vote_average: number;
    vote_count: number;
    episode_number: number;
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



export async function fetchTvDeails(tvShowId: number): Promise<Details> {
    try {
        const url = `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`;
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

        return {
            name: data.name,
            img: data.backdrop_path,
            vote_average: data.vote_average,
            vote_count: data.vote_count,
            first_air_date: data.first_air_date,
            last_air_date: data.last_air_date,
            number_of_seasons: data.number_of_seasons
          };
    } catch (error) {
        console.error("Error fetching TV show images from API:", error);
        return {
            name: '',
            img: '',
            vote_average: 0,
            vote_count: 0,
            first_air_date: '',
            last_air_date: '',
            number_of_seasons: 0
        };
    }
}

export async function fetchSeasonDetails(tvShowId: number, season:number): Promise<SeasonDetails[]> {
    try{
        const url = `https://api.themoviedb.org/3/tv/${tvShowId}/season/${season}?language=en-US`;
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmU1ZWIxYzViMzUxYzY3YTgyYzAxNzkxY2I5ZjhhMSIsIm5iZiI6MTcwOTM5NTY0OC41ODksInN1YiI6IjY1ZTM0ZWMwOTk3OWQyMDE3Y2IwNmI5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F5mm5q_Bv0I3mWtj2S4Kd23iFHcXeEugmVbSxzCIRi4'
        }};
        const response = await fetch(url, options);
        const data = await response.json();
        return data.episodes.map((season: any) => ({
            name: season.name,
            vote_average: season.vote_average,
            vote_count: season.vote_count,
            episode_number: season.episode_number
        }));
    }
    catch(error){
        console.error("Error fetching season details from API:", error);
        return [];
    }
}
