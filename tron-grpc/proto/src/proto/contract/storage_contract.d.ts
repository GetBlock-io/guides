import * as pb_1 from "google-protobuf";
export declare namespace protocol {
    class BuyStorageBytesContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            bytes?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get bytes(): number;
        set bytes(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            bytes?: number;
        }): BuyStorageBytesContract;
        toObject(): {
            owner_address?: Uint8Array;
            bytes?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BuyStorageBytesContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BuyStorageBytesContract;
    }
    class BuyStorageContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            quant?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get quant(): number;
        set quant(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            quant?: number;
        }): BuyStorageContract;
        toObject(): {
            owner_address?: Uint8Array;
            quant?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BuyStorageContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BuyStorageContract;
    }
    class SellStorageContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            storage_bytes?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get storage_bytes(): number;
        set storage_bytes(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            storage_bytes?: number;
        }): SellStorageContract;
        toObject(): {
            owner_address?: Uint8Array;
            storage_bytes?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SellStorageContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SellStorageContract;
    }
    class UpdateBrokerageContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            brokerage?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get brokerage(): number;
        set brokerage(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            brokerage?: number;
        }): UpdateBrokerageContract;
        toObject(): {
            owner_address?: Uint8Array;
            brokerage?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UpdateBrokerageContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): UpdateBrokerageContract;
    }
}
