var exports = (module.exports = {});
var _ = require("lodash");
var unirest = require("unirest");
var jwt = require("jsonwebtoken");
const config = require(process.cwd() + "/config/config.json");

exports.get = {
  location: (req, res) => {
    console.log("HERE");
    var ip = req.headers["x-forwarded-for"] || req.ip;
    var ips = ip.split(":");

    ip = ips[ips.length - 1];
    GetLocation(ip)
      .then(parseLocationData)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
};

function GetLocation(ip) {
  return new Promise((resolve, reject) => {
    var access_token = process.env.IP_TOKEN || config.IP_TOKEN;
    unirest
      .get("http://api.ipstack.com/" + ip + "?access_key=" + access_token)
      .headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
      .end(
        response => {
          if (response.status == 200) {
            resolve(response.body);
          } else {
            reject({
              error: true,
              message: "Ip server error",
              data: response.body
            });
          }
        },
        error => {
          console.log(error);
          reject({
            error: true,
            message: "Ip server error",
            data: error
          });
        }
      );
  });
}

function parseLocationData(data) {
  return new Promise((resolve, reject) => {
    data = _.pick(data, [
      "country_name",
      "country_code",
      "city",
      "zip",
      "latitude",
      "longitude"
    ]);
    resolve(data);
  });
}
