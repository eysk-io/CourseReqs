import React from "react"
import cx from "classnames"

export default function MapNodeMedium({ level, label }) {
  return (
    <div
      xmlns="http://www.w3.org/1999/xhtml"
      className={cx(
        'map-node-medium',
        level === 1 && 'violet',
        level === 2 && 'blue',
        level >= 3 && 'green'
      )}
    >
      <div>{label}</div>
    </div>
  )
}
