import './App.scss';
import {Helmet} from 'react-helmet';

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet='utf-8' />
      </Helmet>
      <div className='title'>
        <h1>Roxanna Rusbarsky</h1>
        <p>Web Developer</p>
      </div>
    </div>
  );
}

export default App;
