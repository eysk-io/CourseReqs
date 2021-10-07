import Course from "../course.model";

describe("course model", () => {
    describe("schema", () => {
        test("subject", () => {
            const subject = Course.schema.obj.subject
            expect(subject).toEqual({
                type: String,
                required: true,
                trim: true,
                maxlength: 5
            })
        })
        test("title", () => {
            const title = Course.schema.obj.title
            expect(title).toEqual({
                type: String,
                required: true,
                trim: true
            });
        });
        test("description", () => {
            const description = Course.schema.obj.description
            expect(description).toEqual({
                type: String,
                required: true,
                trim: true
            });
        });
        test("code", () => {
            const code = Course.schema.obj.code
            expect(code).toEqual({
                type: Number,
                required: true,
                trim: true,
                maxlength: 5
            })
        })
        test("credits", () => {
            const credits = Course.schema.obj.credits
            expect(credits).toEqual({
                type: String,
                required: true,
                trim: true
            })
        })
        test("school", () => {
            const school = Course.schema.obj.school;
            expect(school).toEqual({
                type: String,
                ref: 'school',
                required: true
            });
        });
        test("pre-requisites", () => {
            const preRequisites = Course.schema.obj.preRequisites;
            expect(preRequisites).toEqual({
                type: [],
                required: true
            });
        });
        test("co-requisites", () => {
            const coRequisites = Course.schema.obj.coRequisites;
            expect(coRequisites).toEqual({
                type: [],
                required: true
            });
        });
        test("equivalencies", () => {
            const equivalencies = Course.schema.obj.equivalencies;
            expect(equivalencies).toEqual({
                type: [],
                required: true
            });
        });
        test("notes", () => {
            const notes = Course.schema.obj.notes;
            expect(notes).toEqual({
                type: String,
                required: true
            });
        });
    });
});
