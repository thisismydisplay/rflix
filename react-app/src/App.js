import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import SignUpFormPage from './components/SignUpFormPage';
import { authenticate } from './store/session';
import Footer from './components/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Error404Page from './components/Error404Page';
import BrowsePage from './components/BrowsePage';
import NavBar from './components/NavBar/index.js';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user)
  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

return (

  <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact>
          {sessionUser ? <Redirect to="/browse" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login" exact={true}>
        {sessionUser ? <Redirect to="/browse" /> : <LoginFormPage />}
          {/* <LoginFormPage /> */}
        </Route>
        <Route path="/sign-up" exact={true}>
        {sessionUser ? <Redirect to="/browse" /> : <SignUpFormPage />}

        </Route>
        <ProtectedRoute path='/browse' exact>
          <BrowsePage />
        </ProtectedRoute>
        <Route path=''>
          <Error404Page />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
)

}

export default App;
