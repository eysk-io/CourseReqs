import React from "react"
import initializeScene from "./initializeScene"
import renderToSprite from "./renderToSprite"
import MapNode from "../../components/MapNode"
import MapNodeLevel0 from "../../components/MapNodeLevel0"
import MapNodeMeta from "../../components/MapNodeMeta"
import MapNodeSmall from "../../components/MapNodeSmall"
import MapNodeMedium from "../../components/MapNodeMedium"
import * as THREE from "three"
import updateLinkPosition from "./updateLinkPosition"
import linkColors from "./linkColors"

export default async function renderMap(div, data) {
    const { scene, renderer, camera, controls } = initializeScene(div)
    data.nodes = await Promise.all(
        data.nodes.map((node) => {
            if (node.level === 0) {
                return renderToSprite(<MapNodeLevel0 label={`${node.subject} ${node.code}`} level = { node.level } />, {
                    width: 200,
                    height: 200
                }).then((sprite) => {
                    sprite.renderOrder = 999
                    sprite.onBeforeRender = (renderer) => renderer.clearDepth()
                    return { ...node, sprite }
                })
            } else if (node.meta) {
                return renderToSprite(<MapNodeMeta label={`${node.subject} ${node.code}`} level = { node.level } />, {
                    width: 100,
                    height: 100
                }).then((sprite) => {
                    sprite.renderOrder = 999
                    sprite.onBeforeRender = (renderer) => renderer.clearDepth()
                    return { ...node, sprite }
                })
            } else if ((node.code.toString().length + node.subject.toString().length) < 10) {
                return renderToSprite(<MapNodeSmall label={`${node.subject} ${node.code}`} level = { node.level } />, {
                    width: 150,
                    height: 100
                }).then((sprite) => {
                    sprite.renderOrder = 999
                    sprite.onBeforeRender = (renderer) => renderer.clearDepth()
                    return { ...node, sprite }
                })
            } else if ((node.code.toString().length + node.subject.toString().length) < 25) {
                return renderToSprite(<MapNodeMedium label={`${node.subject} ${node.code}`} level = { node.level } />, {
                    width: 250,
                    height: 125
                }).then((sprite) => {
                    sprite.renderOrder = 999
                    sprite.onBeforeRender = (renderer) => renderer.clearDepth()
                    return { ...node, sprite }
                })
            } else {
                return renderToSprite(<MapNode label={`${node.subject} ${node.code}`} level = { node.level } />, {
                    width: 250,
                    height: 125
                }).then((sprite) => {
                    sprite.renderOrder = 999
                    sprite.onBeforeRender = (renderer) => renderer.clearDepth()
                    return { ...node, sprite }
                })
            }
        })
    )
    const ThreeForceGraph = (await import('three-forcegraph')).default
    const graph = new ThreeForceGraph().graphData(data)
    graph.nodeThreeObject(({ sprite }) => sprite)
    graph.linkMaterial(
        ({ level, meta }) =>  {
            if (meta) {
                return new THREE.MeshBasicMaterial({ color: linkColors[4] })
            } else {
                return new THREE.MeshBasicMaterial({ color: linkColors[level-1] })
            }
        }
    )
    graph.linkPositionUpdate(updateLinkPosition)
    graph.numDimensions(3)
    graph.linkWidth(1)
    graph.linkDirectionalArrowLength(15)
    graph.linkDirectionalArrowRelPos(0.8)
    graph.d3Force("link").distance(25)
    graph.scale.set(0.004, 0.004, 0.004)
    scene.add(graph)
    camera.lookAt(graph.position);

    (function animate() {
        graph.tickFrame()
        controls.update()
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
    })()
}

