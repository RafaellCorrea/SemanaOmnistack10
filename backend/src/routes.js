const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

//Tipos de Parametros:

//Query Params: request.query (Filtros, ordenação, paginação, ...)
//Route Params: request.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para criação ou alteração de um registro)


routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/dev/:id/update', DevController.update);
routes.delete('/dev/:id/delete', DevController.delete);

routes.get('/search', SearchController.index);

module.exports = routes;