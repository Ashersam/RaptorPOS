// package: ngo.auth.v1
// file: testauth.proto

var testauth_pb = require("./testauth_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var NgoAuth = (function () {
  function NgoAuth() {}
  NgoAuth.serviceName = "ngo.auth.v1.NgoAuth";
  return NgoAuth;
}());

NgoAuth.loginUser = {
  methodName: "loginUser",
  service: NgoAuth,
  requestStream: false,
  responseStream: false,
  requestType: testauth_pb.LoginUserRequest,
  responseType: testauth_pb.LoginUserResponse
};

exports.NgoAuth = NgoAuth;

function NgoAuthClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

NgoAuthClient.prototype.loginUser = function loginUser(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(NgoAuth.loginUser, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.NgoAuthClient = NgoAuthClient;

