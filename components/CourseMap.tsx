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
      { 
        "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
        "animationManager.isEnabled": false,
        initialAutoScale: go.Diagram.Uniform,
        initialDocumentSpot: go.Spot.Left,
        initialViewportSpot: go.Spot.Left
      },
      {
        layout: $(
          go.TreeLayout,
          { 
            angle: 0, 
            layerSpacing: 50
          }
        )
      })
    
    const legend = 
      $(go.Node, "Auto",
        $(go.Shape,
          { 
            figure: "Rectangle",
            width: 280,
            height: 225,
            fill: "rgb(34, 38, 57)",
            stroke: "rgb(95, 82, 122)",
            strokeWidth: 6,
          }),
        $(go.TextBlock, 
          { 
            text: "Right click on node + click 'Remove\n\
                    Course' to remove course.\n\n\
                    Click on a course node to open its\n\
                    course reqs page.\n\n\
                    'Ctrl + Z' to Undo or 'Ctrl + Y' to Redo.\n\n\
                    Course Reqs is NOT a substitute for\n\
                    academic advising. Not all information\n\
                    is 100% correct or up-to-date.\n\
                    Should double-check all information\n\
                    on the official course calendar.",
            font: "italic bold 10pt sans-serif",
            stroke: "rgb(240, 245, 250)",
            margin: 0
          }))
    diagram.add(legend)

    diagram.nodeTemplate =
      $(go.Node, "Auto",
        { isTreeExpanded: false },
        $(go.Shape,
          new go.Binding("height", "height"),
          new go.Binding("figure", "figure"),
          new go.Binding("strokeWidth", "strokeWidth"),
          new go.Binding("fill", "color"),
          new go.Binding("stroke", "strokeColor")),
        $("TreeExpanderButton",
          {
            "_treeExpandedFigure": "TriangleRight",
            "_treeCollapsedFigure": "TriangleLeft",
            "ButtonIcon.fill": "rgb(95, 82, 122)",
            "ButtonIcon.strokeWidth": 2,
            "ButtonBorder.figure": "Circle",
            "ButtonBorder.opacity": 0.0,
            "_buttonStrokeOver": "rgb(95, 82, 122)"
          },
          { 
            alignment: go.Spot.Right,
            alignmentFocus: go.Spot.Top
          },
          { visible: true }),
        $("HyperlinkText",
          function(node) { return node.data.url },
          function(node) { return node.data.nodeName },
          { 
            margin: 5,
            textAlign: "center"
          },
          new go.Binding("font", "font"),
          new go.Binding("stroke", "strokeColor")),
        {
          toolTip:
            $("ToolTip",
              new go.Binding("visible", "visible"),
              $(go.TextBlock,
                { 
                  margin: 4,
                  font: "bold 10pt sans-serif"
                },
                new go.Binding("text", "title")))})

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
    
    diagram.linkTemplate = 
      $(go.Link,
        { routing: go.Link.Orthogonal,  // Orthogonal routing
          corner: 10 },
        $(go.Shape,
          { 
            strokeWidth: 3,
            stroke: "rgb(240, 245, 250)"
          }),
        $(go.Shape,
          { 
            fromArrow: "Backward",
            strokeWidth: 5,
            stroke: "rgb(240, 245, 250)"
          }))

    diagram.model = new go.TreeModel(nodes)

    document.getElementById("remove-instructions").addEventListener("click", function() {
      diagram.remove(legend)
    })

    document.getElementById("zoom-to-fit").addEventListener("click", function() {
      diagram.commandHandler.zoomToFit()
    })

    document.getElementById("center-root").addEventListener("click", function() {
      diagram.scale = 1
      diagram.commandHandler.scrollToPart(diagram.findNodeForKey(1))
    })

    document.getElementById("collapse-all").addEventListener("click", function() {
      diagram.nodes.each(function(n) {
        n.wasTreeExpanded = false
        n.collapseTree()
      })
      diagram.commandHandler.collapseTree(diagram.findNodeForKey(1))
      diagram.commandHandler.zoomToFit()
    })
    
    document.getElementById("expand-all").addEventListener("click", function() {
      diagram.nodes.each(function(n) { n.wasTreeExpanded = true })
      diagram.findTreeRoots().each(function(n) { n.expandTree() })
      diagram.commandHandler.zoomToFit()
    })

    diagram.addDiagramListener("InitialLayoutCompleted", (e) => {
      e.diagram.findTreeRoots().each(function(r) { r.expandTree(3) })
    })
  }, [nodes])

  return (
      <div>
        <button id="remove-instructions">Remove Instructions</button>
        <button id="zoom-to-fit">Zoom to Fit</button>
        <button id="center-root">Center on Root</button>
        <button id="collapse-all">Collapse All</button>
        <button id="expand-all">Expand All</button>
        <div id="course-map" sx={{ variant: "containers.courseMap" }}></div> 
      </div>
  ) 
}

export default CourseMap
