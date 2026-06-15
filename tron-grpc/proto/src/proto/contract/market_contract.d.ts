import * as pb_1 from "google-protobuf";
export declare namespace protocol {
    class MarketSellAssetContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            sell_token_id?: Uint8Array;
            sell_token_quantity?: number;
            buy_token_id?: Uint8Array;
            buy_token_quantity?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get sell_token_id(): Uint8Array;
        set sell_token_id(value: Uint8Array);
        get sell_token_quantity(): number;
        set sell_token_quantity(value: number);
        get buy_token_id(): Uint8Array;
        set buy_token_id(value: Uint8Array);
        get buy_token_quantity(): number;
        set buy_token_quantity(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            sell_token_id?: Uint8Array;
            sell_token_quantity?: number;
            buy_token_id?: Uint8Array;
            buy_token_quantity?: number;
        }): MarketSellAssetContract;
        toObject(): {
            owner_address?: Uint8Array;
            sell_token_id?: Uint8Array;
            sell_token_quantity?: number;
            buy_token_id?: Uint8Array;
            buy_token_quantity?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MarketSellAssetContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MarketSellAssetContract;
    }
    class MarketCancelOrderContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            order_id?: Uint8Array;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get order_id(): Uint8Array;
        set order_id(value: Uint8Array);
        static fromObject(data: {
            owner_address?: Uint8Array;
            order_id?: Uint8Array;
        }): MarketCancelOrderContract;
        toObject(): {
            owner_address?: Uint8Array;
            order_id?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MarketCancelOrderContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MarketCancelOrderContract;
    }
}
