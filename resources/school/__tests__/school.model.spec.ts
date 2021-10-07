import { School } from "../school.model";

describe("School model", () => {
    describe("schema", () => {
        test("name", () => {
            const name = School.schema.obj.name
            expect(name).toEqual({
                type: String,
                required: true,
                trim: true,
                maxlength: 10,
                unique: true
            })
        })
    })
})
