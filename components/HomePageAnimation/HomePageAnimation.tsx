import Lottie from "lottie-react-with-react-17"
import animations from "./animations/index";

const HomePageAnimation = () => {
    const generateRandomAnimation = () => {
        const index = Math.floor(Math.random() * animations.length) ;
        return animations[index]
    }

    return <Lottie style={{"maxWidth": "748px"}}className="home-page-animation" animationData={generateRandomAnimation()} />
}

export default HomePageAnimation
