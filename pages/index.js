import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState, useRef} from 'react'
import Layout from '../components/Layout/Layout'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PaginatedItems from '../components/Product/Product';
import Footer from '../components/Footer/IntroduceInfo.js'
import config from '/public/config.json'
import {readData, readDataBySearch} from '/public/store/ProductState'
import {useSelector, useDispatch} from 'react-redux';


export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Tambolu</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet"/>
      </Head>

      <main className={styles.main}>
       
        <Layout/>
        <div className="products-container">
         
          <PaginatedItems/>
          
        </div>
        <Footer/>
        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
