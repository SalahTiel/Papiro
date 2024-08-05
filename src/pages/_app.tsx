import type { AppProps } from "next/app";
import '../styles/globals.scss'
import {Plus_Jakarta_Sans} from "next/font/google"

const mainFont = Plus_Jakarta_Sans({
  weight: ['400', '700'],
  subsets: ['latin']
})


export default function App({ Component, pageProps }: AppProps) {
  return(
  <>
    <style jsx global>{`
      html{
        font-family: ${mainFont.style.fontFamily}
      }
    `}
    </style>
    <Component {...pageProps} />;
  </>
  )
}
