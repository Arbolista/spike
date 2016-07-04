export default class BaseApi {

  delayResolve(data, delay){
    delay = delay || 400; // ms
    return new Promise((fnResolve, fnReject)=>{
      setTimeout(()=>{
        fnResolve(data);
      }, delay);
    })
  }

}
