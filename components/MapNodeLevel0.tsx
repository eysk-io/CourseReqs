import React from "react"
import cx from "classnames"

export default function MapNodeLevel0({ label }) {
  return (
    <div
      xmlns="http://www.w3.org/1999/xhtml"
      className={cx('map-node-level0', 'magenta')}
    >
      <div>{label}</div>
    </div>
  )
}
