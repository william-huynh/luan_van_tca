import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import BophankdRoutes from "./BophankdRoutes";
import NotfoundPage from "../components/NotfoundPage";
import Daily1Routes from "./Daily1Routes";
import Daily2Routes from "./Daily2Routes";
import GsvRoutes from "./GsvRoutes";
import HodanRoutes from "./HodanRoutes";
import LoginPage from "../components/pages/LoginPage";
import Detailsuser from "../components/Detailsuser/Detailsuser";
import { useState, useEffect } from "react";
import axios from "axios";

const RouteProvider = () => {
  const [user, setUser] = useState([]);
  useEffect(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/getAll");
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/admin" component={AdminRoutes} />
        <Route path="/bophankd" component={BophankdRoutes} />
        <Route path="/giamsatvung" component={GsvRoutes} />
        <Route path="/daily1" component={Daily1Routes} />
        <Route path="/daily2" component={Daily2Routes} />
        <Route path="/hodan" component={HodanRoutes} />
        {user.map((user) => {
          let path = `/public/details/user/${user._id.toString()}`;
          console.log(path + "" + user.vaitro);
          return (
            <Route
              path={path}
              render={(props) => (
                <Detailsuser
                  {...props}
                  id={user._id.toString()}
                  role={user.vaitro}
                />
              )}
            />
          );
        })}
        <Route path="*" component={NotfoundPage} />
      </Switch>
    </Router>
  );
};

export default RouteProvider;
