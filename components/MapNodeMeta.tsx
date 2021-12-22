import React from "react"
import cx from "classnames"

export default function MapNodeMeta({ level, label }) {
  return (
    <div
      xmlns="http://www.w3.org/1999/xhtml"
      className={cx('map-node-meta', 'grey')}
    >
      <div>{label}</div>
    </div>
  )
}
