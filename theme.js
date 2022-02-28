import { deep } from "@theme-ui/presets"

const theme = {
    ...deep,
    containers: {
        courseInfo: {
            margin: "auto",
            p: 2,
            width: "75%",
            maxWidth: "712px",
            textAlign: "center",
            description: {
                display: ["none", "none", "none", "block"],
                textAlign: "left",
                margin: 0,
                marginTop: 2,
                requisites: {
                    textAlign: "left",
                    margin: 0,
                    fontSize: ["10px", "10px", "14px", "16px"]
                },
            },
            courseSelector: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: ["20px", "30px", "30px", "40px"],
                font: "sans-serif",
                fontWeight: "bold",
                height: "50px",
                marginTop: "10px",
                schoolTitle: {
                    marginBottom: ["23px", "32px", "32px", "44px"]
                },
                dropdown: {
                    font: "sans-serif",
                    fontSize: ["20px", "30px", "30px", "40px"],
                    fontWeight: "bold",
                    backgroundColor: deep.colors.background,
                    color: deep.colors.text,
                    cursor: "pointer",
                    margin: "4px",
                    padding: "6px",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    borderWidth: 0,
                    maxWidth: "145px"
                },
                dropdownContent: {
                    font: "sans-serif",
                    fontSize: ["10px", "15px", "15px", "15px"],
                }
            },
            title: {
                textAlign: "center",
                fontSize: ["16px", "21px", "21px", "32px"],
                marginTop: 1,
                marginBottom: 3,
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
                cursor: "pointer",
                "&:hover": { transform: "translateY(-0.25em)", transition: "0.2s" }
            }
        },
        courseMap: {
            buttonContainer: {
                width: "90%",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "25px"
            }
        },
        page: {
            width: "100%",
            maxWidth: "960px",
            m: 0,
            mx: "auto",
        },
        loadingPage: {
            textAlign: "center",
            margin: "auto"
        },
        bugForm: {
            textAlign: "center",
            margin: "auto",
            inputField: {
                marginBottom: "10px"
            }
        },
        noPreReqs: {
            textAlign: "center",
            margin: "auto",
            marginTop: "25px",
            marginBottom: "25px",
            course: {
                height: "1000000px",
                overflowY: "scroll",
                fontSize: [12, 18, 25, 30],
                width: "95%",
                textAlign: "left",
                li: {
                    paddingLeft: 60
                }
            }
        },
        footer: {
            backgroundColor: deep.colors.background,
            color: deep.colors.text,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            margin: "auto",
            height: "80px",
            fontSize: "18px",
            fontWeight: "bold",
            fontAwesomeIcon: {
                marginRight: "5px"
            }
        }
    },
    styles: {
        ...deep.styles
    }
}

export default theme
