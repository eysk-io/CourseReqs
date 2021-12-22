export default function setCanvasDimensions(
    canvas,
    width,
    height,
    set2dTransform = false
) {
    const ratio = Math.ceil(window.devicePixelRatio)
    canvas.width = width * ratio
    canvas.height = height * ratio
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    if (set2dTransform) {
        canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0)
    }
}
