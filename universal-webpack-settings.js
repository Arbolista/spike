GLOBAL.NODE_ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


module.exports = 
{
    server:
    {
        input: './run-dev.js',
        output: `./build/development/server.js`
    }
}