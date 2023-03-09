import './App.scss';
import Navbar from './Shared/UI/Navbar';
import TitleBar from './Homepage/TitleBar';
import Footer from './Shared/UI/Footer';
import {Helmet} from 'react-helmet';
import EducationPanel from './Homepage/EducationPanel';

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
        <EducationPanel />
      <Footer />
    </div>
  );
}

export default App;
