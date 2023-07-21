import { Header } from '@/components/Header'
import { globalStyles } from '@/styles/global'
import { Container } from '@/styles/pages/app'
import type { AppProps } from 'next/app'


// Como estamos utilizando o Nextjs, para chamar um arquivo de css global
// chamamos no arquivo _app. Como o globalStyles é uma função, ele é executado.
// Ele deve ficar fora do componente App, pois só irá ser carregado 1 vez.
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
    </Container>

  )
}
