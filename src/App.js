import './App.scss';
import Navbar from './Shared/Navbar';
import TitleBar from './Homepage/TitleBar';
import Footer from './Shared/Footer';
import {Helmet} from 'react-helmet';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const themeScript = document.createElement("script");
    themeScript.src = "./Scripts/themes.js";
    themeScript.defer = true;
    document.body.append(themeScript);
  }, []);
  return (
    <div className="App">
      <Helmet>
        <title>Roxanna Rusbarsky</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet='utf-8' />
      </Helmet>
      <Navbar />
      <TitleBar />
      <Footer />
    </div>
  );
}

export default App;
