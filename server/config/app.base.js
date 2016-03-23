import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';

class AppBase {

  static config(app){

    app.app.use(favicon(__dirname + '/public/favicon.ico'));
    app.app.use(logger('dev'));

    // serve public static files.
    app.app.use('/', express.static(path.resolve(__dirname, 'public')));

    // view engine set up
    app.app.set('views', path.join(__dirname, 'views'));
    app.app.get("*", (req, res, next)=>{
      res.render("index");
    });

  }

}

export default AppBase;
