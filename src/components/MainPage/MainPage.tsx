import FooterComponent from "./FooterComponent"
import HeaderComponent from "./HeaderComponent"
import NavBar from "./NavBar"
import SeriesList from "./SeriesListComponent"

export default function MainPage(){
    return(
        <div> 
            <NavBar />
            <HeaderComponent />
            <SeriesList />
            <FooterComponent />
        </div>
    )
}