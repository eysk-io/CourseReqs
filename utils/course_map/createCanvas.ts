import setCanvasDimensions from "./setCanvasDimensions"

export default function createCanvas(width, height, set2dTransform = false) {
    const canvas = document.createElement('canvas')
    setCanvasDimensions(canvas, width, height, set2dTransform)
    return canvas
}
