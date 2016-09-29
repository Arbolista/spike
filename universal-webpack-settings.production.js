GLOBAL.NODE_ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


module.exports = 
{
    server:
    {
        input: './run-pro.js',
        output: `./build/server/server.js`
    }
}