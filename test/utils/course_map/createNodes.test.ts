import createNodes from '../../../utils/course_map/createNodes'
import cpsc110 from './testData/cpsc110'
import econ210 from './testData/econ210'
import cpsc210 from './testData/cpsc210'
import math100 from './testData/math100'
import math120 from './testData/math120'
import advancedCreditEx from './testData/advancedCreditEx'

describe("createNode", () => {
    it("creates single node with no links", () => {
        createNodes(cpsc110)
        expect(cpsc110).toMatchObject({
            nodes: [
                {
                    code: cpsc110.code,
                    subject: cpsc110.subject,
                    id: "1",
                    level: 0
                }
            ]
        })
        expect(cpsc110).toMatchObject({ links: [] })
    })
    it("creates multiple node with multiple single-level pre-requisites", () => {
        createNodes(econ210)
        expect(econ210).toMatchObject({
            nodes: [
                {
                    code: econ210.code,
                    subject: econ210.subject,
                    id: "1",
                    level: 0
                },
                {
                    code: 101,
                    subject: econ210.subject,
                    id: "2",
                    level: 1
                },
                {
                    code: 102,
                    subject: econ210.subject,
                    id: "3",
                    level: 1
                },
            ]
        })
        expect(econ210).toMatchObject({
            links: [
                {
                    source: "1",
                    target: "2",
                    level: 1
                },
                {
                    source: "1",
                    target: "3",
                    level: 1
                }
            ]
        })
    })
    it("creates multiple nodes and links including oneOf case", () => {
        createNodes(cpsc210)
        expect(cpsc210).toMatchObject({
            nodes: [
                {
                    code: cpsc210.code,
                    subject: cpsc210.subject,
                    id: "1",
                    level: 0
                },
                {
                    code: "",
                    subject: "One Of",
                    id: "2",
                    level: 1,
                    meta: true
                },
                {
                    code: 107,
                    subject: cpsc210.subject,
                    id: "3",
                    level: 1
                },
                {
                    code: 103,
                    subject: cpsc210.subject,
                    id: "4",
                    level: 2
                },
                {
                    code: 110,
                    subject: cpsc210.subject,
                    id: "5",
                    level: 1
                }
            ]
        })
        expect(cpsc210).toMatchObject({
            links: [
                {
                    source: "1",
                    target: "2",
                    level: 1
                },
                {
                    source: "2",
                    target: "3",
                    level: 1,
                    meta: true
                },
                {
                    source: "3",
                    target: "4",
                    level: 2
                },
                {
                    source: "2",
                    target: "5",
                    level: 1,
                    meta: true
                }
            ]
        })
    })
    it("creates multiple nodes and links including scoreOf case", () => {
        createNodes(math100)
        expect(math100).toMatchObject({
            nodes: [
                {
                    code: math100.code,
                    subject: math100.subject,
                    id: "1",
                    level: 0
                },
                {
                    code: "",
                    subject: "High-school calculus",
                    id: "2",
                    level: 1
                },
                {
                    code: 80,
                    subject: "Score Of",
                    id: "3",
                    level: 1,
                    meta: true
                },
                {
                    code: "",
                    subject: "One Of",
                    id: "4",
                    level: 1,
                    meta: true
                },
                {
                    code: "",
                    subject: "BC Principles of Mathematics 12",
                    id: "5",
                    level: 1
                },
                {
                    code: "",
                    subject: "Pre-calculus 12",
                    id: "6",
                    level: 1
                }
            ]
        })
        expect(math100).toMatchObject({
            links: [
                {
                    source: "1",
                    target: "2",
                    level: 1
                },
                {
                    source: "1",
                    target: "3",
                    level: 1
                },
                {
                    source: "3",
                    target: "4",
                    level: 1,
                    meta: true
                },
                {
                    source: "4",
                    target: "5",
                    level: 1,
                    meta: true
                },
                {
                    source: "4",
                    target: "6",
                    level: 1,
                    meta: true
                }
            ]
        })
    })
    it("creates multiple nodes and links including scoreOf nested in oneOf case", () => {
        createNodes(math120)
        expect(math120).toMatchObject({
            nodes: [
                {
                    code: math120.code,
                    subject: math120.subject,
                    id: "1",
                    level: 0
                },
                {
                    code: "",
                    subject: "High-school calculus",
                    id: "2",
                    level: 1
                },
                {
                    code: "",
                    subject: "One Of",
                    id: "3",
                    level: 1,
                    meta: true
                },
                {
                    code: 95,
                    subject: "Score Of",
                    id: "4",
                    level: 1,
                    meta: true
                },
                {
                    code: "",
                    subject: "One Of",
                    id: "5",
                    level: 1,
                    meta: true
                },
                {
                    code: "",
                    subject: "BC Principles of Mathematics 12",
                    id: "6",
                    level: 1
                },
                {
                    code: "",
                    subject: "Pre-calculus 12",
                    id: "7",
                    level: 1
                },
                {
                    code: "",
                    subject: "Permission from the Mathematics Department Head",
                    id: "8",
                    level: 1
                }
            ]
        })
        expect(math120).toMatchObject({
            links: [
                {
                    source: "1",
                    target: "2",
                    level: 1
                },
                {
                    source: "1",
                    target: "3",
                    level: 1
                },
                {
                    source: "3",
                    target: "4",
                    level: 1,
                    meta: true
                },
                {
                    source: "4",
                    target: "5",
                    level: 1,
                    meta: true
                },
                {
                    source: "5",
                    target: "6",
                    level: 1,
                    meta: true
                },
                {
                    source: "5",
                    target: "7",
                    level: 1,
                    meta: true
                },
                {
                    source: "3",
                    target: "8",
                    level: 1,
                    meta: true
                }
            ]
        })
    })
    it("creates multiple nodes and links including advancedCredit case", () => {
        createNodes(advancedCreditEx)
        expect(advancedCreditEx).toMatchObject({
            nodes: [
                {
                    code: advancedCreditEx.code,
                    subject: advancedCreditEx.subject,
                    id: "1",
                    level: 0
                },
                {
                    code: "",
                    subject: "Advanced Credit",
                    id: "2",
                    level: 1,
                    meta: true
                },
                {
                    code: 100,
                    subject: advancedCreditEx.subject,
                    id: "3",
                    level: 1
                },
            ]
        })
        expect(advancedCreditEx).toMatchObject({
            links: [
                {
                    source: "1",
                    target: "2",
                    level: 1
                },
                {
                    source: "2",
                    target: "3",
                    level: 1,
                    meta: true
                },
            ]
        })
    })
})
