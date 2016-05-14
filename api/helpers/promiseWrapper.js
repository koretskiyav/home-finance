import Exception from './Exception';

export default route => async (req, res, next) => {
  try {
    const data = await route(req, res, () => 'next');
    if (data === 'next') return next();

    data.status = 1;
    return res.send(data);
  } catch (error) {
    if (error instanceof Exception) {
      return res.send({
        status: 0,
        error: error.toHash(),
      });
    }
    console.error('REQUEST URL ', req.url);
    console.error('REQUEST PARAMS: ', req.params);
    console.error('REQUEST BODY: ', req.body);
    console.error('ERROR: ', error.stack);
    console.error('-------------------');

    return res.send({
      status: 0,
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'Please, contact your system administartor!',
      },
    });
  }
};
