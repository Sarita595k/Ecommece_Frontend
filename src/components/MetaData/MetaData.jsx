import { Helmet } from "react-helmet"

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{title} | Avsar Ecommerce</title>
        </Helmet>
    )
}

export default MetaData