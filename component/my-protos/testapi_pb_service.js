// package: ngoapi
// file: testapi.proto

var testapi_pb = require("./testapi_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var NgoAPI = (function () {
  function NgoAPI() {}
  NgoAPI.serviceName = "ngoapi.NgoAPI";
  return NgoAPI;
}());

NgoAPI.streamEvents = {
  methodName: "streamEvents",
  service: NgoAPI,
  requestStream: false,
  responseStream: true,
  requestType: testapi_pb.StreamEventsRequest,
  responseType: testapi_pb.StreamEventsResponse
};

exports.NgoAPI = NgoAPI;

function NgoAPIClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

NgoAPIClient.prototype.streamEvents = function streamEvents(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(NgoAPI.streamEvents, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.NgoAPIClient = NgoAPIClient;

