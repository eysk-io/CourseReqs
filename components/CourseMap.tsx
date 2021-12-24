/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useEffect } from "react"
import { jsx } from 'theme-ui'
import * as go from "gojs"

const CourseMap: FC<{
    nodes?: any
    links?: any
}> = ({
    nodes, 
    links, 
}) => {
    useEffect(() => {
        const $ = go.GraphObject.make;
        const diagram = $(go.Diagram, "course-map", {
          layout: $(
            go.TreeLayout,
            { angle: 90, layerSpacing: 100 }
          )
        })
        diagram.nodeTemplate =
        $(go.Node, "Auto",
          $(go.Shape,
            { 
              figure: "RoundedRectangle",
              width: 100,
              height: 100
            },
            new go.Binding("fill", "color")),
          $(go.TextBlock,
            { margin: 5 },
            new go.Binding("text", "name"))
        );
      
      var nodeDataArray = [
        { name: "a", key: "0", color: "lightblue" },
        { name: "b", key: "1", parent: "0", color: "yellow" },  // note the "parent" property
        { name: "c", key: "2", parent: "0", color: "orange" },
        { name: "d", key: "3", parent: "0", color: "lightgreen" }
      ];
      diagram.model = new go.TreeModel(nodeDataArray);
    }, [])

    return (
        <div id="course-map" sx={{variant: "containers.courseMap"}}>
        </div>
    ) 
}

export default CourseMap
