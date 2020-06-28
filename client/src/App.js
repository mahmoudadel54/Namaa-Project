import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import  Dataentrypublictransport from './layouts/Dataebtrypublictransport'
import Dataentrystormwater from'./layouts/Dataentrystormwater'
import Bar from "./components/Bar";
import VerticalMenu from "./components/VerticalMenu";
import ProjectsMap from "./components/projectsMap";
import LandingPage from "./components/LandingPage";
import UserProject from "./components/userProjects";
import ProjectProfile from "./components/ProjectProfile";
import DecisionMaker from "./layouts/decisionMaker";
import DataEntry from "./layouts/DataEntry";
import Login from "./layouts/Login";
import Admin from "./layouts/Admin.jsx";
import "./index.css";
import ExamplesNavbar from "./components/ExamplesNavbar";
// import ProjectsMap from './components/projectsMap'
import AdminProjects from "./layouts/AdminProjects";
import Footer from "./components/Footer";
import Departments from "./layouts/Departments";
import DataentryCycleway from './layouts/DataentryCycleway';
function App() {
  const [state, setState] = useState({
    columns: [
      { title: "Category", field: "category" },
      { title: "Name", field: "name" },
      { title: "Owner", field: "owner" },
      { title: "Manager", field: "manager" },
      { title: "Status", field: "status" },
      { title: "Start Date", field: "start_date", type: "date" },
      { title: "End Date", field: "end_date", type: "date" },
    ],
    data: [],
    project: [],
  });

  return (
    <BrowserRouter>
      <div className="App">
      <ExamplesNavbar/>
        <Switch>
          <Route path="/dashboard" render={() => <DecisionMaker />} />
          <Route path="/login" render={(props) => <Login {...props} />}></Route>

          {/* render={() => <UserProject></UserProject>}
        /> */}
          <Route exact path="/admin" render={(props) => <Admin />} />
          <Route path="/project/:projectid" component={ProjectProfile} />
          <Route path="/project" render={(props) => <ProjectsMap {...props} />} />
          <Route
            path="/admin/projects"
            render={(props) => (
              <AdminProjects {...props} state={state} setState={setState} />
            )}
          />

          <Route path="/dataEntry" render={() => <DataEntry />} />
          {/* <Route path="/dataEntry/asset/cycleway" render={() => <DataentryCycleway/>} /> */}
          {/* <Route path="/dataEntry/asset/publictransport" render={() => <Dataentrypublictransport/>} /> */}
          {/* <Route path="/dataEntry/asset/stormwater" render={() => <Dataentrystormwater/>} /> */}
          <Route path="/admin/departments" component={Departments} />

          <Route
            path="/"
            render={() => (
              <>
                <LandingPage />
              </>
            )}
          />
        </Switch>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
