import './App.scss';
import TitleBar from './Homepage/TitleBar';
import Footer from './Homepage/Footer';
import {Helmet} from 'react-helmet';

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet='utf-8' />
      </Helmet>
      <TitleBar />
      <Footer />
    </div>
  );
}

export default App;
