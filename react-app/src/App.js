import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import SignUpFormPage from './components/SignUpFormPage';
import { authenticate } from './store/session';
import Footer from './components/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Error404Page from './components/Error404Page';
import BrowsePage from './components/BrowsePage';
import NavBar from './components/NavBar/index.js';
import ProfileSelectPage from './components/ProfileSelectPage';
import ProfileAddPage from './components/ProfileAddPage';
import { getProfiles, selectProfile } from './store/profile';
import ProfileManageSelectPage from './components/ProfileManageSelectPage';
import ProfileEditPage from './components/ProfileEditPage';
import ProfileDeletePage from './components/ProfileDeletePage';
import ProfileUploadImagePage from './components/ProfileUploadImagePage';
// const getProfilesList = (profiles) => {
//   const profilesArr = Object.entries(profiles);
//   let idx;
//   for (let i = 0; i < profilesArr.length; i++) {
//     if (profilesArr[i][0] === 'currentProfile') {
//       idx = i;
//     }
//   }
//   profilesArr.splice(idx, 1);
//   console.log(profilesArr)
//   return profilesArr;
// }

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const store = useStore();
    //   const profiles = useSelector((state) => state.profile.profiles);
    const currentProfile = useSelector((state)=> selectProfile(state.profile))

    // const userId = sessionUser.id cant do this here bc sessionUser is null

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            const userId = store.getState().session.user?.id;
            if (userId) {
                await dispatch(getProfiles(userId));
            }
            setLoaded(true);
        })();
    }, [dispatch, store]);
    //   useEffect(() => {
    //     (async () => {
    //       await dispatch(authenticate());
    //       await dispatch(getProfiles())
    //       setLoaded(true);
    //     })();
    //   }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            {/* <div className='content-wrap'> */}
            <NavBar profile={currentProfile} sessionUser={sessionUser}/>
            <main className='main-content'>
                <Switch>
                    <Route path='/' exact>
                        {sessionUser ? (
                            <Redirect to='/browse' />
                        ) : (
                            <Redirect to='/login' />
                        )}
                    </Route>
                    <Route path='/login' exact={true}>
                        {sessionUser ? (
                            <Redirect to='/profile' />
                        ) : (
                            <LoginFormPage />
                        )}
                        {/* <LoginFormPage /> */}
                    </Route>
                    <Route path='/sign-up' exact={true}>
                        {sessionUser ? (
                            <Redirect to='/profile' />
                        ) : (
                            <SignUpFormPage />
                        )}
                    </Route>
                    <ProtectedRoute path='/profile/add' exact>
                        <ProfileAddPage user = {sessionUser} />
                    </ProtectedRoute>
                    <ProtectedRoute path='/profile/delete/:id' exact>
                        <ProfileDeletePage currentProfile={currentProfile} />
                    </ProtectedRoute>
                    <ProtectedRoute path='/profile/manage/:id/image' exact>
                        <ProfileUploadImagePage currentProfile={currentProfile} />
                    </ProtectedRoute>
                    <ProtectedRoute path='/profile/manage/:id' exact>
                        <ProfileEditPage currentProfile={currentProfile} />
                    </ProtectedRoute>
                    <ProtectedRoute path='/profile/manage' exact>
                        <ProfileManageSelectPage user={sessionUser} />
                    </ProtectedRoute>
                    {/* <ProtectedRoute path='/profile/delete' exact>
                        <ProfileDeletePage currentProfile={currentProfile} />
                    </ProtectedRoute> */}
                    <ProtectedRoute path='/profile' exact>
                        <ProfileSelectPage user={sessionUser} />
                    </ProtectedRoute>
                    <ProtectedRoute path='/browse' exact>
                        <BrowsePage />
                    </ProtectedRoute>
                    <Route path=''>
                        <Error404Page />
                    </Route>
                </Switch>
            </main>
            {/* </div> */}
            <Footer />
        </BrowserRouter>
    );
}

export default App;
