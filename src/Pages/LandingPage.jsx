import NavbarComp from "../components/Navbar/NavbarComp"
import Footer from '../components/Footer/Footer'
import ProductCard from '../components/ProductCard'
import MetaData from '../components/MetaData/MetaData'
import HeroCarousel from "../components/Header/HeroCarousel"

const LandingPage = () => {
    return (
        <div>
            <MetaData title={"Home"} />
            {/* adding navbar */}
            {/* <NavbarComp /> */}
            <HeroCarousel />
            <ProductCard />
            <Footer />
        </div>
    )
}

export default LandingPage