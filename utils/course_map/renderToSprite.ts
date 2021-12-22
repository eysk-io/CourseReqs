import * as THREE from "three"
import renderToCanvas from "./renderToCanvas"

export default async function renderToSprite(content, { width, height }) {
    const canvas = await renderToCanvas(content, {
        width,
        height
    })
    const map = new THREE.CanvasTexture(canvas)
    const material = new THREE.SpriteMaterial({ map })
    const sprite = new THREE.Sprite(material)
    sprite.scale.set(width / 6, height / 6)
    return sprite
}
