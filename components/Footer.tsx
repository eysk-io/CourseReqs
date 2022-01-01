/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC } from "react"
import { jsx } from "theme-ui"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBug, faBook } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

const Footer: FC<{}> = () => {
    return (
        <section 
            sx={{ variant: "containers.footer"}} 
            className="footer"
        >
            <div className="footer-report-a-bug">
                <a target="_blank" rel="noreferrer" href="https://github.com/eyskim/CourseReqs">
                    <FontAwesomeIcon icon={faBug} style={{"marginRight": "5px"}}/>
                    Report a Bug
                </a>
            </div>
            <div className="footer-github">
                <a target="_blank" rel="noreferrer" href="https://github.com/eyskim/CourseReqs">
                    <FontAwesomeIcon icon={faGithub} style={{"marginRight": "5px"}}/>
                    GitHub
                </a>
            </div>
            <div className="footer-api">
                <a target="_blank" rel="noreferrer" href="https://course-reqs.notion.site/course-reqs/Course-Reqs-560a1df7302a4a358fb14b7196b1d52d">
                    <FontAwesomeIcon icon={faBook} style={{"marginRight": "5px"}}/>
                    API Docs
                </a>
            </div>
        </section>
    )
}

export default Footer
