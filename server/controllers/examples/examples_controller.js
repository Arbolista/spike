const NAME = 'Examples';

class ExamplesController{

  static index(req, res){
    res.json({data: [
        {id: 1, name: 'howdy'},
        {id: 2, name: 'ho'}
      ]});
  }

}

Examples.NAME = NAME;
module.exports = ExamplesController;
