import '@/styles/globals.css'
import Layout from '@/Components/Layout'
import '@/styles/navbar.css'
import '@/styles/Login.css'
import '@/styles/profile.css'
import '@/styles/modal.css'
import '@/styles/fullloader.css'
import '@/styles/home.css'
import '@/styles/sell.css'
import '@/styles/Post_ad.css'
import '@/styles/Textareamodal.css'
import '@/styles/optionsmodal.css'
import '@/styles/show_img_modal.css'

import Head from 'next/head'

import React,{useState , useEffect} from 'react'
// import FullLoader from '@/components/Modals/Loader/fullLoader'
import { useRouter } from 'next/router'

import dynamic from 'next/dynamic'

// const Layout = dynamic(() => import('../components/Layout'), {
//   loading: () => <p>Loading...</p>,
// })
const FullLoader = dynamic(() => import('../components/Modals/Loader/fullLoader'), {
  loading: () => <p>Loading...</p>,
})


export default function App({ Component, pageProps }) {

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleRouteChange = (url) => {
      setLoading(true)
    }

    const handleRouteChangeComplete = () => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router.events])

  return <>
  
   <Layout>
  {
    loading ? <FullLoader/>
    :
    
    <Component {...pageProps} />
   
  }
  </Layout>



  <Head>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"></link>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS" crossorigin="anonymous"></script>
    </Head>
  </>

}
