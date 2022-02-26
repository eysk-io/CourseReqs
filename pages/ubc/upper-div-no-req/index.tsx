/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui"
import { FC } from 'react'
import styles from "../../../styles/Home.module.css"
import Footer from "../../../components/Footer"

const UpperDivNoReq: FC<{}> = () => {
    return (
        <div className={styles.container}>
            <h1>UpperDivNoPrereq</h1>
            <div style={{"maxWidth": "800px", "width": "100%", "height": "100%"}}>
                <Footer />
            </div>
        </div>
    )
}

export default UpperDivNoReq
