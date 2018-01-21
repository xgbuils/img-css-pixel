var StaticServer = require('static-server')

var server = new StaticServer({
    rootPath: '.',
    name: 'my-http-server',
    port: 8080,
    cors: '*'
})

server.start(function() {
    console.log('Server listening to', server.port)
})
