const {app, port} = require('./app');

const main = () => {
    app.listen(port);
    console.log('listening on port ' + port);
}

main();