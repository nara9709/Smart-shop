import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllProducts from './components/AllProducts/AllProducts';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import ProductDetail from './components/ProductDetail/ProductDetail';
import MyCart from './components/MyCart/MyCart';
import NewProduct from './components/NewProduct/NewProduct';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          exact
          path="products"
          element={
            <>
              <AllProducts />
            </>
          }
        />
        <Route
          exact
          path="products/:id"
          element={
            <>
              <ProductDetail />
            </>
          }
        />
        <Route
          exact
          path="products/new"
          element={
            <>
              <NewProduct />
            </>
          }
        />
        <Route
          exact
          path="carts"
          element={
            <>
              <MyCart />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
