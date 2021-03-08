import React from "react";
import HomePage from '../pages/home/HomePage'
import WelcomePage from '../pages/home/WelcomePage'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import AboutPage from "../pages/home/AboutPage";
import Logout from "../components/auth/Logout";
import ArticlePage from "../pages/article/ArticlePage";
import NoFound from "../components/error/NotFound";
import ProfilePage from "../pages/profile/ProfilePage";
import UserArticlesPage from "../pages/profile/UserArticlesPage";
import CreateArticlePage from "../pages/article/CreateArticlePage";
import EditArticlePage from "../pages/article/EditArticlePage";
import RoutedComponent from "./RoutedComponent";
import SearchArticlePage from "../pages/search/SearchArticlesPage";
import SearchUsersPage from "../pages/search/SearchUsersPage";

const routes =  [
    {
        path: '/',
        component: HomePage,
        title: "HomePage",
        requiresAuth: true,
    },
    {
        path: '/article/create',
        component: CreateArticlePage,
        title: "Create Article",
        requiresAuth: true,
    },
    {
        path: '/article/edit/:id',
        component: EditArticlePage,
        title: "Update Article",
        requiresAuth: true,
    },
    {
        path: '/article/:id',
        component: ArticlePage,
        title: "ArticlePage",
        requiresAuth: true,
    },
    {
        path: '/u/:username?',
        component: ProfilePage,
        title: "Profile",
        requiresAuth: true,
    },
    {
        path: '/u/:username/articles',
        component: UserArticlesPage,
        title: "User Articles",
        requiresAuth: true,
    },
    {
        path: '/search/articles',
        component: SearchArticlePage,
        title: "Search Articles",
        requiresAuth: true,
    },
    {
        path: '/search/users',
        component: SearchUsersPage,
        title: "Search People",
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

export {RoutedComponent}
