import { Router } from 'express';
import UserController from './app/controllers/UserController';
import ConfigServerController from './app/controllers/ConfigServerController';
import SessionController from './app/controllers/SessionController';
import ListConfigController from './app/controllers/ListConfigController';
import ListUserInProject from './app/controllers/ListUserInProjectController';
import DataConfiguration from './app/controllers/DataConfigurationController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users/:id', UserController.update);
routes.put('/config/:id', ConfigServerController.update);
routes.post('/config', ConfigServerController.store);
routes.get('/listProjects', ListConfigController.index);
routes.get('/detailProject/:id', DataConfiguration.index);
routes.get('/userInProject/:id', ListUserInProject.index);
routes.delete('/user/:id', UserController.delete);

export default routes;
