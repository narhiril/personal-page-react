import './App.scss';
import { Helmet } from 'react-helmet';
import ViewWrapper from './Shared/UI/ViewWrapper';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Roxanna Rusbarsky</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet='utf-8' />
      </Helmet>
        <ViewWrapper />
    </div>
  );
}

export default App;
