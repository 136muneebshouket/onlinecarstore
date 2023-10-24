import Head from 'next/head'
// import NavBar from '@/components/Navbar'
// import Used_cars from './home/fetched_cars_divs/used_cars/Used_cars.server'
// import  from './Home/Homepage'
import { Montserrat } from 'next/font/google'

import dynamic from 'next/dynamic'


const Homepage = dynamic(() => import('./home/Homepage'), {
  loading: () => <p>Loading...</p>,
})

// const inter = Montserrat({
//   variable: '--font-monteserrat',
// })


export default function Home() {
  return (
    
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    {/* <NavBar/> */}
    <Homepage/>
    {/* <Used_cars/> */}

    </>
  )
}
