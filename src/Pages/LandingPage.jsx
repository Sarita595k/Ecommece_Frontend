import NavbarComp from "../components/Navbar/NavbarComp"
import Footer from '../components/Footer/Footer'
import ProductCard from '../components/ProductCard'
import MetaData from '../components/MetaData/MetaData'

const LandingPage = () => {
    return (
        <div>
            <MetaData title={"Home"} />
            {/* adding navbar */}
            {/* <NavbarComp /> */}
            <ProductCard />
            <Footer />
        </div>
    )
}

export default LandingPage