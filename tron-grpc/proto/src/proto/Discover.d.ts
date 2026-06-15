import * as pb_1 from "google-protobuf";
export declare namespace protocol {
    class Endpoint extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            address?: Uint8Array;
            port?: number;
            nodeId?: Uint8Array;
            addressIpv6?: Uint8Array;
        });
        get address(): Uint8Array;
        set address(value: Uint8Array);
        get port(): number;
        set port(value: number);
        get nodeId(): Uint8Array;
        set nodeId(value: Uint8Array);
        get addressIpv6(): Uint8Array;
        set addressIpv6(value: Uint8Array);
        static fromObject(data: {
            address?: Uint8Array;
            port?: number;
            nodeId?: Uint8Array;
            addressIpv6?: Uint8Array;
        }): Endpoint;
        toObject(): {
            address?: Uint8Array;
            port?: number;
            nodeId?: Uint8Array;
            addressIpv6?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Endpoint;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Endpoint;
    }
    class PingMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            from?: Endpoint;
            to?: Endpoint;
            version?: number;
            timestamp?: number;
        });
        get from(): Endpoint;
        set from(value: Endpoint);
        get has_from(): boolean;
        get to(): Endpoint;
        set to(value: Endpoint);
        get has_to(): boolean;
        get version(): number;
        set version(value: number);
        get timestamp(): number;
        set timestamp(value: number);
        static fromObject(data: {
            from?: ReturnType<typeof Endpoint.prototype.toObject>;
            to?: ReturnType<typeof Endpoint.prototype.toObject>;
            version?: number;
            timestamp?: number;
        }): PingMessage;
        toObject(): {
            from?: ReturnType<typeof Endpoint.prototype.toObject>;
            to?: ReturnType<typeof Endpoint.prototype.toObject>;
            version?: number;
            timestamp?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PingMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PingMessage;
    }
    class PongMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            from?: Endpoint;
            echo?: number;
            timestamp?: number;
        });
        get from(): Endpoint;
        set from(value: Endpoint);
        get has_from(): boolean;
        get echo(): number;
        set echo(value: number);
        get timestamp(): number;
        set timestamp(value: number);
        static fromObject(data: {
            from?: ReturnType<typeof Endpoint.prototype.toObject>;
            echo?: number;
            timestamp?: number;
        }): PongMessage;
        toObject(): {
            from?: ReturnType<typeof Endpoint.prototype.toObject>;
            echo?: number;
            timestamp?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PongMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PongMessage;
    }
    class FindNeighbours extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            from?: Endpoint;
            targetId?: Uint8Array;
            timestamp?: number;
        });
        get from(): Endpoint;
        set from(value: Endpoint);
        get has_from(): boolean;
        get targetId(): Uint8Array;
        set targetId(value: Uint8Array);
        get timestamp(): number;
        set timestamp(value: number);
        static fromObject(data: {
            from?: ReturnType<typeof Endpoint.prototype.toObject>;
            targetId?: Uint8Array;
            timestamp?: number;
        }): FindNeighbours;
        toObject(): {
            from?: ReturnType<typeof Endpoint.prototype.toObject>;
            targetId?: Uint8Array;
            timestamp?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): FindNeighbours;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): FindNeighbours;
    }
    class Neighbours extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            from?: Endpoint;
            neighbours?: Endpoint[];
            timestamp?: number;
        });
        get from(): Endpoint;
        set from(value: Endpoint);
        get has_from(): boolean;
        get neighbours(): Endpoint[];
        set neighbours(value: Endpoint[]);
        get timestamp(): number;
        set timestamp(value: number);
        static fromObject(data: {
            from?: ReturnType<typeof Endpoint.prototype.toObject>;
            neighbours?: ReturnType<typeof Endpoint.prototype.toObject>[];
            timestamp?: number;
        }): Neighbours;
        toObject(): {
            from?: ReturnType<typeof Endpoint.prototype.toObject>;
            neighbours?: ReturnType<typeof Endpoint.prototype.toObject>[];
            timestamp?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Neighbours;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Neighbours;
    }
    class BackupMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            flag?: boolean;
            priority?: number;
        });
        get flag(): boolean;
        set flag(value: boolean);
        get priority(): number;
        set priority(value: number);
        static fromObject(data: {
            flag?: boolean;
            priority?: number;
        }): BackupMessage;
        toObject(): {
            flag?: boolean;
            priority?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BackupMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BackupMessage;
    }
}
