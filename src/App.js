import './App.scss';
import Navbar from './Shared/Navbar';
import TitleBar from './Homepage/TitleBar';
import Footer from './Shared/Footer';
import {Helmet} from 'react-helmet';

function App() {
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
