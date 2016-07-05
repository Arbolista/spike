/*global describe it expect*/

export function testSharedRouteBehavior(route){

  describe('shared Route behavior', ()=>{

    it('has a name', ()=>{
      expect(typeof route.route_name).toEqual('string');
    });

  });

}
