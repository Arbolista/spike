const MOCK = {
  t: function(key, opts){
    if (!opts) return key;
    return key.replace(/{{([^{}]*)}}/g,
        function (a, b) {
            var r = opts[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
  },
  language: 'en'
}

export default MOCK;
