import { ChakraProvider } from "@chakra-ui/react"
import "../styles/globals.css"
import theme from "@/styles/theme"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} theme={theme} />
    </ChakraProvider>
  )
}

export default MyApp
