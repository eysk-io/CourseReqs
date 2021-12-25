/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useEffect } from "react"
import { jsx } from "theme-ui"
import * as go from "gojs"
import "../utils/course_map/HyperlinkText"

const CourseMap: FC<{ nodes?: any }> = ({ nodes }) => {
  useEffect(() => {
    const $ = go.GraphObject.make

    const diagram = $(go.Diagram, 
      "course-map", 
      { "undoManager.isEnabled": true }, // enable Ctrl-Z to undo and Ctrl-Y to redo
      {
        layout: $(
          go.TreeLayout,
          { angle: 90, layerSpacing: 50 }
        )
      })

    diagram.nodeTemplate =
      $(go.Node, "Auto",
        { isTreeExpanded: false },
        $(go.Shape,
          { 
            figure: "RoundedRectangle",
            width: 200,
            height: 100,
            strokeWidth: 8
          },
          new go.Binding("fill", "color"),
          new go.Binding("stroke", "strokeColor")),
        $("TreeExpanderButton",
          { alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Top },
          { visible: true }),
        $("HyperlinkText",
          function(node) { return `http://localhost:3000/ubc/${node.data.subject}/${node.data.code}` },
          function(node) { return node.data.nodeName },
          { 
            margin: 5,
            font: "bold 24pt sans-serif"
          }),
      )

    diagram.nodeTemplate.contextMenu = 
      $("ContextMenu",
        $("ContextMenuButton",
          $(go.TextBlock, "Remove Course"),
          {
            click: (e, obj) => {
              let node = obj.part.adornedPart
              if (node !== null) {
                diagram.startTransaction("remove course")
                diagram.removeParts(node.findTreeParts())
                diagram.commitTransaction("remove course")
              }
            }
          }))

    diagram.model = new go.TreeModel(nodes)

    document.getElementById("zoom-to-fit").addEventListener("click", function() {
      diagram.commandHandler.zoomToFit()
    })

    document.getElementById("center-root").addEventListener("click", function() {
      diagram.scale = 1
      diagram.commandHandler.scrollToPart(diagram.findNodeForKey(1))
    })

    diagram.addDiagramListener("InitialLayoutCompleted", (e) => {
      e.diagram.findTreeRoots().each(function(r) { r.expandTree(3) })
    })
  }, [nodes])

  return (
      <div>
        <button id="zoom-to-fit">Zoom to Fit</button>
        <button id="center-root">Center on root</button>
        <div id="course-map" sx={{variant: "containers.courseMap"}}></div> 
      </div>
  ) 
}

export default CourseMap
