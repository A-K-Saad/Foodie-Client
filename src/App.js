import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound/NotFound";
import AuthProvider from "./Contexts/AuthProvider";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import "./App.css";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CartCanvas from "./components/CartCanvas/CartCanvas";
import { useState } from "react";
import Checkout from "./pages/Checkout/Checkout";
import Products from "./pages/Products/Products";
const App = () => {
  const FullContainer = ({ children }) => {
    return (
      <>
        <Navbar></Navbar>
        <CartCanvas cartUpdate={cartUpdate}></CartCanvas>
        {children}
        <Footer></Footer>
      </>
    );
  };
  const [cartUpdate, setCartUpdate] = useState(0);
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <FullContainer>
                  <Home></Home>
                </FullContainer>
              </Route>
              <Route exact path="/login">
                <FullContainer>
                  <Login></Login>
                </FullContainer>
              </Route>
              <Route exact path="/signup">
                <FullContainer>
                  <Signup></Signup>
                </FullContainer>
              </Route>
              <Route exact path="/products">
                <FullContainer>
                  <Products></Products>
                </FullContainer>
              </Route>
              <Route exact path="/products/:productId">
                <FullContainer>
                  <ProductDetails
                    setCartUpdate={setCartUpdate}
                  ></ProductDetails>
                </FullContainer>
              </Route>
              <Route exact path="/checkout">
                <Navbar></Navbar>
                <Checkout cartUpdate={cartUpdate}></Checkout>
                <Footer></Footer>
              </Route>
              <Route path="/dashboard">
                <Dashboard></Dashboard>
              </Route>
              <Route path="*">
                <FullContainer>
                  <NotFound></NotFound>
                </FullContainer>
              </Route>
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
