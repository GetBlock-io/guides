import * as pb_1 from "google-protobuf";
export declare namespace protocol {
    class AssetIssueContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            id?: string;
            owner_address?: Uint8Array;
            name?: Uint8Array;
            abbr?: Uint8Array;
            total_supply?: number;
            frozen_supply?: AssetIssueContract.FrozenSupply[];
            trx_num?: number;
            precision?: number;
            num?: number;
            start_time?: number;
            end_time?: number;
            order?: number;
            vote_score?: number;
            description?: Uint8Array;
            url?: Uint8Array;
            free_asset_net_limit?: number;
            public_free_asset_net_limit?: number;
            public_free_asset_net_usage?: number;
            public_latest_free_net_time?: number;
        });
        get id(): string;
        set id(value: string);
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get name(): Uint8Array;
        set name(value: Uint8Array);
        get abbr(): Uint8Array;
        set abbr(value: Uint8Array);
        get total_supply(): number;
        set total_supply(value: number);
        get frozen_supply(): AssetIssueContract.FrozenSupply[];
        set frozen_supply(value: AssetIssueContract.FrozenSupply[]);
        get trx_num(): number;
        set trx_num(value: number);
        get precision(): number;
        set precision(value: number);
        get num(): number;
        set num(value: number);
        get start_time(): number;
        set start_time(value: number);
        get end_time(): number;
        set end_time(value: number);
        get order(): number;
        set order(value: number);
        get vote_score(): number;
        set vote_score(value: number);
        get description(): Uint8Array;
        set description(value: Uint8Array);
        get url(): Uint8Array;
        set url(value: Uint8Array);
        get free_asset_net_limit(): number;
        set free_asset_net_limit(value: number);
        get public_free_asset_net_limit(): number;
        set public_free_asset_net_limit(value: number);
        get public_free_asset_net_usage(): number;
        set public_free_asset_net_usage(value: number);
        get public_latest_free_net_time(): number;
        set public_latest_free_net_time(value: number);
        static fromObject(data: {
            id?: string;
            owner_address?: Uint8Array;
            name?: Uint8Array;
            abbr?: Uint8Array;
            total_supply?: number;
            frozen_supply?: ReturnType<typeof AssetIssueContract.FrozenSupply.prototype.toObject>[];
            trx_num?: number;
            precision?: number;
            num?: number;
            start_time?: number;
            end_time?: number;
            order?: number;
            vote_score?: number;
            description?: Uint8Array;
            url?: Uint8Array;
            free_asset_net_limit?: number;
            public_free_asset_net_limit?: number;
            public_free_asset_net_usage?: number;
            public_latest_free_net_time?: number;
        }): AssetIssueContract;
        toObject(): {
            id?: string;
            owner_address?: Uint8Array;
            name?: Uint8Array;
            abbr?: Uint8Array;
            total_supply?: number;
            frozen_supply?: ReturnType<typeof AssetIssueContract.FrozenSupply.prototype.toObject>[];
            trx_num?: number;
            precision?: number;
            num?: number;
            start_time?: number;
            end_time?: number;
            order?: number;
            vote_score?: number;
            description?: Uint8Array;
            url?: Uint8Array;
            free_asset_net_limit?: number;
            public_free_asset_net_limit?: number;
            public_free_asset_net_usage?: number;
            public_latest_free_net_time?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AssetIssueContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AssetIssueContract;
    }
    namespace AssetIssueContract {
        class FrozenSupply extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                frozen_amount?: number;
                frozen_days?: number;
            });
            get frozen_amount(): number;
            set frozen_amount(value: number);
            get frozen_days(): number;
            set frozen_days(value: number);
            static fromObject(data: {
                frozen_amount?: number;
                frozen_days?: number;
            }): FrozenSupply;
            toObject(): {
                frozen_amount?: number;
                frozen_days?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): FrozenSupply;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): FrozenSupply;
        }
    }
    class TransferAssetContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            asset_name?: Uint8Array;
            owner_address?: Uint8Array;
            to_address?: Uint8Array;
            amount?: number;
        });
        get asset_name(): Uint8Array;
        set asset_name(value: Uint8Array);
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get to_address(): Uint8Array;
        set to_address(value: Uint8Array);
        get amount(): number;
        set amount(value: number);
        static fromObject(data: {
            asset_name?: Uint8Array;
            owner_address?: Uint8Array;
            to_address?: Uint8Array;
            amount?: number;
        }): TransferAssetContract;
        toObject(): {
            asset_name?: Uint8Array;
            owner_address?: Uint8Array;
            to_address?: Uint8Array;
            amount?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TransferAssetContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TransferAssetContract;
    }
    class UnfreezeAssetContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        static fromObject(data: {
            owner_address?: Uint8Array;
        }): UnfreezeAssetContract;
        toObject(): {
            owner_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UnfreezeAssetContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): UnfreezeAssetContract;
    }
    class UpdateAssetContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            description?: Uint8Array;
            url?: Uint8Array;
            new_limit?: number;
            new_public_limit?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get description(): Uint8Array;
        set description(value: Uint8Array);
        get url(): Uint8Array;
        set url(value: Uint8Array);
        get new_limit(): number;
        set new_limit(value: number);
        get new_public_limit(): number;
        set new_public_limit(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            description?: Uint8Array;
            url?: Uint8Array;
            new_limit?: number;
            new_public_limit?: number;
        }): UpdateAssetContract;
        toObject(): {
            owner_address?: Uint8Array;
            description?: Uint8Array;
            url?: Uint8Array;
            new_limit?: number;
            new_public_limit?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UpdateAssetContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): UpdateAssetContract;
    }
    class ParticipateAssetIssueContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            to_address?: Uint8Array;
            asset_name?: Uint8Array;
            amount?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get to_address(): Uint8Array;
        set to_address(value: Uint8Array);
        get asset_name(): Uint8Array;
        set asset_name(value: Uint8Array);
        get amount(): number;
        set amount(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            to_address?: Uint8Array;
            asset_name?: Uint8Array;
            amount?: number;
        }): ParticipateAssetIssueContract;
        toObject(): {
            owner_address?: Uint8Array;
            to_address?: Uint8Array;
            asset_name?: Uint8Array;
            amount?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ParticipateAssetIssueContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ParticipateAssetIssueContract;
    }
}
