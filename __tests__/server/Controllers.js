import nodeController from '../../server/restAPI/controller/nodeController.js';
import podController from '../../server/restAPI/controller/podController.js';
// skip the namespace controller as it is currently not in use

describe('nodeController tests', () => {
  // initialize next to be a function that solely ends the middleware,
  // the req/res objects should still persist in the local memory of the 'it' statement
  // thus we don't need the normal full express specific next() functionality
  // will test that with supertest
  const next = () => undefined;
  let req;
  let res;
  // resert the req and res objects before each test
  beforeEach(() => {
    req = { body: {} };
    res = { locals: {} };
  });

  describe('getNodeMetrics', () => {
    it('should have something on res.locals.nodeMetrics', async () => {
      await nodeController.getNodeMetrics(req, res, next);
      expect(res.locals.nodeMetrics).toBeTruthy();
    });
    it('res.locals.nodes has the expected data form', async () => {
      await nodeController.getNodeMetrics(req, res, next);
      const responseJSON = res.locals.nodeMetrics.response.toJSON();
      expect(responseJSON).toHaveProperty('body');
      expect(responseJSON.body).toHaveProperty('items');
      expect(Array.isArray(responseJSON.body.items)).toBeTruthy();
    });
  });
});
