import express from 'express'
import { userRoute } from './user.route';
import path from 'node:path';
import { productRoute } from './products.route';

const router = express.Router();

const moduleRoute = [
    {
    path: '/users',
    route: userRoute,
    },

    {
        path: '/product',
        route: productRoute,
    }
];

moduleRoute.forEach((route) => router.use(route.path, route.route));
export default router;