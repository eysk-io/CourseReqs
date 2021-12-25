const createNodes = (course: any): void => {
    course.nodes = []
    let key: string = "1"
    course.nodes.push({
        code: course.code,
        subject: course.subject,
        nodeName: `${course.subject} ${course.code}`,
        key: key,
        level: 0,
        color: "rgb(251, 175, 238)",
        strokeColor: "rgb(241, 3, 200)",
        figure: "RoundedRectangle",
        width: 180,
        height: 60,
        strokeWidth: 8,
        font: "bold 24pt sans-serif",
        url: `${process.env.COURSE_REQS_URL}/${course.school}/${course.subject}/${course.code}`
    })
    for (const eachPreReq of course.preRequisites) {
        key = (parseInt(key) + 1).toString()
        key = addNodes(eachPreReq, course.nodes, "1", key, 1)
    }
}

const addNodes = (
    course: any,
    courseNodes: any,
    parent: string,
    key: string,
    level: number,
): string => {
    if (course.hasOwnProperty("recommended"))
        return key

    if (Array.isArray(course)) {
        courseNodes.push({
            code: "",
            subject: "All Of",
            nodeName: "All Of",
            key: key,
            parent: parent,
            level: level,
            color: getColor(level, true),
            strokeColor: getStrokeColor(level, true),
            figure: "Diamond",
            width: 150,
            height: 100,
            strokeWidth: 8,
            font: "bold 12pt sans-serif",
            url: ""
        })
        parent = key
        for (const eachPreReq of course) {
            key = (parseInt(key) + 1).toString()
            key = addNodes(eachPreReq, courseNodes, parent, key, level)
        }
    }

    else if (course.hasOwnProperty("oneOf")) {
        courseNodes.push({
            code: "",
            subject: "One Of",
            nodeName: "One Of",
            parent: parent,
            key: key,
            level: level,
            color: getColor(level, true),
            strokeColor: getStrokeColor(level, true),
            figure: "Diamond",
            width: 150,
            height: 100,
            strokeWidth: 8,
            font: "bold 12pt sans-serif",
            url: ""
        })
        parent = key
        for (const eachPreReq of course.oneOf) {
            key = (parseInt(key) + 1).toString()
            key = addNodes(eachPreReq, courseNodes, parent, key, level)
        }
    }

    else if (course.hasOwnProperty("scoreOf")) {
        courseNodes.push({
            code: course.scoreOf,
            subject: "Score Of",
            nodeName: `Score Of\n\
        ${course.scoreOf}${course.metric === "percentage" ? "%" : ""}`,
            key: key,
            parent: parent,
            level: level,
            color: getColor(level, true),
            strokeColor: getStrokeColor(level, true),
            figure: "Diamond",
            width: 150,
            height: 100,
            strokeWidth: 8,
            font: "bold 12pt sans-serif",
            url: ""
        })
        parent = key
        for (const eachPreReq of course.courses) {
            key = (parseInt(key) + 1).toString()
            key = addNodes(eachPreReq, courseNodes, parent, key, level)
        }
    }

    else if (course.hasOwnProperty("advancedCredit")) {
        courseNodes.push({
            code: "",
            subject: "Advanced Credit",
            nodeName: "Advanced\nCredit",
            key: key,
            parent: parent,
            level: level,
            color: getColor(level, true),
            strokeColor: getStrokeColor(level, true),
            figure: "Diamond",
            width: 150,
            height: 100,
            strokeWidth: 8,
            font: "bold 12pt sans-serif",
            url: ""
        })
        parent = key
        for (const eachPreReq of course.advancedCredit) {
            key = (parseInt(key) + 1).toString()
            key = addNodes(eachPreReq, courseNodes, parent, key, level)
        }
    }

    // non-ubc course such as "High School Calculus"
    else if (course.code === -1 && course._id === "") {
        courseNodes.push({
            code: "",
            subject: course.title,
            nodeName: course.title,
            key: key,
            parent: parent,
            level: level,
            color: getColor(level, false),
            strokeColor: getStrokeColor(level, false),
            figure: "RoundedRectangle",
            width: 200,
            height: 100,
            strokeWidth: 8,
            font: "bold 24pt sans-serif",
            url: ""
        })
        parent = key
        for (const eachPreReq of course.preRequisites) {
            key = (parseInt(key) + 1).toString()
            key = addNodes(eachPreReq, courseNodes, parent, key, level + 1)
        }
    }

    // default case
    else {
        courseNodes.push({
            code: course.code ? course.code : "",
            subject: course.subject ? course.subject : "",
            nodeName: `${course.subject ? course.subject : ""} ${course.code ? course.code : ""}`,
            key: key,
            parent: parent,
            level: level,
            color: getColor(level, false),
            strokeColor: getStrokeColor(level, false),
            figure: "RoundedRectangle",
            width: 180,
            height: 60,
            strokeWidth: 8,
            font: "bold 24pt sans-serif",
            url: `${process.env.COURSE_REQS_URL}/${course.school}/${course.subject}/${course.code}`
        })
        parent = key
        for (const eachPreReq of course.preRequisites) {
            key = (parseInt(key) + 1).toString()
            key = addNodes(eachPreReq, courseNodes, parent, key, level + 1)
        }
    }

    return key
}

const getColor = (level: number, isMeta: boolean): string => {
    if (isMeta)
        return "rgb(240, 245, 250)"

    let color = "rgb(178, 219, 192)"
    switch (level) {
        case 1:
            color = "rgb(215, 166, 254)" // violet
            break
        case 2:
            color = "rgb(176, 213, 254)" // blue
            break
        default:
            color = "rgb(178, 219, 192)" // green
    }
    return color
}

const getStrokeColor = (level: number, isMeta: boolean): string => {
    if (isMeta)
        return "rgb(95, 82, 122)"

    let strokeColor = "rgb(21, 138, 52)"
    switch (level) {
        case 1:
            strokeColor = "rgb(134, 3, 241)" // violet
            break
        case 2:
            strokeColor = "rgb(0, 100, 210)" // blue
            break
        default:
            strokeColor = "rgb(21, 138, 52)" // green
    }
    return strokeColor
}

export default createNodes
