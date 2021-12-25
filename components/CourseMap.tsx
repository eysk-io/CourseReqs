/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useEffect } from "react"
import { jsx } from 'theme-ui'
import * as go from "gojs"

const CourseMap: FC<{ nodes?: any }> = ({ nodes }) => {
  useEffect(() => {
    const $ = go.GraphObject.make
    const diagram = $(go.Diagram, "course-map", {
      layout: $(
        go.TreeLayout,
        { 
          angle: 90, 
          layerSpacing: 50
        }
      )
    })
    diagram.nodeTemplate =
      $(go.Node, "Auto",
        $(go.Shape,
          { 
            figure: "RoundedRectangle",
            width: 200,
            height: 100,
            strokeWidth: 8
          },
          new go.Binding("fill", "color"),
          new go.Binding("stroke", "strokeColor")),
        $(go.TextBlock,
          { 
            margin: 5,
            font: "bold 14pt sans-serif"
          },
          new go.Binding("text", "key"))
      )
    diagram.model = new go.TreeModel(nodes)

    diagram.addDiagramListener("InitialLayoutCompleted", () => {
      let data = nodes.filter(node => node.key === "1")[0]
      let node = diagram.findNodeForData(data)
      diagram.centerRect(node.actualBounds)
      diagram.select(node)
    })
  }, [nodes])

  return (
      <div id="course-map" sx={{variant: "containers.courseMap"}}>
      </div>
  ) 
}

export default CourseMap
