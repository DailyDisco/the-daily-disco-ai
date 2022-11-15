import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { Navbar, Footer } from '../components';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider attribute="class">
    <div className="dark:bg-nft-dark bg-white min-h-screen">
      <Navbar />
      {/* this next line is to divide the navigation bar from the rest of the page */}
      <div className="pt-65">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
    <Script
      src="https://kit.fontawesome.com/2437c99726.js"
      crossorigin="anonymous"
    />
  </ThemeProvider>
);

export default MyApp;
