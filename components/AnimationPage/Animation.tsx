import { useEffect } from "react"
import lottie from "lottie-web"
import animations from "./animations/index";

const Animation = () => {
    useEffect(() => {
        lottie.loadAnimation({
            container: document.getElementById("animation"),
            animationData: generateRandomAnimation()
        })
    }, [])

    const generateRandomAnimation = () => {
        const index = Math.floor(Math.random() * animations.length) ;
        return animations[index]
    }

    return (
        <div 
            style={{ "maxWidth": "748px", "margin": "auto" }}
            className="animation" 
            id="animation"
        ></div>
    )
}

export default Animation
