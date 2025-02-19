import { useParams } from "react-router-dom";
import NavBar from "../MainPage/NavBar";
import TvShowHeader from "./TvShowHeader";
import FooterComponent from "../MainPage/FooterComponent";
import TvShowWhereToWatch from "./TvShowWhereToWatch";
import TvShowRelated from "./TvShowRelated";

export default function TvShowPage() {
    const { id } = useParams<{ id: string }>();
    const tvShowId = Number(id);

    return (
        <div className="w-full">
            <NavBar />
            <TvShowHeader tvShowId={tvShowId} />
            <TvShowWhereToWatch tvShowId={tvShowId}/>
            <TvShowRelated tvShowId={tvShowId}/>
            <FooterComponent />
        </div>
    );
}
