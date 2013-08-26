/**
 * Created with JetBrains WebStorm.
 * User: Valerio Gheri
 * Date: 17/03/13
 * Time: 18.11
 * To change this template use File | Settings | File Templates.
 */
function setup(app, services) {
	app.get('/messages', services.metadata.GetAllMetadata);
	app.get('/message/:id', services.metadata.GetMetadataByMessage);
	app.post('/message/:id/:hiker', services.metadata.CreateMetadata);
	app.put('/message/:id/:hiker', services.metadata.UpdateMetadata);
	app.del('/message/:id', services.metadata.DeleteMetadata);
}

exports.setup = setup;
