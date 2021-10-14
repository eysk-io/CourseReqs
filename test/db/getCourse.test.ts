import { getCourse } from "../../db/course"
import School from "../../resources/school/school.model"
import Course from "../../resources/course/course.model"
import * as dbHandler from "../test-db.setup"

describe("getCourse", () => {
    beforeAll(async () => {
        await dbHandler.connect()
    })

    afterEach(async () => {
        await dbHandler.clearDatabase()
    })

    afterAll(async () => {
        await dbHandler.closeDatabase()
    })

    it("returns the correct course no matter the request parameter/query's letter case", async () => {
        const school = await School.create({ name: "UBC" });
        const cpsc107 = await Course.create({
            subject: "CPSC",
            code: 107,
            school: school.name,
            title: "Systematic Program Design",
            description: "Fundamental computation and program structures. Continuing systematic program design from CPSC 103.",
            credits: "3",
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none"
        });
        const expectedCourse = {
            subject: "CPSC",
            code: 107,
            school: school.name,
            credits: "3",
            title: "Systematic Program Design",
            description: "Fundamental computation and program structures. Continuing systematic program design from CPSC 103.",
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
            __v: 0,
            _id: cpsc107._id
        };
        const req = {
            query: {
                school: "ubC",
                subject: "cPsC",
                courseCode: cpsc107.code
            }
        };
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(result) {
                expect(result.data).toEqual(expectedCourse);
            }
        }
        await getCourse(req, res);
        expect.assertions(2);
    })
    it("returns the correct course with a nested pre-req", async () => {
        const school = await School.create({ name: "UBC" });
        const cpsc107 = await Course.create({
            subject: "CPSC",
            code: 107,
            school: school.name,
            title: "Systematic Program Design",
            description: "Fundamental computation and program structures. Continuing systematic program design from CPSC 103.",
            credits: "3",
            preRequisites: ["CPSC 103"],
            coRequisites: [],
            equivalencies: [],
            notes: "none"
        });
        const cpsc103 = await Course.create({
            subject: "CPSC",
            code: 103,
            school: school.name,
            credits: "3",
            title: "Introduction to Systematic Program Design",
            description: "Computation as a tool for systematic problem solving in non-computer-science disciplines. Introductory programming skills. Not for credit for students who have credit for, or exemption from, or are concurrently taking CPSC 110 or APSC 160. No programming experience expected.",
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none"
        })
        const expectedCourse = {
            subject: "CPSC",
            code: 107,
            school: school.name,
            credits: "3",
            title: "Systematic Program Design",
            description: "Fundamental computation and program structures. Continuing systematic program design from CPSC 103.",
            preRequisites: [
                {
                    subject: "CPSC",
                    code: 103,
                    school: school.name,
                    title: "Introduction to Systematic Program Design",
                    description: "Computation as a tool for systematic problem solving in non-computer-science disciplines. Introductory programming skills. Not for credit for students who have credit for, or exemption from, or are concurrently taking CPSC 110 or APSC 160. No programming experience expected.",
                    credits: "3",
                    preRequisites: [],
                    coRequisites: [],
                    equivalencies: [],
                    notes: "none",
                    __v: 0,
                    _id: cpsc103._id
                }
            ],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
            __v: 0,
            _id: cpsc107._id
        };
        const req = {
            query: {
                school: school.name,
                subject: cpsc107.subject,
                courseCode: cpsc107.code
            }
        };
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(result) {
                expect(result.data).toEqual(expectedCourse);
            }
        }
        await getCourse(req, res);
        expect.assertions(2);
    });
    it("returns the correct courses with multiple levels of nested pre-reqs", async () => {
        const school = await School.create({ name: "UBC" });
        const cpsc340 = await Course.create({
            subject: "CPSC",
            code: 340,
            school: school.name,
            title: "Machine Learning and Data Mining",
            description: "Models of algorithms for dimensionality reduction, nonlinear regression, classification, clustering and unsupervised learning; applications to computer graphics, computer games, bio-informatics, information retrieval, e-commerce, databases, computer vision and artificial intelligence.",
            credits: "3",
            preRequisites: ["CPSC 221"],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const cpsc221 = await Course.create({
            subject: "CPSC",
            code: 221,
            school: school.name,
            title: "Basic Algorithms and Data Structures",
            description: "Design and analysis of basic algorithms and data structures; algorithm analysis methods, searching and sorting algorithms, basic data structures, graphs and concurrency.",
            credits: "4",
            preRequisites: ["CPSC 210"],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const cpsc210 = await Course.create({
            subject: "CPSC",
            code: 210,
            school: school.name,
            title: "Software Construction",
            description: "Design, development, and analysis of robust software components. Topics such as software design, computational models, data structures, debugging, and testing.",
            credits: "4",
            preRequisites: ["CPSC 110"],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const cpsc110 = await Course.create({
            subject: "CPSC",
            code: 110,
            school: school.name,
            title: "Computation, Programs, and Programming",
            description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
            credits: "4",
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const expectedCourse = {
            subject: "CPSC",
            code: 340,
            school: school.name,
            title: "Machine Learning and Data Mining",
            description: "Models of algorithms for dimensionality reduction, nonlinear regression, classification, clustering and unsupervised learning; applications to computer graphics, computer games, bio-informatics, information retrieval, e-commerce, databases, computer vision and artificial intelligence.",
            credits: "3",
            preRequisites: [
                {
                    subject: "CPSC",
                    code: 221,
                    school: school.name,
                    title: "Basic Algorithms and Data Structures",
                    description: "Design and analysis of basic algorithms and data structures; algorithm analysis methods, searching and sorting algorithms, basic data structures, graphs and concurrency.",
                    credits: "4",
                    preRequisites: [
                        {
                            subject: "CPSC",
                            code: 210,
                            school: school.name,
                            title: "Software Construction",
                            description: "Design, development, and analysis of robust software components. Topics such as software design, computational models, data structures, debugging, and testing.",
                            credits: "4",
                            preRequisites: [
                                {
                                    subject: "CPSC",
                                    code: 110,
                                    title: "Computation, Programs, and Programming",
                                    description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                                    school: school.name,
                                    credits: "4",
                                    preRequisites: [],
                                    coRequisites: [],
                                    equivalencies: [],
                                    notes: "none",
                                    __v: 0,
                                    _id: cpsc110._id
                                }
                            ],
                            coRequisites: [],
                            equivalencies: [],
                            notes: "none",
                            __v: 0,
                            _id: cpsc210._id
                        }
                    ],
                    coRequisites: [],
                    equivalencies: [],
                    notes: "none",
                    __v: 0,
                    _id: cpsc221._id
                }
            ],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
            __v: 0,
            _id: cpsc340._id
        };
        const req = {
            query: {
                school: school.name,
                subject: cpsc340.subject,
                courseCode: cpsc340.code
            }
        };
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(result) {
                expect(result.data).toEqual(expectedCourse);
            }
        }
        await getCourse(req, res);
        expect.assertions(2);
    });
    it("returns the correct courses with oneOf pre-reqs", async () => {
        const school = await School.create({ name: "UBC" });
        const cpsc210 = await Course.create({
            subject: "CPSC",
            code: 210,
            school: school.name,
            title: "Software Construction",
            description: "Design, development, and analysis of robust software components. Topics such as software design, computational models, data structures, debugging, and testing.",
            credits: "4",
            preRequisites: [
                {
                    oneOf: [
                        "CPSC 110", "CPSC 107"
                    ]
                }
            ],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const cpsc110 = await Course.create({
            subject: "CPSC",
            code: 110,
            title: "Computation, Programs, and Programming",
            description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
            school: school.name,
            credits: "4",
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const cpsc107 = await Course.create({
            subject: "CPSC",
            code: 107,
            school: school.name,
            title: "Systematic Program Design",
            description: "Fundamental computation and program structures. Continuing systematic program design from CPSC 103.",
            credits: "3",
            preRequisites: ["CPSC 103"],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const cpsc103 = await Course.create({
            subject: "CPSC",
            code: 103,
            school: school.name,
            title: "Introduction to Systematic Program Design",
            description: "Computation as a tool for systematic problem solving in non-computer-science disciplines. Introductory programming skills. Not for credit for students who have credit for, or exemption from, or are concurrently taking CPSC 110 or APSC 160. No programming experience expected.",
            credits: "3",
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const expectedCourse = {
            subject: "CPSC",
            code: 210,
            school: school.name,
            title: "Software Construction",
            description: "Design, development, and analysis of robust software components. Topics such as software design, computational models, data structures, debugging, and testing.",
            credits: "4",
            preRequisites: [
                {
                    oneOf: [
                        {
                            subject: "CPSC",
                            code: 110,
                            title: "Computation, Programs, and Programming",
                            description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                            school: school.name,
                            credits: "4",
                            preRequisites: [],
                            coRequisites: [],
                            equivalencies: [],
                            notes: "none",
                            __v: 0,
                            _id: cpsc110._id
                        },
                        {
                            subject: "CPSC",
                            code: 107,
                            title: "Systematic Program Design",
                            description: "Fundamental computation and program structures. Continuing systematic program design from CPSC 103.",
                            school: school.name,
                            credits: "3",
                            preRequisites: [
                                {
                                    subject: "CPSC",
                                    code: 103,
                                    school: school.name,
                                    title: "Introduction to Systematic Program Design",
                                    description: "Computation as a tool for systematic problem solving in non-computer-science disciplines. Introductory programming skills. Not for credit for students who have credit for, or exemption from, or are concurrently taking CPSC 110 or APSC 160. No programming experience expected.",
                                    credits: "3",
                                    preRequisites: [],
                                    coRequisites: [],
                                    equivalencies: [],
                                    notes: "none",
                                    __v: 0,
                                    _id: cpsc103._id
                                }
                            ],
                            coRequisites: [],
                            equivalencies: [],
                            notes: "none",
                            __v: 0,
                            _id: cpsc107._id
                        }
                    ]
                }
            ],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
            __v: 0,
            _id: cpsc210._id
        };
        const req = {
            query: {
                school: school.name,
                subject: cpsc210.subject,
                courseCode: cpsc210.code
            }
        };
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(result) {
                expect(result.data).toEqual(expectedCourse);
            }
        }
        await getCourse(req, res);
        expect.assertions(2);
    });
    it("returns the correct courses with oneOf co-reqs", async () => {
        const school = await School.create({ name: "UBC" });
        const phys158 = await Course.create({
            subject: "PHYS",
            code: 158,
            credits: "3",
            school: school.name,
            title: "Introductory Physics for Engineers II",
            description: "Electricity and magnetism, DC and AC circuits, optics. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
            preRequisites: ["PHYS 157"],
            coRequisites: [
                {
                    oneOf: [
                        "MATH 101",
                        "MATH 103"
                    ]
                }
            ],
            equivalencies: [],
            notes: "none",
        });
        const phys157 = await Course.create({
            subject: "PHYS",
            code: 157,
            credits: "3",
            school: school.name,
            title: "Introductory Physics for Engineers I",
            description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const expectedCourse = {
            subject: "PHYS",
            code: 158,
            school: school.name,
            title: "Introductory Physics for Engineers II",
            description: "Electricity and magnetism, DC and AC circuits, optics. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
            credits: "3",
            preRequisites: [
                {
                    subject: "PHYS",
                    code: 157,
                    school: school.name,
                    title: "Introductory Physics for Engineers I",
                    description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                    credits: "3",
                    preRequisites: [],
                    coRequisites: [],
                    equivalencies: [],
                    notes: "none",
                    __v: 0,
                    _id: phys157._id
                },
            ],
            coRequisites: [
                {
                    oneOf: [
                        "MATH 101",
                        "MATH 103"
                    ]
                }
            ],
            equivalencies: [],
            notes: "none",
            __v: 0,
            _id: phys158._id
        };
        const req = {
            query: {
                school: school.name,
                subject: phys158.subject,
                courseCode: phys158.code
            }
        };
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(result) {
                expect(result.data).toEqual(expectedCourse);
            }
        }
        await getCourse(req, res);
        expect.assertions(2);
    });
    it("returns the correct courses with scoreOf pre-reqs", async () => {
        const school = await School.create({ name: "UBC" });
        const math221 = await Course.create({
            subject: "MATH",
            code: 221,
            credits: "3",
            title: "Matrix Algebra",
            description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [
                {
                    scoreOf: 64,
                    metric: "percentage",
                    courses: [
                        "PHYS 157"
                    ]
                },
                "MATH 101",
                "MATH 103"
            ],
            coRequisites: [
                "MATH 101",
                "MATH 103"
            ],
            equivalencies: [],
            notes: "none",
        });
        const phys157 = await Course.create({
            subject: "PHYS",
            code: 157,
            credits: "3",
            title: "Introductory Physics for Engineers I",
            description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const math101 = await Course.create({
            subject: "MATH",
            code: 101,
            credits: "3",
            title: "Integral Calculus with Applications to Physical Sciences and Engineering",
            description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const math103 = await Course.create({
            subject: "MATH",
            code: 103,
            credits: "3",
            title: "Integral Calculus with Applications to Life Sciences",
            description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const req = {
            query: {
                school: school.name,
                subject: math221.subject,
                courseCode: math221.code
            }
        };
        const expectedCourse = {
            subject: "MATH",
            code: 221,
            school: school.name,
            title: "Matrix Algebra",
            description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            credits: "3",
            preRequisites: [
                {
                    scoreOf: 64,
                    metric: "percentage",
                    courses: [
                        {
                            subject: "PHYS",
                            code: 157,
                            credits: "3",
                            title: "Introductory Physics for Engineers I",
                            description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                            school: school.name,
                            preRequisites: [],
                            coRequisites: [],
                            equivalencies: [],
                            notes: "none",
                            __v: 0,
                            _id: phys157._id
                        }
                    ]
                },
                {
                    subject: "MATH",
                    code: 101,
                    credits: "3",
                    school: school.name,
                    title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                    description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                    preRequisites: [],
                    coRequisites: [],
                    equivalencies: [],
                    notes: "none",
                    __v: 0,
                    _id: math101._id
                },
                {
                    subject: "MATH",
                    code: 103,
                    credits: "3",
                    school: school.name,
                    title: "Integral Calculus with Applications to Life Sciences",
                    description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                    preRequisites: [],
                    coRequisites: [],
                    equivalencies: [],
                    notes: "none",
                    __v: 0,
                    _id: math103._id
                }
            ],
            coRequisites: [
                "MATH 101",
                "MATH 103"
            ],
            equivalencies: [],
            notes: "none",
            __v: 0,
            _id: math221._id
        };
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(result) {
                expect(result.data).toEqual(expectedCourse);
            }
        }
        await getCourse(req, res);
        expect.assertions(2);
    });
    it("returns the correct courses with scoreOf requirements within oneOf requirements", async () => {
        const school = await School.create({ name: "UBC" });
        const math221 = await Course.create({
            subject: "MATH",
            code: 221,
            credits: "3",
            title: "Matrix Algebra",
            description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [
                {
                    oneOf: [
                        {
                            scoreOf: 64,
                            metric: "percentage",
                            courses: [
                                "PHYS 157"
                            ]
                        },
                        "MATH 101",
                    ]
                },
                "MATH 103"
            ],
            coRequisites: [
                "MATH 101",
                "MATH 103"
            ],
            equivalencies: [],
            notes: "none",
        });
        const phys157 = await Course.create({
            subject: "PHYS",
            code: 157,
            credits: "3",
            title: "Introductory Physics for Engineers I",
            description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const math101 = await Course.create({
            subject: "MATH",
            code: 101,
            credits: "3",
            title: "Integral Calculus with Applications to Physical Sciences and Engineering",
            description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const math103 = await Course.create({
            subject: "MATH",
            code: 103,
            credits: "3",
            title: "Integral Calculus with Applications to Life Sciences",
            description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const req = {
            query: {
                school: school.name,
                subject: math221.subject,
                courseCode: math221.code
            }
        };
        const expectedCourse = {
            subject: "MATH",
            code: 221,
            school: school.name,
            title: "Matrix Algebra",
            description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            credits: "3",
            preRequisites: [
                {
                    oneOf: [
                        {
                            scoreOf: 64,
                            metric: "percentage",
                            courses: [
                                {
                                    subject: "PHYS",
                                    code: 157,
                                    credits: "3",
                                    title: "Introductory Physics for Engineers I",
                                    description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                                    school: school.name,
                                    preRequisites: [],
                                    coRequisites: [],
                                    equivalencies: [],
                                    notes: "none",
                                    __v: 0,
                                    _id: phys157._id
                                }
                            ]
                        },
                        {
                            subject: "MATH",
                            code: 101,
                            credits: "3",
                            title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                            description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                            school: school.name,
                            preRequisites: [],
                            coRequisites: [],
                            equivalencies: [],
                            notes: "none",
                            __v: 0,
                            _id: math101._id
                        },
                    ]
                },
                {
                    subject: "MATH",
                    code: 103,
                    credits: "3",
                    title: "Integral Calculus with Applications to Life Sciences",
                    description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                    school: school.name,
                    preRequisites: [],
                    coRequisites: [],
                    equivalencies: [],
                    notes: "none",
                    __v: 0,
                    _id: math103._id
                }
            ],
            coRequisites: [
                "MATH 101",
                "MATH 103"
            ],
            equivalencies: [],
            notes: "none",
            __v: 0,
            _id: math221._id
        };
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(result) {
                expect(result.data).toEqual(expectedCourse);
            }
        }
        await getCourse(req, res);
        expect.assertions(2);
    });
    it("returns the correct courses with oneOf requirements within scoreOf requirements", async () => {
        const school = await School.create({ name: "UBC" });
        const math221 = await Course.create({
            subject: "MATH",
            code: 221,
            credits: "3",
            title: "Matrix Algebra",
            description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [
                {
                    scoreOf: 64,
                    metric: "percentage",
                    courses: [
                        {
                            oneOf: [
                                "MATH 101",
                                "PHYS 157"
                            ]
                        }
                    ]
                },
                "MATH 103"
            ],
            coRequisites: [
                "MATH 101",
                "MATH 103"
            ],
            equivalencies: [],
            notes: "none",
        });
        const phys157 = await Course.create({
            subject: "PHYS",
            code: 157,
            credits: "3",
            title: "Introductory Physics for Engineers I",
            description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const math101 = await Course.create({
            subject: "MATH",
            code: 101,
            credits: "3",
            title: "Integral Calculus with Applications to Physical Sciences and Engineering",
            description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const math103 = await Course.create({
            subject: "MATH",
            code: 103,
            title: "Integral Calculus with Applications to Life Sciences",
            description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            credits: "3",
            school: school.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const req = {
            query: {
                school: school.name,
                subject: math221.subject,
                courseCode: math221.code
            }
        };
        const expectedCourse = {
            subject: "MATH",
            code: 221,
            school: school.name,
            credits: "3",
            title: "Matrix Algebra",
            description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            preRequisites: [
                {
                    scoreOf: 64,
                    metric: "percentage",
                    courses: [
                        {
                            oneOf: [
                                {
                                    subject: "MATH",
                                    code: 101,
                                    credits: "3",
                                    title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                                    description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                                    school: school.name,
                                    preRequisites: [],
                                    coRequisites: [],
                                    equivalencies: [],
                                    notes: "none",
                                    __v: 0,
                                    _id: math101._id
                                },
                                {
                                    subject: "PHYS",
                                    code: 157,
                                    credits: "3",
                                    title: "Introductory Physics for Engineers I",
                                    description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                                    school: school.name,
                                    preRequisites: [],
                                    coRequisites: [],
                                    equivalencies: [],
                                    notes: "none",
                                    __v: 0,
                                    _id: phys157._id
                                },
                            ]
                        }
                    ]
                },
                {
                    subject: "MATH",
                    code: 103,
                    credits: "3",
                    title: "Integral Calculus with Applications to Life Sciences",
                    description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                    school: school.name,
                    preRequisites: [],
                    coRequisites: [],
                    equivalencies: [],
                    notes: "none",
                    __v: 0,
                    _id: math103._id
                }
            ],
            coRequisites: [
                "MATH 101",
                "MATH 103"
            ],
            equivalencies: [],
            notes: "none",
            __v: 0,
            _id: math221._id
        };
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(result) {
                expect(result.data).toEqual(expectedCourse);
            }
        }
        await getCourse(req, res);
        expect.assertions(2);
    });
    it("returns the correct courses with advancedCredit pre-reqs", async () => {
        const school = await School.create({ name: "UBC" });
        const math221 = await Course.create({
            subject: "MATH",
            code: 221,
            credits: "3",
            title: "Matrix Algebra",
            description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [
                {
                    scoreOf: 64,
                    metric: "percentage",
                    courses: [
                        {
                            oneOf: [
                                "MATH 101",
                                "PHYS 157"
                            ]
                        }
                    ]
                },
                {
                    advancedCredit: [
                        "MATH 103"
                    ]
                }
            ],
            coRequisites: [
                "MATH 101",
                "MATH 103"
            ],
            equivalencies: [],
            notes: "none",
        });
        const phys157 = await Course.create({
            subject: "PHYS",
            code: 157,
            credits: "3",
            title: "Introductory Physics for Engineers I",
            description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const math101 = await Course.create({
            subject: "MATH",
            code: 101,
            credits: "3",
            school: school.name,
            title: "Integral Calculus with Applications to Physical Sciences and Engineering",
            description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const math103 = await Course.create({
            subject: "MATH",
            code: 103,
            credits: "3",
            title: "Integral Calculus with Applications to Life Sciences",
            description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const req = {
            query: {
                school: school.name,
                subject: math221.subject,
                courseCode: math221.code
            }
        };
        const expectedCourse = {
            subject: "MATH",
            code: 221,
            school: school.name,
            credits: "3",
            title: "Matrix Algebra",
            description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            preRequisites: [
                {
                    scoreOf: 64,
                    metric: "percentage",
                    courses: [
                        {
                            oneOf: [
                                {
                                    subject: "MATH",
                                    code: 101,
                                    credits: "3",
                                    school: school.name,
                                    title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                                    description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                                    preRequisites: [],
                                    coRequisites: [],
                                    equivalencies: [],
                                    notes: "none",
                                    __v: 0,
                                    _id: math101._id
                                },
                                {
                                    subject: "PHYS",
                                    code: 157,
                                    credits: "3",
                                    title: "Introductory Physics for Engineers I",
                                    description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                                    school: school.name,
                                    preRequisites: [],
                                    coRequisites: [],
                                    equivalencies: [],
                                    notes: "none",
                                    __v: 0,
                                    _id: phys157._id
                                },
                            ]
                        }
                    ]
                },
                {
                    advancedCredit: [
                        {
                            subject: "MATH",
                            code: 103,
                            credits: "3",
                            title: "Integral Calculus with Applications to Life Sciences",
                            description: "Antiderivatives and definite integrals, infinite series, applications to probability and dynamical systems. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                            school: school.name,
                            preRequisites: [],
                            coRequisites: [],
                            equivalencies: [],
                            notes: "none",
                            __v: 0,
                            _id: math103._id
                        }
                    ]
                }
            ],
            coRequisites: [
                "MATH 101",
                "MATH 103"
            ],
            equivalencies: [],
            notes: "none",
            __v: 0,
            _id: math221._id
        };
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(result) {
                expect(result.data).toEqual(expectedCourse);
            }
        }
        await getCourse(req, res);
        expect.assertions(2);
    });
    it("returns the correct courses with multiple levels of pre-reqs within advancedCredit requirements", async () => {
        const school = await School.create({ name: "UBC" });
        const math221 = await Course.create({
            subject: "MATH",
            code: 221,
            credits: "3",
            title: "Matrix Algebra",
            description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [
                {
                    scoreOf: 64,
                    metric: "percentage",
                    courses: [
                        {
                            oneOf: [
                                "MATH 101",
                                "PHYS 157"
                            ]
                        }
                    ]
                },
                {
                    advancedCredit: [
                        "CPSC 210"
                    ]
                }
            ],
            coRequisites: [
                "MATH 101",
                "MATH 103"
            ],
            equivalencies: [],
            notes: "none",
        });
        const cpsc210 = await Course.create({
            subject: "CPSC",
            code: 210,
            school: school.name,
            title: "Matrix Algebra",
            description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            credits: "4",
            preRequisites: ["CPSC 110"],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const cpsc110 = await Course.create({
            subject: "CPSC",
            code: 110,
            title: "Computation, Programs, and Programming",
            description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
            school: school.name,
            credits: "4",
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const phys157 = await Course.create({
            subject: "PHYS",
            code: 157,
            credits: "3",
            title: "Introductory Physics for Engineers I",
            description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const math101 = await Course.create({
            subject: "MATH",
            code: 101,
            title: "Integral Calculus with Applications to Physical Sciences and Engineering",
            description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            credits: "3",
            school: school.name,
            preRequisites: [],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
        });
        const req = {
            query: {
                school: school.name,
                subject: math221.subject,
                courseCode: math221.code
            }
        };
        const expectedCourse = {
            subject: "MATH",
            code: 221,
            school: school.name,
            credits: "3",
            title: "Matrix Algebra",
            description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            preRequisites: [
                {
                    scoreOf: 64,
                    metric: "percentage",
                    courses: [
                        {
                            oneOf: [
                                {
                                    subject: "MATH",
                                    code: 101,
                                    credits: "3",
                                    title: "Integral Calculus with Applications to Physical Sciences and Engineering",
                                    description: "The definite integral, integration techniques, applications, modelling, infinite series. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                                    school: school.name,
                                    preRequisites: [],
                                    coRequisites: [],
                                    equivalencies: [],
                                    notes: "none",
                                    __v: 0,
                                    _id: math101._id
                                },
                                {
                                    subject: "PHYS",
                                    code: 157,
                                    credits: "3",
                                    title: "Introductory Physics for Engineers I",
                                    description: "Heat, thermodynamics, oscillations, waves, and sound. Please consult the Faculty of Science Credit Exclusion List: www.students.ubc.ca/calendar/index.cfm?tree=12,215,410,414.",
                                    school: school.name,
                                    preRequisites: [],
                                    coRequisites: [],
                                    equivalencies: [],
                                    notes: "none",
                                    __v: 0,
                                    _id: phys157._id
                                },
                            ]
                        }
                    ]
                },
                {
                    advancedCredit: [
                        {
                            subject: "CPSC",
                            code: 210,
                            school: school.name,
                            title: "Matrix Algebra",
                            description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
                            credits: "4",
                            preRequisites: [
                                {
                                    subject: "CPSC",
                                    code: 110,
                                    title: "Computation, Programs, and Programming",
                                    description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modelling, and interacting with the world.",
                                    school: school.name,
                                    credits: "4",
                                    preRequisites: [],
                                    coRequisites: [],
                                    equivalencies: [],
                                    notes: "none",
                                    __v: 0,
                                    _id: cpsc110._id
                                }
                            ],
                            coRequisites: [],
                            equivalencies: [],
                            notes: "none",
                            __v: 0,
                            _id: cpsc210._id
                        }
                    ]
                }
            ],
            coRequisites: [
                "MATH 101",
                "MATH 103"
            ],
            equivalencies: [],
            notes: "none",
            __v: 0,
            _id: math221._id
        };
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(result) {
                expect(result.data).toEqual(expectedCourse);
            }
        }
        await getCourse(req, res);
        expect.assertions(2);
    });
    it("returns the correct courses with pre-reqs that don't exist within the db", async () => {
        const school = await School.create({ name: "UBC" });
        const math221 = await Course.create({
            subject: "MATH",
            code: 221,
            credits: "3",
            title: "Matrix Algebra",
            description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            school: school.name,
            preRequisites: [
                {
                    scoreOf: 64,
                    metric: "percentage",
                    courses: [
                        "Principles of Mathematics 12 or Pre-calculus 12"
                    ]
                }
            ],
            coRequisites: [
                "MATH 101",
                "MATH 103"
            ],
            equivalencies: [],
            notes: "none",
        });
        const req = {
            query: {
                school: school.name,
                subject: math221.subject,
                courseCode: math221.code
            }
        };
        const expectedCourse = {
            subject: "MATH",
            code: 221,
            school: school.name,
            credits: "3",
            title: "Matrix Algebra",
            description: "Systems of linear equations, operations on matrices, determinants, eigenvalues and eigenvectors, diagonalization of symmetric matrices. Please consult the Faculty of Science Credit Exclusion List: www.calendar.ubc.ca/vancouver/index.cfm?tree=12,215,410,414.",
            preRequisites: [
                {
                    scoreOf: 64,
                    metric: "percentage",
                    courses: [
                        {
                            subject: "",
                            code: -1,
                            credits: "",
                            school: "",
                            preRequisites: [],
                            coRequisites: [],
                            equivalencies: [],
                            description: "",
                            title: "Principles of Mathematics 12 or Pre-calculus 12",
                            __v: 0,
                            notes: "",
                            _id: ""
                        }
                    ]
                }
            ],
            coRequisites: [
                "MATH 101",
                "MATH 103"
            ],
            equivalencies: [],
            notes: "none",
            __v: 0,
            _id: math221._id
        };
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(result) {
                expect(result.data).toEqual(expectedCourse);
            }
        }
        await getCourse(req, res);
        expect.assertions(2);
    });
    it("returns the correct courses with recommended prerequisites", async () => {
        const school = await School.create({ name: "UBC" });
        const cpsc107 = await Course.create({
            subject: "CPSC",
            code: 107,
            school: school.name,
            title: "Systematic Program Design",
            description: "Fundamental computation and program structures. Continuing systematic program design from CPSC 103.",
            credits: "3",
            preRequisites: [
                {
                    recommended: [
                        "CPSC 103"
                    ]
                }
            ],
            coRequisites: [],
            equivalencies: [],
            notes: "none"
        });
        const expectedCourse = {
            subject: "CPSC",
            code: 107,
            school: school.name,
            credits: "3",
            title: "Systematic Program Design",
            description: "Fundamental computation and program structures. Continuing systematic program design from CPSC 103.",
            preRequisites: [
                {
                    recommended: [
                        "CPSC 103"
                    ]
                }
            ],
            coRequisites: [],
            equivalencies: [],
            notes: "none",
            __v: 0,
            _id: cpsc107._id
        };
        const req = {
            query: {
                school: school.name,
                subject: cpsc107.subject,
                courseCode: cpsc107.code
            }
        };
        const res = {
            status(status) {
                expect(status).toBe(200);
                return this;
            },
            json(result) {
                expect(result.data).toEqual(expectedCourse);
            }
        }
        await getCourse(req, res);
        expect.assertions(2);
    });
});
