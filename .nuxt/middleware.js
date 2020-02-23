const middleware = {}

middleware['client-close-confirm'] = require('..\\middleware\\client-close-confirm.js')
middleware['client-close-confirm'] = middleware['client-close-confirm'].default || middleware['client-close-confirm']

middleware['client-init-auth'] = require('..\\middleware\\client-init-auth.js')
middleware['client-init-auth'] = middleware['client-init-auth'].default || middleware['client-init-auth']

middleware['server-client-auth'] = require('..\\middleware\\server-client-auth.js')
middleware['server-client-auth'] = middleware['server-client-auth'].default || middleware['server-client-auth']

middleware['server-client-edit-permission'] = require('..\\middleware\\server-client-edit-permission.js')
middleware['server-client-edit-permission'] = middleware['server-client-edit-permission'].default || middleware['server-client-edit-permission']

middleware['server-client-view-permission'] = require('..\\middleware\\server-client-view-permission.js')
middleware['server-client-view-permission'] = middleware['server-client-view-permission'].default || middleware['server-client-view-permission']

export default middleware
