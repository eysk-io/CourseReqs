/** @jsxRuntime classic */
/** @jsx jsx */
import { FC } from "react"
import { jsx } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faBug, faBook } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import Link from 'next/link'

const Footer: FC<{}> = () => {
    const faBugIcon = faBug as IconProp
    const faBookIcon = faBook as IconProp
    const faGithubIcon = faGithub as IconProp

    return (
        <section 
            sx={{ variant: "containers.footer"}} 
            className="footer"
        >
            <div className="footer-report-a-bug">
                <Link href="/report-a-bug" passHref> 
                    <a>
                        <FontAwesomeIcon icon={faBugIcon} style={{"marginRight": "5px"}}/>
                        Report a Bug
                    </a>
                </Link>
            </div>
            <div className="footer-github">
                <a target="_blank" rel="noreferrer" href="https://github.com/eyskim/CourseReqs">
                    <FontAwesomeIcon icon={faGithubIcon} style={{"marginRight": "5px"}}/>
                    GitHub
                </a>
            </div>
            <div className="footer-api">
                <a target="_blank" rel="noreferrer" href="https://course-reqs.notion.site/course-reqs/Course-Reqs-560a1df7302a4a358fb14b7196b1d52d">
                    <FontAwesomeIcon icon={faBookIcon} style={{"marginRight": "5px"}}/>
                    API Docs
                </a>
            </div>
        </section>
    )
}

export default Footer
