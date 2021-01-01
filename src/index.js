/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import LoginForm from './views/LoginForm';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { createStore,applyMiddleware,compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {getFirebase,reactReduxFirebase,ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from './config/fbconfig';

const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({ getFirebase }))
);

const rrfProps = {
  firebase,
  config: {
    userProfile: "users",
    useFirestoreForProfile: true,
    updateProfileOnLogin: false
  },
  dispatch: store.dispatch,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <ThemeContextWrapper>
        <BackgroundColorWrapper>
          <BrowserRouter>
            <Switch>
              <Route path="/admin" render={(props) => <AdminLayout {...props} /> } />
              <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
              <Route path="/login" component={ LoginForm } />
              <Redirect from="/" to="/admin/dashboard" />
            </Switch>
          </BrowserRouter>
        </BackgroundColorWrapper>
      </ThemeContextWrapper>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
