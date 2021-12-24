const createNodes = (course: any): void => {
    course.nodes = []
    course.links = []
    let key: string = "1"
    course.nodes.push({
        code: course.code,
        subject: course.subject,
        key: key,
        level: 0
    })
    let metaNodes: Set<string> = new Set()
    for (const eachPreReq of course.preRequisites) {
        key = (parseInt(key) + 1).toString()
        key = addNodes(eachPreReq, course.nodes, course.links, "1", key, 1, metaNodes)
    }
    // additional step is required because links are based on parent node, NOT current node 
    for (const eachLink of course.links) {
        if (metaNodes.has(eachLink.parent)) {
            eachLink.meta = true
        }
    }
}

const addNodes = (
    course: any,
    courseNodes: any,
    courseLinks: any,
    parent: string,
    key: string,
    level: number,
    metaNodes: Set<string>
): string => {
    if (level > 3)
        return key

    if (course.hasOwnProperty("recommended"))
        return key

    if (Array.isArray(course)) {
        courseNodes.push({
            code: "",
            subject: "All Of",
            key: key,
            level: level,
            meta: true
        })
        metaNodes.add(key)
        courseLinks.push({
            parent: parent,
            target: key,
            level: level
        })
        parent = key
        for (const eachPreReq of course) {
            key = (parseInt(key) + 1).toString()
            key = addNodes(eachPreReq, courseNodes, courseLinks, parent, key, level, metaNodes)
        }
    }

    else if (course.hasOwnProperty("oneOf")) {
        courseNodes.push({
            code: "",
            subject: "One Of",
            key: key,
            level: level,
            meta: true
        })
        metaNodes.add(key)
        courseLinks.push({
            parent: parent,
            target: key,
            level: level
        })
        parent = key
        for (const eachPreReq of course.oneOf) {
            key = (parseInt(key) + 1).toString()
            key = addNodes(eachPreReq, courseNodes, courseLinks, parent, key, level, metaNodes)
        }
    }

    else if (course.hasOwnProperty("scoreOf")) {
        courseNodes.push({
            code: course.scoreOf,
            subject: "Score Of",
            key: key,
            level: level,
            meta: true
        })
        metaNodes.add(key)
        courseLinks.push({
            parent: parent,
            target: key,
            level: level
        })
        parent = key
        for (const eachPreReq of course.courses) {
            key = (parseInt(key) + 1).toString()
            key = addNodes(eachPreReq, courseNodes, courseLinks, parent, key, level, metaNodes)
        }
    }

    else if (course.hasOwnProperty("advancedCredit")) {
        courseNodes.push({
            code: "",
            subject: "Advanced Credit",
            key: key,
            level: level,
            meta: true
        })
        metaNodes.add(key)
        courseLinks.push({
            parent: parent,
            target: key,
            level: level
        })
        parent = key
        for (const eachPreReq of course.advancedCredit) {
            key = (parseInt(key) + 1).toString()
            key = addNodes(eachPreReq, courseNodes, courseLinks, parent, key, level, metaNodes)
        }
    }

    // non-ubc course such as "High School Calculus"
    else if (course.code === -1 && course._id === "") {
        courseNodes.push({
            code: "",
            subject: course.title,
            key: key,
            level: level
        })
        courseLinks.push({
            parent: parent,
            target: key,
            level: level
        })
        parent = key
        for (const eachPreReq of course.preRequisites) {
            key = (parseInt(key) + 1).toString()
            key = addNodes(eachPreReq, courseNodes, courseLinks, parent, key, level + 1, metaNodes)
        }
    }

    // default case
    else {
        courseNodes.push({
            code: course.code ? course.code : "",
            subject: course.subject ? course.subject : "",
            key: key,
            level: level
        })
        courseLinks.push({
            parent: parent,
            target: key,
            level: level
        })
        parent = key
        for (const eachPreReq of course.preRequisites) {
            key = (parseInt(key) + 1).toString()
            key = addNodes(eachPreReq, courseNodes, courseLinks, parent, key, level + 1, metaNodes)
        }
    }

    return key
}

export default createNodes
