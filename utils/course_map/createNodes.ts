const createNodes = (course: any): void => {
    course.nodes = []
    course.links = []
    let id: string = "1"
    course.nodes.push({
        code: course.code,
        subject: course.subject,
        id: id,
        level: 0
    })
    let metaNodes: Set<string> = new Set()
    for (const eachPreReq of course.preRequisites) {
        id = (parseInt(id) + 1).toString()
        id = addNodes(eachPreReq, course.nodes, course.links, "1", id, 1, metaNodes)
    }
    // additional step is required because links are based on source node, NOT current node 
    for (const eachLink of course.links) {
        if (metaNodes.has(eachLink.source)) {
            eachLink.meta = true
        }
    }
}

const addNodes = (
    course: any,
    courseNodes: any,
    courseLinks: any,
    source: string,
    id: string,
    level: number,
    metaNodes: Set<string>
): string => {
    if (level > 3)
        return id

    if (course.hasOwnProperty("recommended"))
        return id

    if (Array.isArray(course)) {
        courseNodes.push({
            code: "",
            subject: "All Of",
            id: id,
            level: level,
            meta: true
        })
        metaNodes.add(id)
        courseLinks.push({
            source: source,
            target: id,
            level: level
        })
        source = id
        for (const eachPreReq of course) {
            id = (parseInt(id) + 1).toString()
            id = addNodes(eachPreReq, courseNodes, courseLinks, source, id, level, metaNodes)
        }
    }

    else if (course.hasOwnProperty("oneOf")) {
        courseNodes.push({
            code: "",
            subject: "One Of",
            id: id,
            level: level,
            meta: true
        })
        metaNodes.add(id)
        courseLinks.push({
            source: source,
            target: id,
            level: level
        })
        source = id
        for (const eachPreReq of course.oneOf) {
            id = (parseInt(id) + 1).toString()
            id = addNodes(eachPreReq, courseNodes, courseLinks, source, id, level, metaNodes)
        }
    }

    else if (course.hasOwnProperty("scoreOf")) {
        courseNodes.push({
            code: course.scoreOf,
            subject: "Score Of",
            id: id,
            level: level,
            meta: true
        })
        metaNodes.add(id)
        courseLinks.push({
            source: source,
            target: id,
            level: level
        })
        source = id
        for (const eachPreReq of course.courses) {
            id = (parseInt(id) + 1).toString()
            id = addNodes(eachPreReq, courseNodes, courseLinks, source, id, level, metaNodes)
        }
    }

    else if (course.hasOwnProperty("advancedCredit")) {
        courseNodes.push({
            code: "",
            subject: "Advanced Credit",
            id: id,
            level: level,
            meta: true
        })
        metaNodes.add(id)
        courseLinks.push({
            source: source,
            target: id,
            level: level
        })
        source = id
        for (const eachPreReq of course.advancedCredit) {
            id = (parseInt(id) + 1).toString()
            id = addNodes(eachPreReq, courseNodes, courseLinks, source, id, level, metaNodes)
        }
    }

    // non-ubc course such as "High School Calculus"
    else if (course.code === -1 && course._id === "") {
        courseNodes.push({
            code: "",
            subject: course.title,
            id: id,
            level: level
        })
        courseLinks.push({
            source: source,
            target: id,
            level: level
        })
        source = id
        for (const eachPreReq of course.preRequisites) {
            id = (parseInt(id) + 1).toString()
            id = addNodes(eachPreReq, courseNodes, courseLinks, source, id, level + 1, metaNodes)
        }
    }

    // default case
    else {
        courseNodes.push({
            code: course.code ? course.code : "",
            subject: course.subject ? course.subject : "",
            id: id,
            level: level
        })
        courseLinks.push({
            source: source,
            target: id,
            level: level
        })
        source = id
        for (const eachPreReq of course.preRequisites) {
            id = (parseInt(id) + 1).toString()
            id = addNodes(eachPreReq, courseNodes, courseLinks, source, id, level + 1, metaNodes)
        }
    }

    return id
}

export default createNodes
