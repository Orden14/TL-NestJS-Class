import { type RouteConfig, index, route } from "@react-router/dev/routes";

const isAuthenticated = () => false;

export default [
    index("pages/Home.tsx"),
    route("login", "pages/Login.tsx"),
    route("register", "pages/Register.tsx"),
    route("logout", "pages/Logout.tsx"),
    route("bookings", "pages/MyBookings.tsx"),
] satisfies RouteConfig;
