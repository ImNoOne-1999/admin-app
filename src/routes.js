import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import TableList from "views/TableList.js";
import UserProfile from "views/UserProfile.js";
import UserProfileForm from "views/UserProfileForm.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  
  {
    path: "/classes",
    name: "Classes",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Create User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfileForm,
    layout: "/admin",
  },
  {
    path: "/create-class",
    name: "Create Class",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/edit-user-profile/:id",
    component: UserProfile,
    layout: "/admin",
  },
];
export default routes;
