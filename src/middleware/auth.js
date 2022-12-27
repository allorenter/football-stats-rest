const { API_KEY } = process.env;

function auth(req, res, next) {
  const valid = req.headers.API_KEY === API_KEY;

  if (valid) {
    return next();
  }

  return res.status(401).json({
    message: 'auth error',
  });
}

export default auth;
