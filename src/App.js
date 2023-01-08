import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';

function App({ auth }) {
  return (
    <>
      <Header auth={auth} />
      <Outlet />
    </>
  );
}

export default App;
