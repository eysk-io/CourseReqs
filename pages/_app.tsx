import "../styles/globals.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import Head from "next/head"
import { ThemeProvider } from "theme-ui"
import theme from "../theme"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Course Reqs</title>
        <meta name="description" content="Course requisite api and visualization" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
