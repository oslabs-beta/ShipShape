import nodeController from '../../server/controller/nodeController.js'
import podController from '../../server/controller/podController.js'
//skip the namespace controller as it is currently not in use



describe('nodeController tests', () => {
  //initialize next to be a function that solely ends the middleware, 
  //the req/res objects should still persist in the local memory of the 'it' statement
  //thus we don't need the normal full express specific next() functionality
  //will test that with supertest
  const next = () => undefined;
  let req;
  let res;
  //resert the req and res objects before each test
  beforeEach(() =>{
    req = {body: {}};
    res = {locals: {}};
  })

  describe('getRawNodes', () =>{

    it('should have something on res.locals.nodes', async () =>{
      await nodeController.getNodesRaw(req, res, next);
      // console.log(res.locals.nodes);
      expect(res.locals.nodes).toBeTruthy();
    })
    it('res.locals.nodes has the expected data form', async () => {
      await nodeController.getNodesRaw(req, res, next);
      console.log(res.locals);
      const responseJSON = res.locals.nodes.response.toJSON()
      expect(responseJSON).toHaveProperty('body');
      expect(responseJSON.body).toHaveProperty('items')
      expect(Array.isArray(responseJSON.body.items)).toBeTruthy();
    })
  })

})