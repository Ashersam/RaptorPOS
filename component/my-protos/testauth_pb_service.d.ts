// package: ngo.auth.v1
// file: testauth.proto

import * as testauth_pb from "./testauth_pb";
import {grpc} from "@improbable-eng/grpc-web";

type NgoAuthloginUser = {
  readonly methodName: string;
  readonly service: typeof NgoAuth;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof testauth_pb.LoginUserRequest;
  readonly responseType: typeof testauth_pb.LoginUserResponse;
};

export class NgoAuth {
  static readonly serviceName: string;
  static readonly loginUser: NgoAuthloginUser;
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

export class NgoAuthClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  loginUser(
    requestMessage: testauth_pb.LoginUserRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: testauth_pb.LoginUserResponse|null) => void
  ): UnaryResponse;
  loginUser(
    requestMessage: testauth_pb.LoginUserRequest,
    callback: (error: ServiceError|null, responseMessage: testauth_pb.LoginUserResponse|null) => void
  ): UnaryResponse;
}

