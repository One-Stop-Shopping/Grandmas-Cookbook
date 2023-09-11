import scrapingController from '../server/controller/scrapingController';

describe('Test scrapingController middleware', () => {
  it('should return error if the passed in URL is invalid', async () => {
    const req = { query: { url: 'https://invalid.com' } };
    const res = { locals: {} };
    const next = jest.fn();

    await scrapingController(req, res, next);
    expect(next.mock.calls).toHaveLength(1);
    expect(next.mock.calls[0][0]).toEqual({
      log: 'Error encountered in scrapingController. Requested URL is not supported by this app.',
      status: 406,
      message: 'Requested URL is not supported by this app.',
    });
  });

  it('should be able to scrape information from www.epicurious.com', async () => {
    const req = {
      query: {
        url: 'https://www.epicurious.com/recipes/food/views/best-lemon-meringue-pie',
      },
    };
    const res = {
      locals: {
        title: undefined,
        ingredientList: [],
        directions: [],
      },
    };
    const next = jest.fn();

    await scrapingController(req, res, next);

    expect(res.locals.title).toEqual('Lemon Meringue Pie');
    expect(res.locals.ingredientList.length).toBeGreaterThan(0);
    expect(
      res.locals.ingredientList.every((el: any) => typeof el === 'string')
    ).toBe(true);
    expect(res.locals.directions.length).toBeGreaterThan(0);
    expect(
      res.locals.directions.every((el: any) => typeof el === 'string')
    ).toBe(true);
  });

  it('should be able to scrape information from www.foodnetwork.com', async () => {
    const req = {
      query: {
        url: 'https://www.foodnetwork.com/recipes/food-network-kitchen/healthy-spicy-steamed-baby-bok-choy-recipe-2107028',
      },
    };
    const res = {
      locals: {
        title: undefined,
        ingredientList: [],
        directions: [],
      },
    };
    const next = jest.fn();

    await scrapingController(req, res, next);

    expect(res.locals.title).toEqual('Healthy Spicy Steamed Baby Bok Choy');
    expect(res.locals.ingredientList.length).toBeGreaterThan(0);
    expect(
      res.locals.ingredientList.every((el: any) => typeof el === 'string')
    ).toBe(true);
    expect(res.locals.directions.length).toBeGreaterThan(0);
    expect(
      res.locals.directions.every((el: any) => typeof el === 'string')
    ).toBe(true);
  });
});
