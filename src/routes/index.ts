import express from 'express'
import { userRoute } from './user.route';
import path from 'node:path';
import { productRoute } from './products.route';
import { cartRoute } from './cart.route';
import { orderRoute } from './order.route';
import { wishroute } from './wishlist.route';
import { dashboardRoute } from './dashboard.route';
import { profileRoute } from './profile.route';


const router = express.Router();

const moduleRoute = [
    {
    path: '/users',
    route: userRoute,
    },

    {
        path: '/product',
        route: productRoute,
    },

    {
        path: '/cart',
        route: cartRoute,
    },

    {
        path: '/order',
        route: orderRoute,
    },

    {
        path : '/wishlist',
        route : wishroute
    },

    {
        path : '/dashboard',
        route : dashboardRoute
    },

    {
        path : '/profile',
        route : profileRoute,
    }

];

moduleRoute.forEach((route) => router.use(route.path, route.route));
export default router;      