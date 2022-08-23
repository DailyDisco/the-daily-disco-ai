import Script from 'next/script';
// import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes'; // packages here

// import , Cart, Loader, Auth later when needed
import { Navbar, Footer } from '../components'; // internal components here
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider attribute="class">
    <div className="dark:bg-nft-dark bg-white min-h-screen">
      {/* <Auth /> */}
      <Navbar />
      {/* <Cart /> */}
      {/* this next line is to divide the navigation bar from the rest of the page */}
      <div className="pt-65">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
    <Script src="https://kit.fontawesome.com/2437c99726.js" crossorigin="anonymous" />
  </ThemeProvider>
);

export default MyApp;
