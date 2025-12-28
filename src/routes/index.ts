import express, { Router } from 'express';
import adminRoutes from './AdminRoutes';

const mainRoute: Router = express.Router();

mainRoute.use('/admin', adminRoutes);

export default mainRoute;
