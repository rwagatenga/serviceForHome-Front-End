/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import RoomServiceIcon from '@material-ui/icons/RoomService';
import ViewListIcon from '@material-ui/icons/ViewList';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import AddService from "views/AddService/AddService.js";
import ViewServices from "views/ViewServices/ViewServices.js";
import ViewOrders from "views/ViewOrders/ViewOrders.js";
import ViewBids from "views/ViewBids/ViewBids.js";
import Cart from "views/Cart/Cart.js";
import OrderService from "views/OrderService/OrderService.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/addservices",
    name: "Add Services",
    rtlName: "Ongeramo Serivisi",
    icon: RoomServiceIcon,
    component: AddService,
    layout: "/admin"
  },
   {
    path: "/viewservices",
    name: "View Services",
    rtlName: "Reba Serivisi",
    icon: RoomServiceIcon,
    component: ViewServices,
    layout: "/admin"
  },
  {
    path: "/cart",
    name: "Cart",
    rtlName: "Serivise Wahisemo",
    icon: AddShoppingCart,
    component: Cart,
    layout: "/admin"
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  {
    path: "/vieworders",
    name: "View Orders",
    rtlName: "Reba Zatumijwe",
    icon: ViewListIcon,
    component: ViewOrders,
    layout: "/admin"
  },
  // {
  //   path: "/bid",
  //   name: "Bid Service",
  //   rtlName: "Saba Gukora Service",
  //   icon: ShoppingCartIcon,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  {
    path: "/viewbids",
    name: "View Bids",
    rtlName: "Reba Abasabye",
    icon: ViewListIcon,
    component: ViewBids,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "Amerekezo",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "Reba Ubutumwa",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "Imyirondoro",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/kinyarwanda",
    name: "Kinyarwanda",
    rtlName: "Hindura Ururimi",
    icon: Language,
    component: RTLPage,
    layout: "/kinyarwanda"
  },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "Hindura Ururimi",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
