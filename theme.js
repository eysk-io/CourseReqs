import { deep } from "@theme-ui/presets"

const theme = {
    ...deep,
    containers: {
        courseInfo: {
            margin: "auto",
            p: 2,
            width: "75%",
            maxWidth: "650px",
            textAlign: "center",
            description: {
                display: ["none", "none", "none", "block"],
                textAlign: "left",
                margin: 0
            },
            headers: {
                textAlign: "center",
                marginTop: 2
            }
        },
        courseMap: {
            width: "90%",
            height: "600px",
            margin: "auto",
        },
        page: {
            width: "100%",
            maxWidth: "960px",
            m: 0,
            mx: "auto",
        },
    },
    styles: {
        ...deep.styles
    }
}

export default theme
