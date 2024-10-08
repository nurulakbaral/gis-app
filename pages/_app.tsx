import '@mantine/core/styles.css'
import '~/src/assets/globals.css'
import 'leaflet/dist/leaflet.css'
import type { AppProps } from 'next/app'
import { createTheme, MantineProvider } from '@mantine/core'

const theme = createTheme({})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  )
}
