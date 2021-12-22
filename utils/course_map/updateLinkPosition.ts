import * as THREE from "three"

const z = -1

/* This is code copied from the three-forcegraph library. We need to overwrite
 * the code that sets the link objects' positions, just to set the Z coordinate
 * otherwise the lines overlap the nodes */
export default function updateLinkPosition(line, { start, end }) {
    const vStart = new THREE.Vector3(start.x, start.y || 0, z)
    const vEnd = new THREE.Vector3(end.x, end.y || 0, z)
    const distance = vStart.distanceTo(vEnd)

    line.position.x = vStart.x
    line.position.y = vStart.y
    line.position.z = vStart.z

    line.scale.z = distance

    line.parent.localToWorld(vEnd) // lookAt requires world coords
    line.lookAt(vEnd)

    return true
}
