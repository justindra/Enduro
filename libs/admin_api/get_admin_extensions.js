// * ———————————————————————————————————————————————————————— * //
// * 	get admin extension list
// *
// * 	admin api endpoint admin_api/get_admin_extensions
// *	@return {response} - success boolean and array of .js files to be injected to admin
// * ———————————————————————————————————————————————————————— * //
var api_call = function () {}

// vendor dependencies
var glob = require('glob-promise')
var path = require('path')

// local dependencies
var admin_sessions = require(ENDURO_FOLDER + '/libs/admin_utilities/admin_sessions')

// constants
var extension_path = path.join(CMD_FOLDER, 'assets', 'admin_extensions', '**', '*.js')

// routed call
api_call.prototype.call = function (req, res, enduro_server) {

	admin_sessions.get_user_by_session(req.query.sid)
		.then((user) => {
			return glob(extension_path)
		}, (user) => {
			res.sendStatus(401)
			throw new Error('abort promise chain')
		})
		.then((extensions) => {

			// removes part of absolute path
			var trimmed_extensions = extensions.map((extension) => { return extension.match(/admin_extensions\/(.*)/)[1] })

			res.send({success: true, data: trimmed_extensions})
		}, () => {})
}

module.exports = new api_call()
