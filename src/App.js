import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';

const Shop = () => {
  return <h1>I am a shop page</h1>;
};

const Other = () => {
  return <h1>I am the other page</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />}>
        <Route path='shop' element={<Shop />} />
        {/* /home/shop */}
        <Route path='other' element={<Other />} />
        {/* /home/other */}
      </Route>
    </Routes>
  );
};

export default App;
