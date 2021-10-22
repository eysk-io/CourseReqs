import React, { FC, useEffect, createRef } from 'react'
import { GetServerSideProps } from 'next'
import * as THREE from 'three'
import { connectToDB } from '../../../db/connect'
import { getCourse } from '../../../db/course'
import CourseBox from '../../../components/CourseBox'

const CoursePage: FC<{ courseInfo?: any; }> = ({
    courseInfo 
}) => {
    const divRef = createRef()
    useEffect(() => {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        const divRefNode = divRef.current as Node
        divRefNode.appendChild(renderer.domElement)
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        })
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)
        camera.position.z = 5
        function animate() {
            requestAnimationFrame(animate)
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
            renderer.render(scene, camera)
        }
        animate()
    }, [divRef])

    const { 
        school, 
        subject, 
        code, 
        title, 
        description, 
        notes 
    } = courseInfo
    return (
        <div 
            className={`${school.toLowerCase()}_${subject.toLowerCase()}_${code} course_page`}
            ref={divRef}
            xmlns="http://www.w3.org/1999/xhtml"
        >
            <CourseBox 
                school={school}
                subject={subject}
                code={code}
                title={title}
                description={description}
                notes={notes}
            />
        </div>
    )
}

export default CoursePage

export const getServerSideProps: GetServerSideProps = async (context) => {
    let courseInfo = {}
    await connectToDB()
    const { school, subject, courseCode } = context.query
    if (
        typeof school === "string" &&
        typeof subject === "string" &&
        typeof courseCode === "string"
    ) {
        courseInfo = await getCourse(school, subject, courseCode)
    }
    return { props: { courseInfo: courseInfo } }
}
