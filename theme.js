import { deep } from "@theme-ui/presets"

const theme = {
    ...deep,
    containers: {
        courseInfo: {
            margin: "auto",
            p: 2,
            width: "75%",
            maxWidth: "1024px",
            textAlign: "center",
            description: {
                display: ["none", "none", "none", "block"],
                textAlign: "left",
                margin: 0,
                requisites: {
                    display: ["none", "block", "block", "block"],
                    textAlign: "left",
                    margin: 0,
                }
            },
            headers: {
                textAlign: "center",
                fontSize: ["20px", "30px", "30px", "40px"],
                marginTop: 2
            }
        },
        courseMap: {
            canvas: {
                width: "90%",
                height: ["800px", "800px", "800px", "600px"],
                margin: "auto",
            },
            buttonContainer: {
                width: "90%",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "25px"
            },
            button: {
                backgroundColor: "rgb(240, 245, 250)",
                border: "4px solid rgb(95, 82, 122)",
                transition: "0.25s",
                padding: "5px",
                margin: "5px",
                fontSize: ["7px", "10px", "18px", "18px"],
                fontWeight: "bold",
                color: "rgb(95, 82, 122)",
                cursor: "pointer"
            }
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
