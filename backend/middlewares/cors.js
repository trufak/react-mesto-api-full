// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://localhost:3000',
  'https://mesto.trufakin.nomoredomains.club',
];

module.exports = (req, res, next) => {
  /* res.header('Access-Control-Allow-Origin', '*'); */
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};
