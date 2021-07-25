import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import EnergyTechnology from "components/technologies/EnergyTechnology";
import PortfolioViewPage from "routes/PortfolioViewPage";
import PortfolioEditPage from "routes/PortfolioEditPage";
import HomePage from "routes/HomePage";
import LoginPage from "routes/LoginPage";
import LogoutPage from "routes/LogoutPage";
import WorkbookPage from "routes/WorkbookPage";
import CloneChooseWorkbookPage from "routes/CloneChooseWorkbookPage";
import CloneWorkbookPage from "routes/CloneWorkbookPage";
import PostClonePage from "routes/PostClonePage";
import MainPage from "routes/MainPage";
import NotFoundPage from "routes/NotFoundPage";
import { UserContext } from "services/user";
import UserSignupPage from "routes/UserSignupPage";
import UserSignupPageFormik from "routes/UserSignupPageFormik";

const ProtectedRoute = ({ component: Component, ...rest}) => {
  const { user, fetched } = useContext(UserContext);
  const loggedIn = !!user && typeof user === "object" && !!user.id

  return (
    <Route {...rest} render={(props)=> (
      fetched ? (loggedIn ? <Component {...props} /> : <LoginPage />) : <h1>loading........</h1>
    )}/>
  )
};

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <ProtectedRoute
          exact
          path="/workbook/clone"
          component={CloneChooseWorkbookPage}
        />
        <ProtectedRoute exact path="/workbook/:id/clone" component={CloneWorkbookPage} />
        <ProtectedRoute exact path="/workbook/:id" component={PortfolioViewPage} />
        <ProtectedRoute exact path="/workbook/:id/postclone" component={PostClonePage} />
        <ProtectedRoute
          exact
          path="/workbook/:id/portfolio/edit"
          component={PortfolioEditPage}
        />
        {/* TODO refactor :id as :workbookId */}
        <ProtectedRoute
          exact
          path="/workbook/:id/technologies/:technologyId"
          component={EnergyTechnology}
        />
        <Route exact path="/login" component={LoginPage} />
        <ProtectedRoute exact path="/workbooks" component={WorkbookPage} />
        <ProtectedRoute exact path="/signup" component={UserSignupPageFormik} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/auth/:provider" component={MainPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
