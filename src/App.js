import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AuthProvider from "./Contexts/AuthProvider";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
const App = () => {
  const FullContainer = ({ children }) => {
    return (
      <>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </>
    );
  };
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
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
