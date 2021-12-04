// package: ngoapi
// file: testapi.proto

import * as testapi_pb from "./testapi_pb";
import {grpc} from "@improbable-eng/grpc-web";

type NgoAPIstreamEvents = {
  readonly methodName: string;
  readonly service: typeof NgoAPI;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof testapi_pb.StreamEventsRequest;
  readonly responseType: typeof testapi_pb.StreamEventsResponse;
};

export class NgoAPI {
  static readonly serviceName: string;
  static readonly streamEvents: NgoAPIstreamEvents;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class NgoAPIClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  streamEvents(requestMessage: testapi_pb.StreamEventsRequest, metadata?: grpc.Metadata): ResponseStream<testapi_pb.StreamEventsResponse>;
}

