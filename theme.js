import { deep } from '@theme-ui/presets'

const theme = {
    ...deep,
    containers: {
        courseInfo: {
            margin: 'auto',
            p: 2,
            width: '75%',
            maxWidth: '650px',
            textAlign: 'center'
        },
        courseMap: {
            width: "80%",
            height: "1000px",
            maxHeight: "80%",
            margin: "auto"
        },
        courseInfoDescription: {
            textAlign: 'left',
            margin: 0
        },
        courseInfoHeaders: {
            textAlign: 'center',
            marginTop: 2
        },
        page: {
            width: '100%',
            maxWidth: '960px',
            m: 0,
            mx: 'auto',
        },
    },
    styles: {
        ...deep.styles
    }
}

export default theme
