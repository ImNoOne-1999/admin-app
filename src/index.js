import React from "react";
import ReactDOM from "react-dom";
import LoginForm from './views/LoginForm';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin/Admin.js";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { createStore,applyMiddleware,compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import {Provider,useSelector} from 'react-redux';
import thunk from 'redux-thunk';
import {getFirebase,isLoaded,ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from './config/fbconfig';

const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({ getFirebase }))
);

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div></div>;
      return children
}

const rrfProps = {
  firebase,
  config: {
    userProfile: "users",
    useFirestoreForProfile: true,
    attachAuthIsReady: true,
    updateProfileOnLogin: false
  },
  dispatch: store.dispatch,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
    <AuthIsLoaded>
      <ThemeContextWrapper>
        <BackgroundColorWrapper>
          <BrowserRouter>
            <Switch>
              <Route path="/admin" render={(props) => <AdminLayout {...props} /> } />
              <Route path="/login" component={ LoginForm } />
              <Redirect from="/" to="/admin/dashboard" />
            </Switch>
          </BrowserRouter>
        </BackgroundColorWrapper>
      </ThemeContextWrapper>
    </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root"),
  
);
