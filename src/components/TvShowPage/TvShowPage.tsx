import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../MainPage/NavBar";
import TvShowHeader from "./TvShowHeader";

export default function TvShowPage() {
    const { id } = useParams<{ id: string }>();
    const tvShowId = Number(id);

    return (
        <div className="w-full">
            <NavBar />
            <TvShowHeader tvShowId={tvShowId} />
        </div>
    );
}
