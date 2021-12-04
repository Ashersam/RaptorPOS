// package: ngoapi
// file: testapi.proto

import * as jspb from "google-protobuf";

export class UUID extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UUID.AsObject;
  static toObject(includeInstance: boolean, msg: UUID): UUID.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UUID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UUID;
  static deserializeBinaryFromReader(message: UUID, reader: jspb.BinaryReader): UUID;
}

export namespace UUID {
  export type AsObject = {
    uuid: string,
  }
}

export class StreamEventsRequest extends jspb.Message {
  hasTenantid(): boolean;
  clearTenantid(): void;
  getTenantid(): UUID | undefined;
  setTenantid(value?: UUID): void;

  getEventtype(): string;
  setEventtype(value: string): void;

  clearEventsubtypeList(): void;
  getEventsubtypeList(): Array<string>;
  setEventsubtypeList(value: Array<string>): void;
  addEventsubtype(value: string, index?: number): string;

  clearEventactionList(): void;
  getEventactionList(): Array<string>;
  setEventactionList(value: Array<string>): void;
  addEventaction(value: string, index?: number): string;

  getLastindex(): string;
  setLastindex(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamEventsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StreamEventsRequest): StreamEventsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StreamEventsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamEventsRequest;
  static deserializeBinaryFromReader(message: StreamEventsRequest, reader: jspb.BinaryReader): StreamEventsRequest;
}

export namespace StreamEventsRequest {
  export type AsObject = {
    tenantid?: UUID.AsObject,
    eventtype: string,
    eventsubtypeList: Array<string>,
    eventactionList: Array<string>,
    lastindex: string,
  }
}

export class EventTuple extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventTuple.AsObject;
  static toObject(includeInstance: boolean, msg: EventTuple): EventTuple.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventTuple, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventTuple;
  static deserializeBinaryFromReader(message: EventTuple, reader: jspb.BinaryReader): EventTuple;
}

export namespace EventTuple {
  export type AsObject = {
    key: string,
    value: string,
  }
}

export class StreamEventsResponse extends jspb.Message {
  getIndex(): string;
  setIndex(value: string): void;

  getEventtype(): string;
  setEventtype(value: string): void;

  getEventaction(): string;
  setEventaction(value: string): void;

  clearEventtupleList(): void;
  getEventtupleList(): Array<EventTuple>;
  setEventtupleList(value: Array<EventTuple>): void;
  addEventtuple(value?: EventTuple, index?: number): EventTuple;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamEventsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StreamEventsResponse): StreamEventsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StreamEventsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamEventsResponse;
  static deserializeBinaryFromReader(message: StreamEventsResponse, reader: jspb.BinaryReader): StreamEventsResponse;
}

export namespace StreamEventsResponse {
  export type AsObject = {
    index: string,
    eventtype: string,
    eventaction: string,
    eventtupleList: Array<EventTuple.AsObject>,
  }
}

