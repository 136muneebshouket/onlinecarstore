import '@/styles/globals.css'
import Layout from '@/Components/Layout'

import '@/styles/navbar.css'
import '@/styles/Login.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return <>
  <Layout>
  <Component {...pageProps} />
  </Layout>



  <Head>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
    </Head>
  </>

}
