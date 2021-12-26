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
                    key: "1",
                    level: 0,
                    color: "rgb(251, 175, 238)",
                    strokeColor: "rgb(241, 3, 200)"
                }
            ]
        })
    })
    it("creates multiple node with multiple single-level pre-requisites", () => {
        createNodes(econ210)
        expect(econ210).toMatchObject({
            nodes: [
                {
                    code: econ210.code,
                    subject: econ210.subject,
                    key: "1",
                    level: 0,
                    color: "rgb(251, 175, 238)",
                    strokeColor: "rgb(241, 3, 200)"
                },
                {
                    code: 101,
                    subject: econ210.subject,
                    key: "2",
                    level: 1
                },
                {
                    code: 102,
                    subject: econ210.subject,
                    key: "3",
                    level: 1
                },
            ]
        })
    })
    it("creates multiple nodes including oneOf case", () => {
        createNodes(cpsc210)
        expect(cpsc210).toMatchObject({
            nodes: [
                {
                    code: cpsc210.code,
                    subject: cpsc210.subject,
                    key: "1",
                    level: 0,
                    color: "rgb(251, 175, 238)",
                    strokeColor: "rgb(241, 3, 200)"
                },
                {
                    code: "",
                    subject: "One Of",
                    key: "2",
                    level: 1,
                    meta: true
                },
                {
                    code: 107,
                    subject: cpsc210.subject,
                    key: "3",
                    level: 1
                },
                {
                    code: 103,
                    subject: cpsc210.subject,
                    key: "4",
                    level: 2
                },
                {
                    code: 110,
                    subject: cpsc210.subject,
                    key: "5",
                    level: 1
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
                    key: "1",
                    level: 0,
                    color: "rgb(251, 175, 238)",
                    strokeColor: "rgb(241, 3, 200)"
                },
                {
                    code: "",
                    subject: "High-school calculus",
                    key: "2",
                    level: 1
                },
                {
                    code: 80,
                    subject: "Score Of",
                    key: "3",
                    level: 1,
                    meta: true
                },
                {
                    code: "",
                    subject: "One Of",
                    key: "4",
                    level: 1,
                    meta: true
                },
                {
                    code: "",
                    subject: "BC Principles of Mathematics 12",
                    key: "5",
                    level: 1
                },
                {
                    code: "",
                    subject: "Pre-calculus 12",
                    key: "6",
                    level: 1
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
                    key: "1",
                    level: 0,
                    color: "rgb(251, 175, 238)",
                    strokeColor: "rgb(241, 3, 200)"
                },
                {
                    code: "",
                    subject: "High-school calculus",
                    key: "2",
                    level: 1
                },
                {
                    code: "",
                    subject: "One Of",
                    key: "3",
                    level: 1,
                    meta: true
                },
                {
                    code: 95,
                    subject: "Score Of",
                    key: "4",
                    level: 1,
                    meta: true
                },
                {
                    code: "",
                    subject: "One Of",
                    key: "5",
                    level: 1,
                    meta: true
                },
                {
                    code: "",
                    subject: "BC Principles of Mathematics 12",
                    key: "6",
                    level: 1
                },
                {
                    code: "",
                    subject: "Pre-calculus 12",
                    key: "7",
                    level: 1
                },
                {
                    code: "",
                    subject: "Permission from the Mathematics Department Head",
                    key: "8",
                    level: 1
                }
            ]
        })
    })
    it("creates multiple nodes including advancedCredit case", () => {
        createNodes(advancedCreditEx)
        expect(advancedCreditEx).toMatchObject({
            nodes: [
                {
                    code: advancedCreditEx.code,
                    subject: advancedCreditEx.subject,
                    key: "1",
                    level: 0,
                    color: "rgb(251, 175, 238)",
                    strokeColor: "rgb(241, 3, 200)"
                },
                {
                    code: "",
                    subject: "Advanced Credit",
                    key: "2",
                    level: 1,
                    meta: true
                },
                {
                    code: 100,
                    subject: advancedCreditEx.subject,
                    key: "3",
                    level: 1
                },
            ]
        })
    })
})
