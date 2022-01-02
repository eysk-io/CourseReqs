/** @jsxRuntime classic */
/** @jsx jsx */
import { FC } from "react"
import { jsx } from "theme-ui"
import Animation from "./AnimationPage/Animation"

const LoadingPage: FC<{}> = () => {
    return( 
        <div sx={{ variant: "containers.loadingPage" }} className="loading-page">
            <h1>Your page is loading...</h1>
            <Animation />
        </div>
    )
}

export default LoadingPage
