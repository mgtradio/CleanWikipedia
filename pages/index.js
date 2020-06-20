import Head from 'next/head'
import Content from '../components/content'

export default function Home() {
  return (
    <>
      <Head>
        <title>CleanText WikiPedia</title>
        <meta name="description" content="Simples mecanismo de busca para wikepedia, fácil de obter texto simples sem formatação." />.
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content />

    </>
  )
}
