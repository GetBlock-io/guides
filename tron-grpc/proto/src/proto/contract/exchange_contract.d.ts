import * as pb_1 from "google-protobuf";
export declare namespace protocol {
    class ExchangeCreateContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            first_token_id?: Uint8Array;
            first_token_balance?: number;
            second_token_id?: Uint8Array;
            second_token_balance?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get first_token_id(): Uint8Array;
        set first_token_id(value: Uint8Array);
        get first_token_balance(): number;
        set first_token_balance(value: number);
        get second_token_id(): Uint8Array;
        set second_token_id(value: Uint8Array);
        get second_token_balance(): number;
        set second_token_balance(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            first_token_id?: Uint8Array;
            first_token_balance?: number;
            second_token_id?: Uint8Array;
            second_token_balance?: number;
        }): ExchangeCreateContract;
        toObject(): {
            owner_address?: Uint8Array;
            first_token_id?: Uint8Array;
            first_token_balance?: number;
            second_token_id?: Uint8Array;
            second_token_balance?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ExchangeCreateContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ExchangeCreateContract;
    }
    class ExchangeInjectContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            exchange_id?: number;
            token_id?: Uint8Array;
            quant?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get exchange_id(): number;
        set exchange_id(value: number);
        get token_id(): Uint8Array;
        set token_id(value: Uint8Array);
        get quant(): number;
        set quant(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            exchange_id?: number;
            token_id?: Uint8Array;
            quant?: number;
        }): ExchangeInjectContract;
        toObject(): {
            owner_address?: Uint8Array;
            exchange_id?: number;
            token_id?: Uint8Array;
            quant?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ExchangeInjectContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ExchangeInjectContract;
    }
    class ExchangeWithdrawContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            exchange_id?: number;
            token_id?: Uint8Array;
            quant?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get exchange_id(): number;
        set exchange_id(value: number);
        get token_id(): Uint8Array;
        set token_id(value: Uint8Array);
        get quant(): number;
        set quant(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            exchange_id?: number;
            token_id?: Uint8Array;
            quant?: number;
        }): ExchangeWithdrawContract;
        toObject(): {
            owner_address?: Uint8Array;
            exchange_id?: number;
            token_id?: Uint8Array;
            quant?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ExchangeWithdrawContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ExchangeWithdrawContract;
    }
    class ExchangeTransactionContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            exchange_id?: number;
            token_id?: Uint8Array;
            quant?: number;
            expected?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get exchange_id(): number;
        set exchange_id(value: number);
        get token_id(): Uint8Array;
        set token_id(value: Uint8Array);
        get quant(): number;
        set quant(value: number);
        get expected(): number;
        set expected(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            exchange_id?: number;
            token_id?: Uint8Array;
            quant?: number;
            expected?: number;
        }): ExchangeTransactionContract;
        toObject(): {
            owner_address?: Uint8Array;
            exchange_id?: number;
            token_id?: Uint8Array;
            quant?: number;
            expected?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ExchangeTransactionContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ExchangeTransactionContract;
    }
}
