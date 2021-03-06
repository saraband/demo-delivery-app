export const addParamsToUrl = (url, params) => {
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });

  return url;
};

export default {
  TEST: '/test',
  ROOT: '/',
  HOME: '/list/all',
  RESTAURANTS_LIST: '/list/:city',
  RESTAURANT_DETAILS: '/:city/restaurant/:id',
  RESTAURANT_CHECKOUT: '/restaurant/:id/checkout',
  NOT_FOUND_404: '/404'
};
