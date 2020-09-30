import React from "react";
import HomePage from '../pages/home/HomePage/HomePage'
import WelcomePage from '../pages/home/WelcomePage/WelcomePage'
import LoginPage from '../pages/auth/LoginPage/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage/RegisterPage'
import AboutPage from "../pages/home/AboutPage/AboutPage";
import AuthRoute from "./AuthRoute";
import GuestRoute from "./GuestRoute";
import {Route} from "react-router-dom";
import Logout from "../components/auth/Logout";
import ArticlePage from "../pages/article/ArticlePage/ArticlePage";
import NoFound from "../components/error/NotFound";

const routes =  [
    {
        path: '/',
        component: HomePage,
        title: "HomePage",
        requiresAuth: true,
    },
    {
        path: '/article/:id',
        component: ArticlePage,
        title: "ArticlePage",
        requiresAuth: true,
    },
    {
        path: '/welcome',
        component: WelcomePage,
        title: "WelcomePage",
        requiresAuth: false,
    },
    {
        path: '/about',
        component: AboutPage,
        title: "AboutPage",
        requiresAuth: false,
    },
    {
        path: "/login",
        component: LoginPage,
        title: "LoginPage",
        isGuest: true,
    },
    {
        path: "/register",
        component: RegisterPage,
        title: "RegisterPage",
        isGuest: true,
    },
    {
        path: '/logout',
        component: Logout,
        title: "Logout",
        requiresAuth: true,
    },
    {
        path: '*',
        component: NoFound,
        title: "NoFound",
    },
];

export default routes;

export function RouteRenderer({route}) {
    if (route.requiresAuth) {
        return <AuthRoute {...route}/>
    } else {
        if (route.isGuest) {

            return <GuestRoute {...route} exact/>
        } else {
            return <Route {...route} exact/>
        }
    }
}


