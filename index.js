const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
var ip6 = 0;
var ip5 = 0;
var ip4 = 0;
var ip3 = 0;
var ip2 = 0;
var ip1 = 0;
var ip0 = 0;
var a = 0;
var b = 1;
var e = 0;
app.post("/bisection", (req, res) => {
  ip6 = parseInt(req.body.ip6, 10);
  ip5 = parseInt(req.body.ip5, 10);
  ip4 = parseInt(req.body.ip4, 10);
  ip3 = parseInt(req.body.ip3, 10);
  ip2 = parseInt(req.body.ip2, 10);
  ip1 = parseInt(req.body.ip1, 10);
  ip0 = parseInt(req.body.ip0, 10);
  a = parseInt(req.body.a, 10);
  b = parseInt(req.body.b, 10);
  e = parseInt(req.body.e, 10);
  let k = [ip6, ip5, ip4, ip3, ip2, ip1, ip0];
  if (f(a, k) * f(b, k) > 0) {
    res.send(
      "Ошибка! Значения функции на концах отрезка [" +
      a +
      ";" +
      b +
      "] должны быть противоположны"
    );
  } else if (f(a, k) == 0) {
    res.send(
    "Решение уравнения методом половинного деления на отрезке [" +
      a +
      ";" +
      b +
      "]: " +
      a
  );
  } else if (f(b, k) == 0) {
    res.send(
      "Решение уравнения методом половинного деления на отрезке [" +
        a +
        ";" +
        b +
        "]: " +
        b
    );
  } else {
    res.send(
      "Решение уравнения методом половинного деления на отрезке [" +
        a +
        ";" +
        b +
        "]: " +
        bisection(a, b, e, k)
    );
  }
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});

function f(x, k) {
  var f = 0;
  f =
    k[0] * Math.pow(x, 6) +
    k[1] * Math.pow(x, 5) +
    k[2] * Math.pow(x, 4) +
    k[3] * Math.pow(x, 3) +
    k[4] * Math.pow(x, 2) +
    k[5] * x +
    k[6];
  return f;
}

function bisection(a, b, e, k) {
  var c;
  while (Math.abs(b - a) > e) {
    c = (a + b) / 2;
    if (f(a, k) * f(c, k) <= 0) b = c;
    else a = c;
  }
  return c;
}
