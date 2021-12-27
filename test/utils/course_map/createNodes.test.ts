import createNodes from "../../../utils/course_map/createNodes"
import cpsc110 from "./testData/cpsc110"
import econ210 from "./testData/econ210"
import cpsc210 from "./testData/cpsc210"
import math100 from "./testData/math100"
import math120 from "./testData/math120"
import advancedCreditEx from "./testData/advancedCreditEx"

describe("createNode", () => {
    it("creates single node", () => {
        createNodes(cpsc110)
        expect(cpsc110).toMatchObject({
            nodes: [
                {
                    code: cpsc110.code,
                    subject: cpsc110.subject,
                    nodeName: `${cpsc110.subject} ${cpsc110.code}`,
                    key: "1",
                    level: 0,
                    color: "rgb(251, 175, 238)",
                    strokeColor: "rgb(241, 3, 200)",
                    figure: "RoundedRectangle",
                    width: 180,
                    height: 75,
                    strokeWidth: 8,
                    font: "bold 24pt sans-serif",
                    url: `${process.env.COURSE_REQS_URL}/${cpsc110.school}/${cpsc110.subject}/${cpsc110.code}`,
                    title: `${cpsc110.title} (${cpsc110.credits})`,
                    visible: true
                }
            ]
        })
    })
    it("creates multiple node with multiple single-level pre-requisites", () => {
        createNodes(econ210)
        const econ101Title = "Principles of Microeconomics"
        const econ101Credits = "3"
        const econ101Code = "101"
        const econ102Title = "Principles of Macroeconomics"
        const econ102Credits = "3"
        const econ102Code = "102"
        expect(econ210).toMatchObject({
            nodes: [
                {
                    code: econ210.code,
                    subject: econ210.subject,
                    nodeName: `${econ210.subject} ${econ210.code}`,
                    key: "1",
                    level: 0,
                    color: "rgb(251, 175, 238)",
                    strokeColor: "rgb(241, 3, 200)",
                    figure: "RoundedRectangle",
                    width: 180,
                    height: 75,
                    strokeWidth: 8,
                    font: "bold 24pt sans-serif",
                    url: `${process.env.COURSE_REQS_URL}/${econ210.school}/${econ210.subject}/${econ210.code}`,
                    title: `${econ210.title} (${econ210.credits})`,
                    visible: true
                },
                {
                    code: 101,
                    subject: econ210.subject,
                    nodeName: `${econ210.subject} ${econ101Code}`,
                    key: "2",
                    level: 1,
                    parent: "1",
                    color: "rgb(215, 166, 254)",
                    strokeColor: "rgb(134, 3, 241)",
                    figure: "RoundedRectangle",
                    width: 180,
                    height: 75,
                    strokeWidth: 8,
                    font: "bold 24pt sans-serif",
                    url: `${process.env.COURSE_REQS_URL}/${econ210.school}/${econ210.subject}/${econ101Code}`,
                    title: `${econ101Title} (${econ101Credits})`,
                    visible: true
                },
                {
                    code: 102,
                    subject: econ210.subject,
                    nodeName: `${econ210.subject} ${econ102Code}`,
                    key: "3",
                    level: 1,
                    parent: "1",
                    color: "rgb(215, 166, 254)",
                    strokeColor: "rgb(134, 3, 241)",
                    figure: "RoundedRectangle",
                    width: 180,
                    height: 75,
                    strokeWidth: 8,
                    font: "bold 24pt sans-serif",
                    url: `${process.env.COURSE_REQS_URL}/${econ210.school}/${econ210.subject}/${econ102Code}`,
                    title: `${econ102Title} (${econ102Credits})`,
                    visible: true
                },
            ]
        })
    })
    it("creates multiple nodes including oneOf case", () => {
        createNodes(cpsc210)
        const cpsc107Title = "Systematic Program Design"
        const cpsc103Title = "Introduction to Systematic Program Design"
        const cpsc110Title = "Computation, Programs, and Programming"
        expect(cpsc210).toMatchObject({
            nodes: [
                {
                    code: cpsc210.code,
                    subject: cpsc210.subject,
                    nodeName: `${cpsc210.subject} ${cpsc210.code}`,
                    key: "1",
                    level: 0,
                    color: "rgb(251, 175, 238)",
                    strokeColor: "rgb(241, 3, 200)",
                    figure: "RoundedRectangle",
                    width: 180,
                    height: 75,
                    strokeWidth: 8,
                    font: "bold 24pt sans-serif",
                    url: `${process.env.COURSE_REQS_URL}/${cpsc210.school}/${cpsc210.subject}/${cpsc210.code}`,
                    title: `${cpsc210.title} (${cpsc210.credits})`,
                    visible: true
                },
                {
                    code: "",
                    subject: "One Of",
                    nodeName: "One Of",
                    key: "2",
                    level: 1,
                    parent: "1",
                    color: "rgb(240, 245, 250)",
                    strokeColor: "rgb(95, 82, 122)",
                    figure: "Diamond",
                    width: 150,
                    height: 100,
                    strokeWidth: 8,
                    font: "bold 12pt sans-serif",
                    url: "",
                    title: "",
                    visible: false
                },
                {
                    code: 107,
                    subject: cpsc210.subject,
                    nodeName: `${cpsc210.subject} 107`,
                    key: "3",
                    level: 1,
                    parent: "2",
                    color: "rgb(215, 166, 254)",
                    strokeColor: "rgb(134, 3, 241)",
                    figure: "RoundedRectangle",
                    width: 180,
                    height: 75,
                    strokeWidth: 8,
                    font: "bold 24pt sans-serif",
                    url: `${process.env.COURSE_REQS_URL}/UBC/CPSC/107`,
                    title: `${cpsc107Title} (3)`,
                    visible: true
                },
                {
                    code: 103,
                    subject: cpsc210.subject,
                    nodeName: `${cpsc210.subject} 103`,
                    key: "4",
                    level: 2,
                    parent: "3",
                    color: "rgb(176, 213, 254)",
                    strokeColor: "rgb(0, 100, 210)",
                    figure: "RoundedRectangle",
                    width: 180,
                    height: 75,
                    strokeWidth: 8,
                    font: "bold 24pt sans-serif",
                    url: `${process.env.COURSE_REQS_URL}/UBC/CPSC/103`,
                    title: `${cpsc103Title} (3)`,
                    visible: true
                },
                {
                    code: 110,
                    subject: cpsc210.subject,
                    nodeName: `${cpsc210.subject} 110`,
                    key: "5",
                    level: 1,
                    parent: "2",
                    color: "rgb(215, 166, 254)",
                    strokeColor: "rgb(134, 3, 241)",
                    figure: "RoundedRectangle",
                    width: 180,
                    height: 75,
                    strokeWidth: 8,
                    font: "bold 24pt sans-serif",
                    url: `${process.env.COURSE_REQS_URL}/UBC/CPSC/110`,
                    title: `${cpsc110Title} (4)`,
                    visible: true
                }
            ]
        })
    })
    it("creates multiple nodes including scoreOf case", () => {
        createNodes(math100)
        expect(math100).toMatchObject({
            nodes: [
                {
                    code: math100.code,
                    subject: math100.subject,
                    nodeName: `${math100.subject} ${math100.code}`,
                    key: "1",
                    level: 0,
                    color: "rgb(251, 175, 238)",
                    strokeColor: "rgb(241, 3, 200)",
                    figure: "RoundedRectangle",
                    width: 180,
                    height: 75,
                    strokeWidth: 8,
                    font: "bold 24pt sans-serif",
                    url: `${process.env.COURSE_REQS_URL}/${math100.school}/${math100.subject}/${math100.code}`,
                    title: `${math100.title} (${math100.credits})`,
                    visible: true
                },
                {
                    code: "",
                    subject: "High-school calculus",
                    nodeName: "High-school calculus",
                    key: "2",
                    level: 1,
                    parent: "1",
                    color: "rgb(215, 166, 254)",
                    strokeColor: "rgb(134, 3, 241)",
                    figure: "RoundedRectangle",
                    width: 200,
                    height: 50,
                    strokeWidth: 8,
                    font: "bold 14pt sans-serif",
                    url: "",
                    title: "High-school calculus",
                    visible: true
                },
                {
                    code: 80,
                    subject: "Score Of",
                    nodeName: "Score Of\n80%",
                    key: "3",
                    level: 1,
                    parent: "1",
                    color: "rgb(240, 245, 250)",
                    strokeColor: "rgb(95, 82, 122)",
                    figure: "Diamond",
                    width: 150,
                    height: 100,
                    strokeWidth: 8,
                    font: "bold 12pt sans-serif",
                    url: "",
                    title: "",
                    visible: false
                },
                {
                    code: "",
                    subject: "One Of",
                    nodeName: "One Of",
                    key: "4",
                    level: 1,
                    parent: "3",
                    color: "rgb(240, 245, 250)",
                    strokeColor: "rgb(95, 82, 122)",
                    figure: "Diamond",
                    width: 150,
                    height: 100,
                    strokeWidth: 8,
                    font: "bold 12pt sans-serif",
                    url: "",
                    title: "",
                    visible: false
                },
                {
                    code: "",
                    subject: "BC Principles of Mathematics 12",
                    nodeName: "BC Principles of Mathematics 12",
                    key: "5",
                    level: 1,
                    parent: "4",
                    color: "rgb(215, 166, 254)",
                    strokeColor: "rgb(134, 3, 241)",
                    figure: "RoundedRectangle",
                    width: 200,
                    height: 50,
                    strokeWidth: 8,
                    font: "bold 14pt sans-serif",
                    url: "",
                    title: "BC Principles of Mathematics 12",
                    visible: true
                },
                {
                    code: "",
                    subject: "Pre-calculus 12",
                    nodeName: "Pre-calculus 12",
                    key: "6",
                    level: 1,
                    parent: "4",
                    color: "rgb(215, 166, 254)",
                    strokeColor: "rgb(134, 3, 241)",
                    figure: "RoundedRectangle",
                    width: 200,
                    height: 50,
                    strokeWidth: 8,
                    font: "bold 14pt sans-serif",
                    url: "",
                    title: "Pre-calculus 12",
                    visible: true
                }
            ]
        })
    })
    it("creates multiple nodes including scoreOf nested in oneOf case", () => {
        createNodes(math120)
        expect(math120).toMatchObject({
            nodes: [
                {
                    code: math120.code,
                    subject: math120.subject,
                    nodeName: `${math120.subject} ${math120.code}`,
                    key: "1",
                    level: 0,
                    color: "rgb(251, 175, 238)",
                    strokeColor: "rgb(241, 3, 200)",
                    figure: "RoundedRectangle",
                    width: 180,
                    height: 75,
                    strokeWidth: 8,
                    font: "bold 24pt sans-serif",
                    url: `${process.env.COURSE_REQS_URL}/${math120.school}/${math120.subject}/${math120.code}`,
                    title: `${math120.title} (${math120.credits})`,
                    visible: true
                },
                {
                    code: "",
                    subject: "High-school calculus",
                    nodeName: "High-school calculus",
                    key: "2",
                    level: 1,
                    parent: "1",
                    color: "rgb(215, 166, 254)",
                    strokeColor: "rgb(134, 3, 241)",
                    figure: "RoundedRectangle",
                    width: 200,
                    height: 50,
                    strokeWidth: 8,
                    font: "bold 14pt sans-serif",
                    url: "",
                    title: "High-school calculus",
                    visible: true
                },
                {
                    code: "",
                    subject: "One Of",
                    nodeName: "One Of",
                    key: "3",
                    level: 1,
                    parent: "1",
                    color: "rgb(240, 245, 250)",
                    strokeColor: "rgb(95, 82, 122)",
                    figure: "Diamond",
                    width: 150,
                    height: 100,
                    strokeWidth: 8,
                    font: "bold 12pt sans-serif",
                    url: "",
                    title: "",
                    visible: false
                },
                {
                    code: 95,
                    subject: "Score Of",
                    nodeName: "Score Of\n95%",
                    key: "4",
                    level: 1,
                    parent: "3",
                    color: "rgb(240, 245, 250)",
                    strokeColor: "rgb(95, 82, 122)",
                    figure: "Diamond",
                    width: 150,
                    height: 100,
                    strokeWidth: 8,
                    font: "bold 12pt sans-serif",
                    url: "",
                    title: "",
                    visible: false
                },
                {
                    code: "",
                    subject: "One Of",
                    nodeName: "One Of",
                    key: "5",
                    level: 1,
                    parent: "4",
                    color: "rgb(240, 245, 250)",
                    strokeColor: "rgb(95, 82, 122)",
                    figure: "Diamond",
                    width: 150,
                    height: 100,
                    strokeWidth: 8,
                    font: "bold 12pt sans-serif",
                    url: "",
                    title: "",
                    visible: false
                },
                {
                    code: "",
                    subject: "BC Principles of Mathematics 12",
                    nodeName: "BC Principles of Mathematics 12",
                    key: "6",
                    level: 1,
                    parent: "5",
                    color: "rgb(215, 166, 254)",
                    strokeColor: "rgb(134, 3, 241)",
                    figure: "RoundedRectangle",
                    width: 200,
                    height: 50,
                    strokeWidth: 8,
                    font: "bold 14pt sans-serif",
                    url: "",
                    title: "BC Principles of Mathematics 12",
                    visible: true
                },
                {
                    code: "",
                    subject: "Pre-calculus 12",
                    nodeName: "Pre-calculus 12",
                    key: "7",
                    level: 1,
                    parent: "5",
                    color: "rgb(215, 166, 254)",
                    strokeColor: "rgb(134, 3, 241)",
                    figure: "RoundedRectangle",
                    width: 200,
                    height: 50,
                    strokeWidth: 8,
                    font: "bold 14pt sans-serif",
                    url: "",
                    title: "Pre-calculus 12",
                    visible: true
                },
                {
                    code: "",
                    subject: "Permission from the Mathematics Department Head",
                    nodeName: "Permission from the Mathematics Department Head",
                    key: "8",
                    level: 1,
                    parent: "3",
                    color: "rgb(215, 166, 254)",
                    strokeColor: "rgb(134, 3, 241)",
                    figure: "RoundedRectangle",
                    width: 200,
                    height: 50,
                    strokeWidth: 8,
                    font: "bold 14pt sans-serif",
                    url: "",
                    title: "Permission from the Mathematics Department Head",
                    visible: true
                }
            ]
        })
    })
    it("creates multiple nodes including advancedCredit case", () => {
        createNodes(advancedCreditEx)
        const math100Title = "Differential Calculus with Applications to Physical Sciences and Engineering"
        expect(advancedCreditEx).toMatchObject({
            nodes: [
                {
                    code: advancedCreditEx.code,
                    subject: advancedCreditEx.subject,
                    nodeName: `${advancedCreditEx.subject} ${advancedCreditEx.code}`,
                    key: "1",
                    level: 0,
                    color: "rgb(251, 175, 238)",
                    strokeColor: "rgb(241, 3, 200)",
                    figure: "RoundedRectangle",
                    width: 180,
                    height: 75,
                    strokeWidth: 8,
                    font: "bold 24pt sans-serif",
                    url: `${process.env.COURSE_REQS_URL}/${advancedCreditEx.school}/${advancedCreditEx.subject}/${advancedCreditEx.code}`,
                    title: `${advancedCreditEx.title} (${advancedCreditEx.credits})`,
                    visible: true
                },
                {
                    code: "",
                    subject: "Advanced Credit",
                    nodeName: "Advanced\nCredit",
                    key: "2",
                    level: 1,
                    parent: "1",
                    color: "rgb(240, 245, 250)",
                    strokeColor: "rgb(95, 82, 122)",
                    figure: "Diamond",
                    width: 150,
                    height: 100,
                    strokeWidth: 8,
                    font: "bold 12pt sans-serif",
                    url: "",
                    title: "",
                    visible: false
                },
                {
                    code: 100,
                    subject: advancedCreditEx.subject,
                    nodeName: `${advancedCreditEx.subject} 100`,
                    key: "3",
                    level: 1,
                    parent: "2",
                    color: "rgb(215, 166, 254)",
                    strokeColor: "rgb(134, 3, 241)",
                    figure: "RoundedRectangle",
                    width: 180,
                    height: 75,
                    strokeWidth: 8,
                    font: "bold 24pt sans-serif",
                    url: `${process.env.COURSE_REQS_URL}/UBC/MATH/100`,
                    title: `${math100Title} (3)`,
                    visible: true
                },
            ]
        })
    })
})
