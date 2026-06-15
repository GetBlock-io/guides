import * as dependency_1 from "./Discover";
import * as dependency_2 from "./contract/common";
import * as pb_1 from "google-protobuf";
export declare namespace protocol {
    enum AccountType {
        Normal = 0,
        AssetIssue = 1,
        Contract = 2
    }
    enum ReasonCode {
        REQUESTED = 0,
        BAD_PROTOCOL = 2,
        TOO_MANY_PEERS = 4,
        DUPLICATE_PEER = 5,
        INCOMPATIBLE_PROTOCOL = 6,
        RANDOM_ELIMINATION = 7,
        PEER_QUITING = 8,
        UNEXPECTED_IDENTITY = 9,
        LOCAL_IDENTITY = 10,
        PING_TIMEOUT = 11,
        USER_REASON = 16,
        RESET = 17,
        SYNC_FAIL = 18,
        FETCH_FAIL = 19,
        BAD_TX = 20,
        BAD_BLOCK = 21,
        FORKED = 22,
        UNLINKABLE = 23,
        INCOMPATIBLE_VERSION = 24,
        INCOMPATIBLE_CHAIN = 25,
        TIME_OUT = 32,
        CONNECT_FAIL = 33,
        TOO_MANY_PEERS_WITH_SAME_IP = 34,
        LIGHT_NODE_SYNC_FAIL = 35,
        BELOW_THAN_ME = 36,
        NOT_WITNESS = 37,
        NO_SUCH_MESSAGE = 38,
        UNKNOWN = 255
    }
    class AccountId extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            name?: Uint8Array;
            address?: Uint8Array;
        });
        get name(): Uint8Array;
        set name(value: Uint8Array);
        get address(): Uint8Array;
        set address(value: Uint8Array);
        static fromObject(data: {
            name?: Uint8Array;
            address?: Uint8Array;
        }): AccountId;
        toObject(): {
            name?: Uint8Array;
            address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AccountId;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AccountId;
    }
    class Vote extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            vote_address?: Uint8Array;
            vote_count?: number;
        });
        get vote_address(): Uint8Array;
        set vote_address(value: Uint8Array);
        get vote_count(): number;
        set vote_count(value: number);
        static fromObject(data: {
            vote_address?: Uint8Array;
            vote_count?: number;
        }): Vote;
        toObject(): {
            vote_address?: Uint8Array;
            vote_count?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Vote;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Vote;
    }
    class Proposal extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            proposal_id?: number;
            proposer_address?: Uint8Array;
            parameters?: Map<number, number>;
            expiration_time?: number;
            create_time?: number;
            approvals?: Uint8Array[];
            state?: Proposal.State;
        });
        get proposal_id(): number;
        set proposal_id(value: number);
        get proposer_address(): Uint8Array;
        set proposer_address(value: Uint8Array);
        get parameters(): Map<number, number>;
        set parameters(value: Map<number, number>);
        get expiration_time(): number;
        set expiration_time(value: number);
        get create_time(): number;
        set create_time(value: number);
        get approvals(): Uint8Array[];
        set approvals(value: Uint8Array[]);
        get state(): Proposal.State;
        set state(value: Proposal.State);
        static fromObject(data: {
            proposal_id?: number;
            proposer_address?: Uint8Array;
            parameters?: {
                [key: number]: number;
            };
            expiration_time?: number;
            create_time?: number;
            approvals?: Uint8Array[];
            state?: Proposal.State;
        }): Proposal;
        toObject(): {
            proposal_id?: number;
            proposer_address?: Uint8Array;
            parameters?: {
                [key: number]: number;
            };
            expiration_time?: number;
            create_time?: number;
            approvals?: Uint8Array[];
            state?: Proposal.State;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Proposal;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Proposal;
    }
    namespace Proposal {
        enum State {
            PENDING = 0,
            DISAPPROVED = 1,
            APPROVED = 2,
            CANCELED = 3
        }
    }
    class Exchange extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            exchange_id?: number;
            creator_address?: Uint8Array;
            create_time?: number;
            first_token_id?: Uint8Array;
            first_token_balance?: number;
            second_token_id?: Uint8Array;
            second_token_balance?: number;
        });
        get exchange_id(): number;
        set exchange_id(value: number);
        get creator_address(): Uint8Array;
        set creator_address(value: Uint8Array);
        get create_time(): number;
        set create_time(value: number);
        get first_token_id(): Uint8Array;
        set first_token_id(value: Uint8Array);
        get first_token_balance(): number;
        set first_token_balance(value: number);
        get second_token_id(): Uint8Array;
        set second_token_id(value: Uint8Array);
        get second_token_balance(): number;
        set second_token_balance(value: number);
        static fromObject(data: {
            exchange_id?: number;
            creator_address?: Uint8Array;
            create_time?: number;
            first_token_id?: Uint8Array;
            first_token_balance?: number;
            second_token_id?: Uint8Array;
            second_token_balance?: number;
        }): Exchange;
        toObject(): {
            exchange_id?: number;
            creator_address?: Uint8Array;
            create_time?: number;
            first_token_id?: Uint8Array;
            first_token_balance?: number;
            second_token_id?: Uint8Array;
            second_token_balance?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Exchange;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Exchange;
    }
    class MarketOrder extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            order_id?: Uint8Array;
            owner_address?: Uint8Array;
            create_time?: number;
            sell_token_id?: Uint8Array;
            sell_token_quantity?: number;
            buy_token_id?: Uint8Array;
            buy_token_quantity?: number;
            sell_token_quantity_remain?: number;
            sell_token_quantity_return?: number;
            state?: MarketOrder.State;
            prev?: Uint8Array;
            next?: Uint8Array;
        });
        get order_id(): Uint8Array;
        set order_id(value: Uint8Array);
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get create_time(): number;
        set create_time(value: number);
        get sell_token_id(): Uint8Array;
        set sell_token_id(value: Uint8Array);
        get sell_token_quantity(): number;
        set sell_token_quantity(value: number);
        get buy_token_id(): Uint8Array;
        set buy_token_id(value: Uint8Array);
        get buy_token_quantity(): number;
        set buy_token_quantity(value: number);
        get sell_token_quantity_remain(): number;
        set sell_token_quantity_remain(value: number);
        get sell_token_quantity_return(): number;
        set sell_token_quantity_return(value: number);
        get state(): MarketOrder.State;
        set state(value: MarketOrder.State);
        get prev(): Uint8Array;
        set prev(value: Uint8Array);
        get next(): Uint8Array;
        set next(value: Uint8Array);
        static fromObject(data: {
            order_id?: Uint8Array;
            owner_address?: Uint8Array;
            create_time?: number;
            sell_token_id?: Uint8Array;
            sell_token_quantity?: number;
            buy_token_id?: Uint8Array;
            buy_token_quantity?: number;
            sell_token_quantity_remain?: number;
            sell_token_quantity_return?: number;
            state?: MarketOrder.State;
            prev?: Uint8Array;
            next?: Uint8Array;
        }): MarketOrder;
        toObject(): {
            order_id?: Uint8Array;
            owner_address?: Uint8Array;
            create_time?: number;
            sell_token_id?: Uint8Array;
            sell_token_quantity?: number;
            buy_token_id?: Uint8Array;
            buy_token_quantity?: number;
            sell_token_quantity_remain?: number;
            sell_token_quantity_return?: number;
            state?: MarketOrder.State;
            prev?: Uint8Array;
            next?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MarketOrder;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MarketOrder;
    }
    namespace MarketOrder {
        enum State {
            ACTIVE = 0,
            INACTIVE = 1,
            CANCELED = 2
        }
    }
    class MarketOrderList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            orders?: MarketOrder[];
        });
        get orders(): MarketOrder[];
        set orders(value: MarketOrder[]);
        static fromObject(data: {
            orders?: ReturnType<typeof MarketOrder.prototype.toObject>[];
        }): MarketOrderList;
        toObject(): {
            orders?: ReturnType<typeof MarketOrder.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MarketOrderList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MarketOrderList;
    }
    class MarketOrderPairList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            orderPair?: MarketOrderPair[];
        });
        get orderPair(): MarketOrderPair[];
        set orderPair(value: MarketOrderPair[]);
        static fromObject(data: {
            orderPair?: ReturnType<typeof MarketOrderPair.prototype.toObject>[];
        }): MarketOrderPairList;
        toObject(): {
            orderPair?: ReturnType<typeof MarketOrderPair.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MarketOrderPairList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MarketOrderPairList;
    }
    class MarketOrderPair extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            sell_token_id?: Uint8Array;
            buy_token_id?: Uint8Array;
        });
        get sell_token_id(): Uint8Array;
        set sell_token_id(value: Uint8Array);
        get buy_token_id(): Uint8Array;
        set buy_token_id(value: Uint8Array);
        static fromObject(data: {
            sell_token_id?: Uint8Array;
            buy_token_id?: Uint8Array;
        }): MarketOrderPair;
        toObject(): {
            sell_token_id?: Uint8Array;
            buy_token_id?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MarketOrderPair;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MarketOrderPair;
    }
    class MarketAccountOrder extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            orders?: Uint8Array[];
            count?: number;
            total_count?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get orders(): Uint8Array[];
        set orders(value: Uint8Array[]);
        get count(): number;
        set count(value: number);
        get total_count(): number;
        set total_count(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            orders?: Uint8Array[];
            count?: number;
            total_count?: number;
        }): MarketAccountOrder;
        toObject(): {
            owner_address?: Uint8Array;
            orders?: Uint8Array[];
            count?: number;
            total_count?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MarketAccountOrder;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MarketAccountOrder;
    }
    class MarketPrice extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            sell_token_quantity?: number;
            buy_token_quantity?: number;
        });
        get sell_token_quantity(): number;
        set sell_token_quantity(value: number);
        get buy_token_quantity(): number;
        set buy_token_quantity(value: number);
        static fromObject(data: {
            sell_token_quantity?: number;
            buy_token_quantity?: number;
        }): MarketPrice;
        toObject(): {
            sell_token_quantity?: number;
            buy_token_quantity?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MarketPrice;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MarketPrice;
    }
    class MarketPriceList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            sell_token_id?: Uint8Array;
            buy_token_id?: Uint8Array;
            prices?: MarketPrice[];
        });
        get sell_token_id(): Uint8Array;
        set sell_token_id(value: Uint8Array);
        get buy_token_id(): Uint8Array;
        set buy_token_id(value: Uint8Array);
        get prices(): MarketPrice[];
        set prices(value: MarketPrice[]);
        static fromObject(data: {
            sell_token_id?: Uint8Array;
            buy_token_id?: Uint8Array;
            prices?: ReturnType<typeof MarketPrice.prototype.toObject>[];
        }): MarketPriceList;
        toObject(): {
            sell_token_id?: Uint8Array;
            buy_token_id?: Uint8Array;
            prices?: ReturnType<typeof MarketPrice.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MarketPriceList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MarketPriceList;
    }
    class MarketOrderIdList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            head?: Uint8Array;
            tail?: Uint8Array;
        });
        get head(): Uint8Array;
        set head(value: Uint8Array);
        get tail(): Uint8Array;
        set tail(value: Uint8Array);
        static fromObject(data: {
            head?: Uint8Array;
            tail?: Uint8Array;
        }): MarketOrderIdList;
        toObject(): {
            head?: Uint8Array;
            tail?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MarketOrderIdList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MarketOrderIdList;
    }
    class ChainParameters extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            chainParameter?: ChainParameters.ChainParameter[];
        });
        get chainParameter(): ChainParameters.ChainParameter[];
        set chainParameter(value: ChainParameters.ChainParameter[]);
        static fromObject(data: {
            chainParameter?: ReturnType<typeof ChainParameters.ChainParameter.prototype.toObject>[];
        }): ChainParameters;
        toObject(): {
            chainParameter?: ReturnType<typeof ChainParameters.ChainParameter.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ChainParameters;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ChainParameters;
    }
    namespace ChainParameters {
        class ChainParameter extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                key?: string;
                value?: number;
            });
            get key(): string;
            set key(value: string);
            get value(): number;
            set value(value: number);
            static fromObject(data: {
                key?: string;
                value?: number;
            }): ChainParameter;
            toObject(): {
                key?: string;
                value?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ChainParameter;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): ChainParameter;
        }
    }
    class Account extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            account_name?: Uint8Array;
            type?: AccountType;
            address?: Uint8Array;
            balance?: number;
            votes?: Vote[];
            asset?: Map<string, number>;
            assetV2?: Map<string, number>;
            frozen?: Account.Frozen[];
            net_usage?: number;
            acquired_delegated_frozen_balance_for_bandwidth?: number;
            delegated_frozen_balance_for_bandwidth?: number;
            old_tron_power?: number;
            tron_power?: Account.Frozen;
            asset_optimized?: boolean;
            create_time?: number;
            latest_opration_time?: number;
            allowance?: number;
            latest_withdraw_time?: number;
            code?: Uint8Array;
            is_witness?: boolean;
            is_committee?: boolean;
            frozen_supply?: Account.Frozen[];
            asset_issued_name?: Uint8Array;
            asset_issued_ID?: Uint8Array;
            latest_asset_operation_time?: Map<string, number>;
            latest_asset_operation_timeV2?: Map<string, number>;
            free_net_usage?: number;
            free_asset_net_usage?: Map<string, number>;
            free_asset_net_usageV2?: Map<string, number>;
            latest_consume_time?: number;
            latest_consume_free_time?: number;
            account_id?: Uint8Array;
            net_window_size?: number;
            net_window_optimized?: boolean;
            account_resource?: Account.AccountResource;
            codeHash?: Uint8Array;
            owner_permission?: Permission;
            witness_permission?: Permission;
            active_permission?: Permission[];
            frozenV2?: Account.FreezeV2[];
            unfrozenV2?: Account.UnFreezeV2[];
            delegated_frozenV2_balance_for_bandwidth?: number;
            acquired_delegated_frozenV2_balance_for_bandwidth?: number;
        });
        get account_name(): Uint8Array;
        set account_name(value: Uint8Array);
        get type(): AccountType;
        set type(value: AccountType);
        get address(): Uint8Array;
        set address(value: Uint8Array);
        get balance(): number;
        set balance(value: number);
        get votes(): Vote[];
        set votes(value: Vote[]);
        get asset(): Map<string, number>;
        set asset(value: Map<string, number>);
        get assetV2(): Map<string, number>;
        set assetV2(value: Map<string, number>);
        get frozen(): Account.Frozen[];
        set frozen(value: Account.Frozen[]);
        get net_usage(): number;
        set net_usage(value: number);
        get acquired_delegated_frozen_balance_for_bandwidth(): number;
        set acquired_delegated_frozen_balance_for_bandwidth(value: number);
        get delegated_frozen_balance_for_bandwidth(): number;
        set delegated_frozen_balance_for_bandwidth(value: number);
        get old_tron_power(): number;
        set old_tron_power(value: number);
        get tron_power(): Account.Frozen;
        set tron_power(value: Account.Frozen);
        get has_tron_power(): boolean;
        get asset_optimized(): boolean;
        set asset_optimized(value: boolean);
        get create_time(): number;
        set create_time(value: number);
        get latest_opration_time(): number;
        set latest_opration_time(value: number);
        get allowance(): number;
        set allowance(value: number);
        get latest_withdraw_time(): number;
        set latest_withdraw_time(value: number);
        get code(): Uint8Array;
        set code(value: Uint8Array);
        get is_witness(): boolean;
        set is_witness(value: boolean);
        get is_committee(): boolean;
        set is_committee(value: boolean);
        get frozen_supply(): Account.Frozen[];
        set frozen_supply(value: Account.Frozen[]);
        get asset_issued_name(): Uint8Array;
        set asset_issued_name(value: Uint8Array);
        get asset_issued_ID(): Uint8Array;
        set asset_issued_ID(value: Uint8Array);
        get latest_asset_operation_time(): Map<string, number>;
        set latest_asset_operation_time(value: Map<string, number>);
        get latest_asset_operation_timeV2(): Map<string, number>;
        set latest_asset_operation_timeV2(value: Map<string, number>);
        get free_net_usage(): number;
        set free_net_usage(value: number);
        get free_asset_net_usage(): Map<string, number>;
        set free_asset_net_usage(value: Map<string, number>);
        get free_asset_net_usageV2(): Map<string, number>;
        set free_asset_net_usageV2(value: Map<string, number>);
        get latest_consume_time(): number;
        set latest_consume_time(value: number);
        get latest_consume_free_time(): number;
        set latest_consume_free_time(value: number);
        get account_id(): Uint8Array;
        set account_id(value: Uint8Array);
        get net_window_size(): number;
        set net_window_size(value: number);
        get net_window_optimized(): boolean;
        set net_window_optimized(value: boolean);
        get account_resource(): Account.AccountResource;
        set account_resource(value: Account.AccountResource);
        get has_account_resource(): boolean;
        get codeHash(): Uint8Array;
        set codeHash(value: Uint8Array);
        get owner_permission(): Permission;
        set owner_permission(value: Permission);
        get has_owner_permission(): boolean;
        get witness_permission(): Permission;
        set witness_permission(value: Permission);
        get has_witness_permission(): boolean;
        get active_permission(): Permission[];
        set active_permission(value: Permission[]);
        get frozenV2(): Account.FreezeV2[];
        set frozenV2(value: Account.FreezeV2[]);
        get unfrozenV2(): Account.UnFreezeV2[];
        set unfrozenV2(value: Account.UnFreezeV2[]);
        get delegated_frozenV2_balance_for_bandwidth(): number;
        set delegated_frozenV2_balance_for_bandwidth(value: number);
        get acquired_delegated_frozenV2_balance_for_bandwidth(): number;
        set acquired_delegated_frozenV2_balance_for_bandwidth(value: number);
        static fromObject(data: {
            account_name?: Uint8Array;
            type?: AccountType;
            address?: Uint8Array;
            balance?: number;
            votes?: ReturnType<typeof Vote.prototype.toObject>[];
            asset?: {
                [key: string]: number;
            };
            assetV2?: {
                [key: string]: number;
            };
            frozen?: ReturnType<typeof Account.Frozen.prototype.toObject>[];
            net_usage?: number;
            acquired_delegated_frozen_balance_for_bandwidth?: number;
            delegated_frozen_balance_for_bandwidth?: number;
            old_tron_power?: number;
            tron_power?: ReturnType<typeof Account.Frozen.prototype.toObject>;
            asset_optimized?: boolean;
            create_time?: number;
            latest_opration_time?: number;
            allowance?: number;
            latest_withdraw_time?: number;
            code?: Uint8Array;
            is_witness?: boolean;
            is_committee?: boolean;
            frozen_supply?: ReturnType<typeof Account.Frozen.prototype.toObject>[];
            asset_issued_name?: Uint8Array;
            asset_issued_ID?: Uint8Array;
            latest_asset_operation_time?: {
                [key: string]: number;
            };
            latest_asset_operation_timeV2?: {
                [key: string]: number;
            };
            free_net_usage?: number;
            free_asset_net_usage?: {
                [key: string]: number;
            };
            free_asset_net_usageV2?: {
                [key: string]: number;
            };
            latest_consume_time?: number;
            latest_consume_free_time?: number;
            account_id?: Uint8Array;
            net_window_size?: number;
            net_window_optimized?: boolean;
            account_resource?: ReturnType<typeof Account.AccountResource.prototype.toObject>;
            codeHash?: Uint8Array;
            owner_permission?: ReturnType<typeof Permission.prototype.toObject>;
            witness_permission?: ReturnType<typeof Permission.prototype.toObject>;
            active_permission?: ReturnType<typeof Permission.prototype.toObject>[];
            frozenV2?: ReturnType<typeof Account.FreezeV2.prototype.toObject>[];
            unfrozenV2?: ReturnType<typeof Account.UnFreezeV2.prototype.toObject>[];
            delegated_frozenV2_balance_for_bandwidth?: number;
            acquired_delegated_frozenV2_balance_for_bandwidth?: number;
        }): Account;
        toObject(): {
            account_name?: Uint8Array;
            type?: AccountType;
            address?: Uint8Array;
            balance?: number;
            votes?: ReturnType<typeof Vote.prototype.toObject>[];
            asset?: {
                [key: string]: number;
            };
            assetV2?: {
                [key: string]: number;
            };
            frozen?: ReturnType<typeof Account.Frozen.prototype.toObject>[];
            net_usage?: number;
            acquired_delegated_frozen_balance_for_bandwidth?: number;
            delegated_frozen_balance_for_bandwidth?: number;
            old_tron_power?: number;
            tron_power?: ReturnType<typeof Account.Frozen.prototype.toObject>;
            asset_optimized?: boolean;
            create_time?: number;
            latest_opration_time?: number;
            allowance?: number;
            latest_withdraw_time?: number;
            code?: Uint8Array;
            is_witness?: boolean;
            is_committee?: boolean;
            frozen_supply?: ReturnType<typeof Account.Frozen.prototype.toObject>[];
            asset_issued_name?: Uint8Array;
            asset_issued_ID?: Uint8Array;
            latest_asset_operation_time?: {
                [key: string]: number;
            };
            latest_asset_operation_timeV2?: {
                [key: string]: number;
            };
            free_net_usage?: number;
            free_asset_net_usage?: {
                [key: string]: number;
            };
            free_asset_net_usageV2?: {
                [key: string]: number;
            };
            latest_consume_time?: number;
            latest_consume_free_time?: number;
            account_id?: Uint8Array;
            net_window_size?: number;
            net_window_optimized?: boolean;
            account_resource?: ReturnType<typeof Account.AccountResource.prototype.toObject>;
            codeHash?: Uint8Array;
            owner_permission?: ReturnType<typeof Permission.prototype.toObject>;
            witness_permission?: ReturnType<typeof Permission.prototype.toObject>;
            active_permission?: ReturnType<typeof Permission.prototype.toObject>[];
            frozenV2?: ReturnType<typeof Account.FreezeV2.prototype.toObject>[];
            unfrozenV2?: ReturnType<typeof Account.UnFreezeV2.prototype.toObject>[];
            delegated_frozenV2_balance_for_bandwidth?: number;
            acquired_delegated_frozenV2_balance_for_bandwidth?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Account;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Account;
    }
    namespace Account {
        class Frozen extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                frozen_balance?: number;
                expire_time?: number;
            });
            get frozen_balance(): number;
            set frozen_balance(value: number);
            get expire_time(): number;
            set expire_time(value: number);
            static fromObject(data: {
                frozen_balance?: number;
                expire_time?: number;
            }): Frozen;
            toObject(): {
                frozen_balance?: number;
                expire_time?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Frozen;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): Frozen;
        }
        class AccountResource extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                energy_usage?: number;
                frozen_balance_for_energy?: Account.Frozen;
                latest_consume_time_for_energy?: number;
                acquired_delegated_frozen_balance_for_energy?: number;
                delegated_frozen_balance_for_energy?: number;
                storage_limit?: number;
                storage_usage?: number;
                latest_exchange_storage_time?: number;
                energy_window_size?: number;
                delegated_frozenV2_balance_for_energy?: number;
                acquired_delegated_frozenV2_balance_for_energy?: number;
                energy_window_optimized?: boolean;
            });
            get energy_usage(): number;
            set energy_usage(value: number);
            get frozen_balance_for_energy(): Account.Frozen;
            set frozen_balance_for_energy(value: Account.Frozen);
            get has_frozen_balance_for_energy(): boolean;
            get latest_consume_time_for_energy(): number;
            set latest_consume_time_for_energy(value: number);
            get acquired_delegated_frozen_balance_for_energy(): number;
            set acquired_delegated_frozen_balance_for_energy(value: number);
            get delegated_frozen_balance_for_energy(): number;
            set delegated_frozen_balance_for_energy(value: number);
            get storage_limit(): number;
            set storage_limit(value: number);
            get storage_usage(): number;
            set storage_usage(value: number);
            get latest_exchange_storage_time(): number;
            set latest_exchange_storage_time(value: number);
            get energy_window_size(): number;
            set energy_window_size(value: number);
            get delegated_frozenV2_balance_for_energy(): number;
            set delegated_frozenV2_balance_for_energy(value: number);
            get acquired_delegated_frozenV2_balance_for_energy(): number;
            set acquired_delegated_frozenV2_balance_for_energy(value: number);
            get energy_window_optimized(): boolean;
            set energy_window_optimized(value: boolean);
            static fromObject(data: {
                energy_usage?: number;
                frozen_balance_for_energy?: ReturnType<typeof Account.Frozen.prototype.toObject>;
                latest_consume_time_for_energy?: number;
                acquired_delegated_frozen_balance_for_energy?: number;
                delegated_frozen_balance_for_energy?: number;
                storage_limit?: number;
                storage_usage?: number;
                latest_exchange_storage_time?: number;
                energy_window_size?: number;
                delegated_frozenV2_balance_for_energy?: number;
                acquired_delegated_frozenV2_balance_for_energy?: number;
                energy_window_optimized?: boolean;
            }): AccountResource;
            toObject(): {
                energy_usage?: number;
                frozen_balance_for_energy?: ReturnType<typeof Account.Frozen.prototype.toObject>;
                latest_consume_time_for_energy?: number;
                acquired_delegated_frozen_balance_for_energy?: number;
                delegated_frozen_balance_for_energy?: number;
                storage_limit?: number;
                storage_usage?: number;
                latest_exchange_storage_time?: number;
                energy_window_size?: number;
                delegated_frozenV2_balance_for_energy?: number;
                acquired_delegated_frozenV2_balance_for_energy?: number;
                energy_window_optimized?: boolean;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AccountResource;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): AccountResource;
        }
        class FreezeV2 extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                type?: dependency_2.protocol.ResourceCode;
                amount?: number;
            });
            get type(): dependency_2.protocol.ResourceCode;
            set type(value: dependency_2.protocol.ResourceCode);
            get amount(): number;
            set amount(value: number);
            static fromObject(data: {
                type?: dependency_2.protocol.ResourceCode;
                amount?: number;
            }): FreezeV2;
            toObject(): {
                type?: dependency_2.protocol.ResourceCode;
                amount?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): FreezeV2;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): FreezeV2;
        }
        class UnFreezeV2 extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                type?: dependency_2.protocol.ResourceCode;
                unfreeze_amount?: number;
                unfreeze_expire_time?: number;
            });
            get type(): dependency_2.protocol.ResourceCode;
            set type(value: dependency_2.protocol.ResourceCode);
            get unfreeze_amount(): number;
            set unfreeze_amount(value: number);
            get unfreeze_expire_time(): number;
            set unfreeze_expire_time(value: number);
            static fromObject(data: {
                type?: dependency_2.protocol.ResourceCode;
                unfreeze_amount?: number;
                unfreeze_expire_time?: number;
            }): UnFreezeV2;
            toObject(): {
                type?: dependency_2.protocol.ResourceCode;
                unfreeze_amount?: number;
                unfreeze_expire_time?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UnFreezeV2;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): UnFreezeV2;
        }
    }
    class Key extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            address?: Uint8Array;
            weight?: number;
        });
        get address(): Uint8Array;
        set address(value: Uint8Array);
        get weight(): number;
        set weight(value: number);
        static fromObject(data: {
            address?: Uint8Array;
            weight?: number;
        }): Key;
        toObject(): {
            address?: Uint8Array;
            weight?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Key;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Key;
    }
    class DelegatedResource extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            from?: Uint8Array;
            to?: Uint8Array;
            frozen_balance_for_bandwidth?: number;
            frozen_balance_for_energy?: number;
            expire_time_for_bandwidth?: number;
            expire_time_for_energy?: number;
        });
        get from(): Uint8Array;
        set from(value: Uint8Array);
        get to(): Uint8Array;
        set to(value: Uint8Array);
        get frozen_balance_for_bandwidth(): number;
        set frozen_balance_for_bandwidth(value: number);
        get frozen_balance_for_energy(): number;
        set frozen_balance_for_energy(value: number);
        get expire_time_for_bandwidth(): number;
        set expire_time_for_bandwidth(value: number);
        get expire_time_for_energy(): number;
        set expire_time_for_energy(value: number);
        static fromObject(data: {
            from?: Uint8Array;
            to?: Uint8Array;
            frozen_balance_for_bandwidth?: number;
            frozen_balance_for_energy?: number;
            expire_time_for_bandwidth?: number;
            expire_time_for_energy?: number;
        }): DelegatedResource;
        toObject(): {
            from?: Uint8Array;
            to?: Uint8Array;
            frozen_balance_for_bandwidth?: number;
            frozen_balance_for_energy?: number;
            expire_time_for_bandwidth?: number;
            expire_time_for_energy?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DelegatedResource;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DelegatedResource;
    }
    class authority extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            account?: AccountId;
            permission_name?: Uint8Array;
        });
        get account(): AccountId;
        set account(value: AccountId);
        get has_account(): boolean;
        get permission_name(): Uint8Array;
        set permission_name(value: Uint8Array);
        static fromObject(data: {
            account?: ReturnType<typeof AccountId.prototype.toObject>;
            permission_name?: Uint8Array;
        }): authority;
        toObject(): {
            account?: ReturnType<typeof AccountId.prototype.toObject>;
            permission_name?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): authority;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): authority;
    }
    class Permission extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            type?: Permission.PermissionType;
            id?: number;
            permission_name?: string;
            threshold?: number;
            parent_id?: number;
            operations?: Uint8Array;
            keys?: Key[];
        });
        get type(): Permission.PermissionType;
        set type(value: Permission.PermissionType);
        get id(): number;
        set id(value: number);
        get permission_name(): string;
        set permission_name(value: string);
        get threshold(): number;
        set threshold(value: number);
        get parent_id(): number;
        set parent_id(value: number);
        get operations(): Uint8Array;
        set operations(value: Uint8Array);
        get keys(): Key[];
        set keys(value: Key[]);
        static fromObject(data: {
            type?: Permission.PermissionType;
            id?: number;
            permission_name?: string;
            threshold?: number;
            parent_id?: number;
            operations?: Uint8Array;
            keys?: ReturnType<typeof Key.prototype.toObject>[];
        }): Permission;
        toObject(): {
            type?: Permission.PermissionType;
            id?: number;
            permission_name?: string;
            threshold?: number;
            parent_id?: number;
            operations?: Uint8Array;
            keys?: ReturnType<typeof Key.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Permission;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Permission;
    }
    namespace Permission {
        enum PermissionType {
            Owner = 0,
            Witness = 1,
            Active = 2
        }
    }
    class Witness extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            address?: Uint8Array;
            voteCount?: number;
            pubKey?: Uint8Array;
            url?: string;
            totalProduced?: number;
            totalMissed?: number;
            latestBlockNum?: number;
            latestSlotNum?: number;
            isJobs?: boolean;
        });
        get address(): Uint8Array;
        set address(value: Uint8Array);
        get voteCount(): number;
        set voteCount(value: number);
        get pubKey(): Uint8Array;
        set pubKey(value: Uint8Array);
        get url(): string;
        set url(value: string);
        get totalProduced(): number;
        set totalProduced(value: number);
        get totalMissed(): number;
        set totalMissed(value: number);
        get latestBlockNum(): number;
        set latestBlockNum(value: number);
        get latestSlotNum(): number;
        set latestSlotNum(value: number);
        get isJobs(): boolean;
        set isJobs(value: boolean);
        static fromObject(data: {
            address?: Uint8Array;
            voteCount?: number;
            pubKey?: Uint8Array;
            url?: string;
            totalProduced?: number;
            totalMissed?: number;
            latestBlockNum?: number;
            latestSlotNum?: number;
            isJobs?: boolean;
        }): Witness;
        toObject(): {
            address?: Uint8Array;
            voteCount?: number;
            pubKey?: Uint8Array;
            url?: string;
            totalProduced?: number;
            totalMissed?: number;
            latestBlockNum?: number;
            latestSlotNum?: number;
            isJobs?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Witness;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Witness;
    }
    class Votes extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            address?: Uint8Array;
            old_votes?: Vote[];
            new_votes?: Vote[];
        });
        get address(): Uint8Array;
        set address(value: Uint8Array);
        get old_votes(): Vote[];
        set old_votes(value: Vote[]);
        get new_votes(): Vote[];
        set new_votes(value: Vote[]);
        static fromObject(data: {
            address?: Uint8Array;
            old_votes?: ReturnType<typeof Vote.prototype.toObject>[];
            new_votes?: ReturnType<typeof Vote.prototype.toObject>[];
        }): Votes;
        toObject(): {
            address?: Uint8Array;
            old_votes?: ReturnType<typeof Vote.prototype.toObject>[];
            new_votes?: ReturnType<typeof Vote.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Votes;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Votes;
    }
    class TXOutput extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            value?: number;
            pubKeyHash?: Uint8Array;
        });
        get value(): number;
        set value(value: number);
        get pubKeyHash(): Uint8Array;
        set pubKeyHash(value: Uint8Array);
        static fromObject(data: {
            value?: number;
            pubKeyHash?: Uint8Array;
        }): TXOutput;
        toObject(): {
            value?: number;
            pubKeyHash?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TXOutput;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TXOutput;
    }
    class TXInput extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            raw_data?: TXInput.raw;
            signature?: Uint8Array;
        });
        get raw_data(): TXInput.raw;
        set raw_data(value: TXInput.raw);
        get has_raw_data(): boolean;
        get signature(): Uint8Array;
        set signature(value: Uint8Array);
        static fromObject(data: {
            raw_data?: ReturnType<typeof TXInput.raw.prototype.toObject>;
            signature?: Uint8Array;
        }): TXInput;
        toObject(): {
            raw_data?: ReturnType<typeof TXInput.raw.prototype.toObject>;
            signature?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TXInput;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TXInput;
    }
    namespace TXInput {
        class raw extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                txID?: Uint8Array;
                vout?: number;
                pubKey?: Uint8Array;
            });
            get txID(): Uint8Array;
            set txID(value: Uint8Array);
            get vout(): number;
            set vout(value: number);
            get pubKey(): Uint8Array;
            set pubKey(value: Uint8Array);
            static fromObject(data: {
                txID?: Uint8Array;
                vout?: number;
                pubKey?: Uint8Array;
            }): raw;
            toObject(): {
                txID?: Uint8Array;
                vout?: number;
                pubKey?: Uint8Array;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): raw;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): raw;
        }
    }
    class TXOutputs extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            outputs?: TXOutput[];
        });
        get outputs(): TXOutput[];
        set outputs(value: TXOutput[]);
        static fromObject(data: {
            outputs?: ReturnType<typeof TXOutput.prototype.toObject>[];
        }): TXOutputs;
        toObject(): {
            outputs?: ReturnType<typeof TXOutput.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TXOutputs;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TXOutputs;
    }
    class ResourceReceipt extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            energy_usage?: number;
            energy_fee?: number;
            origin_energy_usage?: number;
            energy_usage_total?: number;
            net_usage?: number;
            net_fee?: number;
            result?: Transaction.Result.contractResult;
            energy_penalty_total?: number;
        });
        get energy_usage(): number;
        set energy_usage(value: number);
        get energy_fee(): number;
        set energy_fee(value: number);
        get origin_energy_usage(): number;
        set origin_energy_usage(value: number);
        get energy_usage_total(): number;
        set energy_usage_total(value: number);
        get net_usage(): number;
        set net_usage(value: number);
        get net_fee(): number;
        set net_fee(value: number);
        get result(): Transaction.Result.contractResult;
        set result(value: Transaction.Result.contractResult);
        get energy_penalty_total(): number;
        set energy_penalty_total(value: number);
        static fromObject(data: {
            energy_usage?: number;
            energy_fee?: number;
            origin_energy_usage?: number;
            energy_usage_total?: number;
            net_usage?: number;
            net_fee?: number;
            result?: Transaction.Result.contractResult;
            energy_penalty_total?: number;
        }): ResourceReceipt;
        toObject(): {
            energy_usage?: number;
            energy_fee?: number;
            origin_energy_usage?: number;
            energy_usage_total?: number;
            net_usage?: number;
            net_fee?: number;
            result?: Transaction.Result.contractResult;
            energy_penalty_total?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ResourceReceipt;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ResourceReceipt;
    }
    class MarketOrderDetail extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            makerOrderId?: Uint8Array;
            takerOrderId?: Uint8Array;
            fillSellQuantity?: number;
            fillBuyQuantity?: number;
        });
        get makerOrderId(): Uint8Array;
        set makerOrderId(value: Uint8Array);
        get takerOrderId(): Uint8Array;
        set takerOrderId(value: Uint8Array);
        get fillSellQuantity(): number;
        set fillSellQuantity(value: number);
        get fillBuyQuantity(): number;
        set fillBuyQuantity(value: number);
        static fromObject(data: {
            makerOrderId?: Uint8Array;
            takerOrderId?: Uint8Array;
            fillSellQuantity?: number;
            fillBuyQuantity?: number;
        }): MarketOrderDetail;
        toObject(): {
            makerOrderId?: Uint8Array;
            takerOrderId?: Uint8Array;
            fillSellQuantity?: number;
            fillBuyQuantity?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MarketOrderDetail;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MarketOrderDetail;
    }
    class Transaction extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            raw_data?: Transaction.raw;
            signature?: Uint8Array[];
            ret?: Transaction.Result[];
        });
        get raw_data(): Transaction.raw;
        set raw_data(value: Transaction.raw);
        get has_raw_data(): boolean;
        get signature(): Uint8Array[];
        set signature(value: Uint8Array[]);
        get ret(): Transaction.Result[];
        set ret(value: Transaction.Result[]);
        static fromObject(data: {
            raw_data?: ReturnType<typeof Transaction.raw.prototype.toObject>;
            signature?: Uint8Array[];
            ret?: ReturnType<typeof Transaction.Result.prototype.toObject>[];
        }): Transaction;
        toObject(): {
            raw_data?: ReturnType<typeof Transaction.raw.prototype.toObject>;
            signature?: Uint8Array[];
            ret?: ReturnType<typeof Transaction.Result.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Transaction;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Transaction;
    }
    namespace Transaction {
        class Contract extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                type?: Transaction.Contract.ContractType;
                parameter?: Any;
                provider?: Uint8Array;
                ContractName?: Uint8Array;
                Permission_id?: number;
            });
            get type(): Transaction.Contract.ContractType;
            set type(value: Transaction.Contract.ContractType);
            get parameter(): Any;
            set parameter(value: Any);
            get has_parameter(): boolean;
            get provider(): Uint8Array;
            set provider(value: Uint8Array);
            get ContractName(): Uint8Array;
            set ContractName(value: Uint8Array);
            get Permission_id(): number;
            set Permission_id(value: number);
            static fromObject(data: {
                type?: Transaction.Contract.ContractType;
                parameter?: ReturnType<typeof Any.prototype.toObject>;
                provider?: Uint8Array;
                ContractName?: Uint8Array;
                Permission_id?: number;
            }): Contract;
            toObject(): {
                type?: Transaction.Contract.ContractType;
                parameter?: ReturnType<typeof Any.prototype.toObject>;
                provider?: Uint8Array;
                ContractName?: Uint8Array;
                Permission_id?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Contract;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): Contract;
        }
        namespace Contract {
            enum ContractType {
                AccountCreateContract = 0,
                TransferContract = 1,
                TransferAssetContract = 2,
                VoteAssetContract = 3,
                VoteWitnessContract = 4,
                WitnessCreateContract = 5,
                AssetIssueContract = 6,
                WitnessUpdateContract = 8,
                ParticipateAssetIssueContract = 9,
                AccountUpdateContract = 10,
                FreezeBalanceContract = 11,
                UnfreezeBalanceContract = 12,
                WithdrawBalanceContract = 13,
                UnfreezeAssetContract = 14,
                UpdateAssetContract = 15,
                ProposalCreateContract = 16,
                ProposalApproveContract = 17,
                ProposalDeleteContract = 18,
                SetAccountIdContract = 19,
                CustomContract = 20,
                CreateSmartContract = 30,
                TriggerSmartContract = 31,
                GetContract = 32,
                UpdateSettingContract = 33,
                ExchangeCreateContract = 41,
                ExchangeInjectContract = 42,
                ExchangeWithdrawContract = 43,
                ExchangeTransactionContract = 44,
                UpdateEnergyLimitContract = 45,
                AccountPermissionUpdateContract = 46,
                ClearABIContract = 48,
                UpdateBrokerageContract = 49,
                ShieldedTransferContract = 51,
                MarketSellAssetContract = 52,
                MarketCancelOrderContract = 53,
                FreezeBalanceV2Contract = 54,
                UnfreezeBalanceV2Contract = 55,
                WithdrawExpireUnfreezeContract = 56,
                DelegateResourceContract = 57,
                UnDelegateResourceContract = 58,
                CancelAllUnfreezeV2Contract = 59
            }
        }
        class Result extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                fee?: number;
                ret?: Transaction.Result.code;
                contractRet?: Transaction.Result.contractResult;
                assetIssueID?: string;
                withdraw_amount?: number;
                unfreeze_amount?: number;
                exchange_received_amount?: number;
                exchange_inject_another_amount?: number;
                exchange_withdraw_another_amount?: number;
                exchange_id?: number;
                shielded_transaction_fee?: number;
                orderId?: Uint8Array;
                orderDetails?: MarketOrderDetail[];
                withdraw_expire_amount?: number;
                cancel_unfreezeV2_amount?: Map<string, number>;
            });
            get fee(): number;
            set fee(value: number);
            get ret(): Transaction.Result.code;
            set ret(value: Transaction.Result.code);
            get contractRet(): Transaction.Result.contractResult;
            set contractRet(value: Transaction.Result.contractResult);
            get assetIssueID(): string;
            set assetIssueID(value: string);
            get withdraw_amount(): number;
            set withdraw_amount(value: number);
            get unfreeze_amount(): number;
            set unfreeze_amount(value: number);
            get exchange_received_amount(): number;
            set exchange_received_amount(value: number);
            get exchange_inject_another_amount(): number;
            set exchange_inject_another_amount(value: number);
            get exchange_withdraw_another_amount(): number;
            set exchange_withdraw_another_amount(value: number);
            get exchange_id(): number;
            set exchange_id(value: number);
            get shielded_transaction_fee(): number;
            set shielded_transaction_fee(value: number);
            get orderId(): Uint8Array;
            set orderId(value: Uint8Array);
            get orderDetails(): MarketOrderDetail[];
            set orderDetails(value: MarketOrderDetail[]);
            get withdraw_expire_amount(): number;
            set withdraw_expire_amount(value: number);
            get cancel_unfreezeV2_amount(): Map<string, number>;
            set cancel_unfreezeV2_amount(value: Map<string, number>);
            static fromObject(data: {
                fee?: number;
                ret?: Transaction.Result.code;
                contractRet?: Transaction.Result.contractResult;
                assetIssueID?: string;
                withdraw_amount?: number;
                unfreeze_amount?: number;
                exchange_received_amount?: number;
                exchange_inject_another_amount?: number;
                exchange_withdraw_another_amount?: number;
                exchange_id?: number;
                shielded_transaction_fee?: number;
                orderId?: Uint8Array;
                orderDetails?: ReturnType<typeof MarketOrderDetail.prototype.toObject>[];
                withdraw_expire_amount?: number;
                cancel_unfreezeV2_amount?: {
                    [key: string]: number;
                };
            }): Result;
            toObject(): {
                fee?: number;
                ret?: Transaction.Result.code;
                contractRet?: Transaction.Result.contractResult;
                assetIssueID?: string;
                withdraw_amount?: number;
                unfreeze_amount?: number;
                exchange_received_amount?: number;
                exchange_inject_another_amount?: number;
                exchange_withdraw_another_amount?: number;
                exchange_id?: number;
                shielded_transaction_fee?: number;
                orderId?: Uint8Array;
                orderDetails?: ReturnType<typeof MarketOrderDetail.prototype.toObject>[];
                withdraw_expire_amount?: number;
                cancel_unfreezeV2_amount?: {
                    [key: string]: number;
                };
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Result;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): Result;
        }
        namespace Result {
            enum code {
                SUCESS = 0,
                FAILED = 1
            }
            enum contractResult {
                DEFAULT = 0,
                SUCCESS = 1,
                REVERT = 2,
                BAD_JUMP_DESTINATION = 3,
                OUT_OF_MEMORY = 4,
                PRECOMPILED_CONTRACT = 5,
                STACK_TOO_SMALL = 6,
                STACK_TOO_LARGE = 7,
                ILLEGAL_OPERATION = 8,
                STACK_OVERFLOW = 9,
                OUT_OF_ENERGY = 10,
                OUT_OF_TIME = 11,
                JVM_STACK_OVER_FLOW = 12,
                UNKNOWN = 13,
                TRANSFER_FAILED = 14,
                INVALID_CODE = 15
            }
        }
        class raw extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                ref_block_bytes?: Uint8Array;
                ref_block_num?: number;
                ref_block_hash?: Uint8Array;
                expiration?: number;
                auths?: authority[];
                data?: Uint8Array;
                contract?: Transaction.Contract[];
                scripts?: Uint8Array;
                timestamp?: number;
                fee_limit?: number;
            });
            get ref_block_bytes(): Uint8Array;
            set ref_block_bytes(value: Uint8Array);
            get ref_block_num(): number;
            set ref_block_num(value: number);
            get ref_block_hash(): Uint8Array;
            set ref_block_hash(value: Uint8Array);
            get expiration(): number;
            set expiration(value: number);
            get auths(): authority[];
            set auths(value: authority[]);
            get data(): Uint8Array;
            set data(value: Uint8Array);
            get contract(): Transaction.Contract[];
            set contract(value: Transaction.Contract[]);
            get scripts(): Uint8Array;
            set scripts(value: Uint8Array);
            get timestamp(): number;
            set timestamp(value: number);
            get fee_limit(): number;
            set fee_limit(value: number);
            static fromObject(data: {
                ref_block_bytes?: Uint8Array;
                ref_block_num?: number;
                ref_block_hash?: Uint8Array;
                expiration?: number;
                auths?: ReturnType<typeof authority.prototype.toObject>[];
                data?: Uint8Array;
                contract?: ReturnType<typeof Transaction.Contract.prototype.toObject>[];
                scripts?: Uint8Array;
                timestamp?: number;
                fee_limit?: number;
            }): raw;
            toObject(): {
                ref_block_bytes?: Uint8Array;
                ref_block_num?: number;
                ref_block_hash?: Uint8Array;
                expiration?: number;
                auths?: ReturnType<typeof authority.prototype.toObject>[];
                data?: Uint8Array;
                contract?: ReturnType<typeof Transaction.Contract.prototype.toObject>[];
                scripts?: Uint8Array;
                timestamp?: number;
                fee_limit?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): raw;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): raw;
        }
    }
    class TransactionInfo extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            id?: Uint8Array;
            fee?: number;
            blockNumber?: number;
            blockTimeStamp?: number;
            contractResult?: Uint8Array[];
            contract_address?: Uint8Array;
            receipt?: ResourceReceipt;
            log?: TransactionInfo.Log[];
            result?: TransactionInfo.code;
            resMessage?: Uint8Array;
            assetIssueID?: string;
            withdraw_amount?: number;
            unfreeze_amount?: number;
            internal_transactions?: InternalTransaction[];
            exchange_received_amount?: number;
            exchange_inject_another_amount?: number;
            exchange_withdraw_another_amount?: number;
            exchange_id?: number;
            shielded_transaction_fee?: number;
            orderId?: Uint8Array;
            orderDetails?: MarketOrderDetail[];
            packingFee?: number;
            withdraw_expire_amount?: number;
            cancel_unfreezeV2_amount?: Map<string, number>;
        });
        get id(): Uint8Array;
        set id(value: Uint8Array);
        get fee(): number;
        set fee(value: number);
        get blockNumber(): number;
        set blockNumber(value: number);
        get blockTimeStamp(): number;
        set blockTimeStamp(value: number);
        get contractResult(): Uint8Array[];
        set contractResult(value: Uint8Array[]);
        get contract_address(): Uint8Array;
        set contract_address(value: Uint8Array);
        get receipt(): ResourceReceipt;
        set receipt(value: ResourceReceipt);
        get has_receipt(): boolean;
        get log(): TransactionInfo.Log[];
        set log(value: TransactionInfo.Log[]);
        get result(): TransactionInfo.code;
        set result(value: TransactionInfo.code);
        get resMessage(): Uint8Array;
        set resMessage(value: Uint8Array);
        get assetIssueID(): string;
        set assetIssueID(value: string);
        get withdraw_amount(): number;
        set withdraw_amount(value: number);
        get unfreeze_amount(): number;
        set unfreeze_amount(value: number);
        get internal_transactions(): InternalTransaction[];
        set internal_transactions(value: InternalTransaction[]);
        get exchange_received_amount(): number;
        set exchange_received_amount(value: number);
        get exchange_inject_another_amount(): number;
        set exchange_inject_another_amount(value: number);
        get exchange_withdraw_another_amount(): number;
        set exchange_withdraw_another_amount(value: number);
        get exchange_id(): number;
        set exchange_id(value: number);
        get shielded_transaction_fee(): number;
        set shielded_transaction_fee(value: number);
        get orderId(): Uint8Array;
        set orderId(value: Uint8Array);
        get orderDetails(): MarketOrderDetail[];
        set orderDetails(value: MarketOrderDetail[]);
        get packingFee(): number;
        set packingFee(value: number);
        get withdraw_expire_amount(): number;
        set withdraw_expire_amount(value: number);
        get cancel_unfreezeV2_amount(): Map<string, number>;
        set cancel_unfreezeV2_amount(value: Map<string, number>);
        static fromObject(data: {
            id?: Uint8Array;
            fee?: number;
            blockNumber?: number;
            blockTimeStamp?: number;
            contractResult?: Uint8Array[];
            contract_address?: Uint8Array;
            receipt?: ReturnType<typeof ResourceReceipt.prototype.toObject>;
            log?: ReturnType<typeof TransactionInfo.Log.prototype.toObject>[];
            result?: TransactionInfo.code;
            resMessage?: Uint8Array;
            assetIssueID?: string;
            withdraw_amount?: number;
            unfreeze_amount?: number;
            internal_transactions?: ReturnType<typeof InternalTransaction.prototype.toObject>[];
            exchange_received_amount?: number;
            exchange_inject_another_amount?: number;
            exchange_withdraw_another_amount?: number;
            exchange_id?: number;
            shielded_transaction_fee?: number;
            orderId?: Uint8Array;
            orderDetails?: ReturnType<typeof MarketOrderDetail.prototype.toObject>[];
            packingFee?: number;
            withdraw_expire_amount?: number;
            cancel_unfreezeV2_amount?: {
                [key: string]: number;
            };
        }): TransactionInfo;
        toObject(): {
            id?: Uint8Array;
            fee?: number;
            blockNumber?: number;
            blockTimeStamp?: number;
            contractResult?: Uint8Array[];
            contract_address?: Uint8Array;
            receipt?: ReturnType<typeof ResourceReceipt.prototype.toObject>;
            log?: ReturnType<typeof TransactionInfo.Log.prototype.toObject>[];
            result?: TransactionInfo.code;
            resMessage?: Uint8Array;
            assetIssueID?: string;
            withdraw_amount?: number;
            unfreeze_amount?: number;
            internal_transactions?: ReturnType<typeof InternalTransaction.prototype.toObject>[];
            exchange_received_amount?: number;
            exchange_inject_another_amount?: number;
            exchange_withdraw_another_amount?: number;
            exchange_id?: number;
            shielded_transaction_fee?: number;
            orderId?: Uint8Array;
            orderDetails?: ReturnType<typeof MarketOrderDetail.prototype.toObject>[];
            packingFee?: number;
            withdraw_expire_amount?: number;
            cancel_unfreezeV2_amount?: {
                [key: string]: number;
            };
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TransactionInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TransactionInfo;
    }
    namespace TransactionInfo {
        enum code {
            SUCESS = 0,
            FAILED = 1
        }
        class Log extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                address?: Uint8Array;
                topics?: Uint8Array[];
                data?: Uint8Array;
            });
            get address(): Uint8Array;
            set address(value: Uint8Array);
            get topics(): Uint8Array[];
            set topics(value: Uint8Array[]);
            get data(): Uint8Array;
            set data(value: Uint8Array);
            static fromObject(data: {
                address?: Uint8Array;
                topics?: Uint8Array[];
                data?: Uint8Array;
            }): Log;
            toObject(): {
                address?: Uint8Array;
                topics?: Uint8Array[];
                data?: Uint8Array;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Log;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): Log;
        }
    }
    class TransactionRet extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            blockNumber?: number;
            blockTimeStamp?: number;
            transactioninfo?: TransactionInfo[];
        });
        get blockNumber(): number;
        set blockNumber(value: number);
        get blockTimeStamp(): number;
        set blockTimeStamp(value: number);
        get transactioninfo(): TransactionInfo[];
        set transactioninfo(value: TransactionInfo[]);
        static fromObject(data: {
            blockNumber?: number;
            blockTimeStamp?: number;
            transactioninfo?: ReturnType<typeof TransactionInfo.prototype.toObject>[];
        }): TransactionRet;
        toObject(): {
            blockNumber?: number;
            blockTimeStamp?: number;
            transactioninfo?: ReturnType<typeof TransactionInfo.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TransactionRet;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TransactionRet;
    }
    class Transactions extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            transactions?: Transaction[];
        });
        get transactions(): Transaction[];
        set transactions(value: Transaction[]);
        static fromObject(data: {
            transactions?: ReturnType<typeof Transaction.prototype.toObject>[];
        }): Transactions;
        toObject(): {
            transactions?: ReturnType<typeof Transaction.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Transactions;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Transactions;
    }
    class BlockHeader extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            raw_data?: BlockHeader.raw;
            witness_signature?: Uint8Array;
        });
        get raw_data(): BlockHeader.raw;
        set raw_data(value: BlockHeader.raw);
        get has_raw_data(): boolean;
        get witness_signature(): Uint8Array;
        set witness_signature(value: Uint8Array);
        static fromObject(data: {
            raw_data?: ReturnType<typeof BlockHeader.raw.prototype.toObject>;
            witness_signature?: Uint8Array;
        }): BlockHeader;
        toObject(): {
            raw_data?: ReturnType<typeof BlockHeader.raw.prototype.toObject>;
            witness_signature?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockHeader;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BlockHeader;
    }
    namespace BlockHeader {
        class raw extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                timestamp?: number;
                txTrieRoot?: Uint8Array;
                parentHash?: Uint8Array;
                number?: number;
                witness_id?: number;
                witness_address?: Uint8Array;
                version?: number;
                accountStateRoot?: Uint8Array;
            });
            get timestamp(): number;
            set timestamp(value: number);
            get txTrieRoot(): Uint8Array;
            set txTrieRoot(value: Uint8Array);
            get parentHash(): Uint8Array;
            set parentHash(value: Uint8Array);
            get number(): number;
            set number(value: number);
            get witness_id(): number;
            set witness_id(value: number);
            get witness_address(): Uint8Array;
            set witness_address(value: Uint8Array);
            get version(): number;
            set version(value: number);
            get accountStateRoot(): Uint8Array;
            set accountStateRoot(value: Uint8Array);
            static fromObject(data: {
                timestamp?: number;
                txTrieRoot?: Uint8Array;
                parentHash?: Uint8Array;
                number?: number;
                witness_id?: number;
                witness_address?: Uint8Array;
                version?: number;
                accountStateRoot?: Uint8Array;
            }): raw;
            toObject(): {
                timestamp?: number;
                txTrieRoot?: Uint8Array;
                parentHash?: Uint8Array;
                number?: number;
                witness_id?: number;
                witness_address?: Uint8Array;
                version?: number;
                accountStateRoot?: Uint8Array;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): raw;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): raw;
        }
    }
    class Block extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            transactions?: Transaction[];
            block_header?: BlockHeader;
        });
        get transactions(): Transaction[];
        set transactions(value: Transaction[]);
        get block_header(): BlockHeader;
        set block_header(value: BlockHeader);
        get has_block_header(): boolean;
        static fromObject(data: {
            transactions?: ReturnType<typeof Transaction.prototype.toObject>[];
            block_header?: ReturnType<typeof BlockHeader.prototype.toObject>;
        }): Block;
        toObject(): {
            transactions?: ReturnType<typeof Transaction.prototype.toObject>[];
            block_header?: ReturnType<typeof BlockHeader.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Block;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Block;
    }
    class ChainInventory extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            ids?: ChainInventory.BlockId[];
            remain_num?: number;
        });
        get ids(): ChainInventory.BlockId[];
        set ids(value: ChainInventory.BlockId[]);
        get remain_num(): number;
        set remain_num(value: number);
        static fromObject(data: {
            ids?: ReturnType<typeof ChainInventory.BlockId.prototype.toObject>[];
            remain_num?: number;
        }): ChainInventory;
        toObject(): {
            ids?: ReturnType<typeof ChainInventory.BlockId.prototype.toObject>[];
            remain_num?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ChainInventory;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ChainInventory;
    }
    namespace ChainInventory {
        class BlockId extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                hash?: Uint8Array;
                number?: number;
            });
            get hash(): Uint8Array;
            set hash(value: Uint8Array);
            get number(): number;
            set number(value: number);
            static fromObject(data: {
                hash?: Uint8Array;
                number?: number;
            }): BlockId;
            toObject(): {
                hash?: Uint8Array;
                number?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockId;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): BlockId;
        }
    }
    class BlockInventory extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            ids?: BlockInventory.BlockId[];
            type?: BlockInventory.Type;
        });
        get ids(): BlockInventory.BlockId[];
        set ids(value: BlockInventory.BlockId[]);
        get type(): BlockInventory.Type;
        set type(value: BlockInventory.Type);
        static fromObject(data: {
            ids?: ReturnType<typeof BlockInventory.BlockId.prototype.toObject>[];
            type?: BlockInventory.Type;
        }): BlockInventory;
        toObject(): {
            ids?: ReturnType<typeof BlockInventory.BlockId.prototype.toObject>[];
            type?: BlockInventory.Type;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockInventory;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BlockInventory;
    }
    namespace BlockInventory {
        enum Type {
            SYNC = 0,
            ADVTISE = 1,
            FETCH = 2
        }
        class BlockId extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                hash?: Uint8Array;
                number?: number;
            });
            get hash(): Uint8Array;
            set hash(value: Uint8Array);
            get number(): number;
            set number(value: number);
            static fromObject(data: {
                hash?: Uint8Array;
                number?: number;
            }): BlockId;
            toObject(): {
                hash?: Uint8Array;
                number?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockId;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): BlockId;
        }
    }
    class Inventory extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            type?: Inventory.InventoryType;
            ids?: Uint8Array[];
        });
        get type(): Inventory.InventoryType;
        set type(value: Inventory.InventoryType);
        get ids(): Uint8Array[];
        set ids(value: Uint8Array[]);
        static fromObject(data: {
            type?: Inventory.InventoryType;
            ids?: Uint8Array[];
        }): Inventory;
        toObject(): {
            type?: Inventory.InventoryType;
            ids?: Uint8Array[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Inventory;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Inventory;
    }
    namespace Inventory {
        enum InventoryType {
            TRX = 0,
            BLOCK = 1
        }
    }
    class Items extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            type?: Items.ItemType;
            blocks?: Block[];
            block_headers?: BlockHeader[];
            transactions?: Transaction[];
        });
        get type(): Items.ItemType;
        set type(value: Items.ItemType);
        get blocks(): Block[];
        set blocks(value: Block[]);
        get block_headers(): BlockHeader[];
        set block_headers(value: BlockHeader[]);
        get transactions(): Transaction[];
        set transactions(value: Transaction[]);
        static fromObject(data: {
            type?: Items.ItemType;
            blocks?: ReturnType<typeof Block.prototype.toObject>[];
            block_headers?: ReturnType<typeof BlockHeader.prototype.toObject>[];
            transactions?: ReturnType<typeof Transaction.prototype.toObject>[];
        }): Items;
        toObject(): {
            type?: Items.ItemType;
            blocks?: ReturnType<typeof Block.prototype.toObject>[];
            block_headers?: ReturnType<typeof BlockHeader.prototype.toObject>[];
            transactions?: ReturnType<typeof Transaction.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Items;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Items;
    }
    namespace Items {
        enum ItemType {
            ERR = 0,
            TRX = 1,
            BLOCK = 2,
            BLOCKHEADER = 3
        }
    }
    class DynamicProperties extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            last_solidity_block_num?: number;
        });
        get last_solidity_block_num(): number;
        set last_solidity_block_num(value: number);
        static fromObject(data: {
            last_solidity_block_num?: number;
        }): DynamicProperties;
        toObject(): {
            last_solidity_block_num?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DynamicProperties;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DynamicProperties;
    }
    class DisconnectMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            reason?: ReasonCode;
        });
        get reason(): ReasonCode;
        set reason(value: ReasonCode);
        static fromObject(data: {
            reason?: ReasonCode;
        }): DisconnectMessage;
        toObject(): {
            reason?: ReasonCode;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DisconnectMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DisconnectMessage;
    }
    class HelloMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            from?: dependency_1.protocol.Endpoint;
            version?: number;
            timestamp?: number;
            genesisBlockId?: HelloMessage.BlockId;
            solidBlockId?: HelloMessage.BlockId;
            headBlockId?: HelloMessage.BlockId;
            address?: Uint8Array;
            signature?: Uint8Array;
            nodeType?: number;
            lowestBlockNum?: number;
            codeVersion?: Uint8Array;
        });
        get from(): dependency_1.protocol.Endpoint;
        set from(value: dependency_1.protocol.Endpoint);
        get has_from(): boolean;
        get version(): number;
        set version(value: number);
        get timestamp(): number;
        set timestamp(value: number);
        get genesisBlockId(): HelloMessage.BlockId;
        set genesisBlockId(value: HelloMessage.BlockId);
        get has_genesisBlockId(): boolean;
        get solidBlockId(): HelloMessage.BlockId;
        set solidBlockId(value: HelloMessage.BlockId);
        get has_solidBlockId(): boolean;
        get headBlockId(): HelloMessage.BlockId;
        set headBlockId(value: HelloMessage.BlockId);
        get has_headBlockId(): boolean;
        get address(): Uint8Array;
        set address(value: Uint8Array);
        get signature(): Uint8Array;
        set signature(value: Uint8Array);
        get nodeType(): number;
        set nodeType(value: number);
        get lowestBlockNum(): number;
        set lowestBlockNum(value: number);
        get codeVersion(): Uint8Array;
        set codeVersion(value: Uint8Array);
        static fromObject(data: {
            from?: ReturnType<typeof dependency_1.protocol.Endpoint.prototype.toObject>;
            version?: number;
            timestamp?: number;
            genesisBlockId?: ReturnType<typeof HelloMessage.BlockId.prototype.toObject>;
            solidBlockId?: ReturnType<typeof HelloMessage.BlockId.prototype.toObject>;
            headBlockId?: ReturnType<typeof HelloMessage.BlockId.prototype.toObject>;
            address?: Uint8Array;
            signature?: Uint8Array;
            nodeType?: number;
            lowestBlockNum?: number;
            codeVersion?: Uint8Array;
        }): HelloMessage;
        toObject(): {
            from?: ReturnType<typeof dependency_1.protocol.Endpoint.prototype.toObject>;
            version?: number;
            timestamp?: number;
            genesisBlockId?: ReturnType<typeof HelloMessage.BlockId.prototype.toObject>;
            solidBlockId?: ReturnType<typeof HelloMessage.BlockId.prototype.toObject>;
            headBlockId?: ReturnType<typeof HelloMessage.BlockId.prototype.toObject>;
            address?: Uint8Array;
            signature?: Uint8Array;
            nodeType?: number;
            lowestBlockNum?: number;
            codeVersion?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): HelloMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): HelloMessage;
    }
    namespace HelloMessage {
        class BlockId extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                hash?: Uint8Array;
                number?: number;
            });
            get hash(): Uint8Array;
            set hash(value: Uint8Array);
            get number(): number;
            set number(value: number);
            static fromObject(data: {
                hash?: Uint8Array;
                number?: number;
            }): BlockId;
            toObject(): {
                hash?: Uint8Array;
                number?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockId;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): BlockId;
        }
    }
    class InternalTransaction extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            hash?: Uint8Array;
            caller_address?: Uint8Array;
            transferTo_address?: Uint8Array;
            callValueInfo?: InternalTransaction.CallValueInfo[];
            note?: Uint8Array;
            rejected?: boolean;
            extra?: string;
        });
        get hash(): Uint8Array;
        set hash(value: Uint8Array);
        get caller_address(): Uint8Array;
        set caller_address(value: Uint8Array);
        get transferTo_address(): Uint8Array;
        set transferTo_address(value: Uint8Array);
        get callValueInfo(): InternalTransaction.CallValueInfo[];
        set callValueInfo(value: InternalTransaction.CallValueInfo[]);
        get note(): Uint8Array;
        set note(value: Uint8Array);
        get rejected(): boolean;
        set rejected(value: boolean);
        get extra(): string;
        set extra(value: string);
        static fromObject(data: {
            hash?: Uint8Array;
            caller_address?: Uint8Array;
            transferTo_address?: Uint8Array;
            callValueInfo?: ReturnType<typeof InternalTransaction.CallValueInfo.prototype.toObject>[];
            note?: Uint8Array;
            rejected?: boolean;
            extra?: string;
        }): InternalTransaction;
        toObject(): {
            hash?: Uint8Array;
            caller_address?: Uint8Array;
            transferTo_address?: Uint8Array;
            callValueInfo?: ReturnType<typeof InternalTransaction.CallValueInfo.prototype.toObject>[];
            note?: Uint8Array;
            rejected?: boolean;
            extra?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): InternalTransaction;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): InternalTransaction;
    }
    namespace InternalTransaction {
        class CallValueInfo extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                callValue?: number;
                tokenId?: string;
            });
            get callValue(): number;
            set callValue(value: number);
            get tokenId(): string;
            set tokenId(value: string);
            static fromObject(data: {
                callValue?: number;
                tokenId?: string;
            }): CallValueInfo;
            toObject(): {
                callValue?: number;
                tokenId?: string;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CallValueInfo;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): CallValueInfo;
        }
    }
    class DelegatedResourceAccountIndex extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            account?: Uint8Array;
            fromAccounts?: Uint8Array[];
            toAccounts?: Uint8Array[];
            timestamp?: number;
        });
        get account(): Uint8Array;
        set account(value: Uint8Array);
        get fromAccounts(): Uint8Array[];
        set fromAccounts(value: Uint8Array[]);
        get toAccounts(): Uint8Array[];
        set toAccounts(value: Uint8Array[]);
        get timestamp(): number;
        set timestamp(value: number);
        static fromObject(data: {
            account?: Uint8Array;
            fromAccounts?: Uint8Array[];
            toAccounts?: Uint8Array[];
            timestamp?: number;
        }): DelegatedResourceAccountIndex;
        toObject(): {
            account?: Uint8Array;
            fromAccounts?: Uint8Array[];
            toAccounts?: Uint8Array[];
            timestamp?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DelegatedResourceAccountIndex;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DelegatedResourceAccountIndex;
    }
    class NodeInfo extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            beginSyncNum?: number;
            block?: string;
            solidityBlock?: string;
            currentConnectCount?: number;
            activeConnectCount?: number;
            passiveConnectCount?: number;
            totalFlow?: number;
            peerInfoList?: NodeInfo.PeerInfo[];
            configNodeInfo?: NodeInfo.ConfigNodeInfo;
            machineInfo?: NodeInfo.MachineInfo;
            cheatWitnessInfoMap?: Map<string, string>;
        });
        get beginSyncNum(): number;
        set beginSyncNum(value: number);
        get block(): string;
        set block(value: string);
        get solidityBlock(): string;
        set solidityBlock(value: string);
        get currentConnectCount(): number;
        set currentConnectCount(value: number);
        get activeConnectCount(): number;
        set activeConnectCount(value: number);
        get passiveConnectCount(): number;
        set passiveConnectCount(value: number);
        get totalFlow(): number;
        set totalFlow(value: number);
        get peerInfoList(): NodeInfo.PeerInfo[];
        set peerInfoList(value: NodeInfo.PeerInfo[]);
        get configNodeInfo(): NodeInfo.ConfigNodeInfo;
        set configNodeInfo(value: NodeInfo.ConfigNodeInfo);
        get has_configNodeInfo(): boolean;
        get machineInfo(): NodeInfo.MachineInfo;
        set machineInfo(value: NodeInfo.MachineInfo);
        get has_machineInfo(): boolean;
        get cheatWitnessInfoMap(): Map<string, string>;
        set cheatWitnessInfoMap(value: Map<string, string>);
        static fromObject(data: {
            beginSyncNum?: number;
            block?: string;
            solidityBlock?: string;
            currentConnectCount?: number;
            activeConnectCount?: number;
            passiveConnectCount?: number;
            totalFlow?: number;
            peerInfoList?: ReturnType<typeof NodeInfo.PeerInfo.prototype.toObject>[];
            configNodeInfo?: ReturnType<typeof NodeInfo.ConfigNodeInfo.prototype.toObject>;
            machineInfo?: ReturnType<typeof NodeInfo.MachineInfo.prototype.toObject>;
            cheatWitnessInfoMap?: {
                [key: string]: string;
            };
        }): NodeInfo;
        toObject(): {
            beginSyncNum?: number;
            block?: string;
            solidityBlock?: string;
            currentConnectCount?: number;
            activeConnectCount?: number;
            passiveConnectCount?: number;
            totalFlow?: number;
            peerInfoList?: ReturnType<typeof NodeInfo.PeerInfo.prototype.toObject>[];
            configNodeInfo?: ReturnType<typeof NodeInfo.ConfigNodeInfo.prototype.toObject>;
            machineInfo?: ReturnType<typeof NodeInfo.MachineInfo.prototype.toObject>;
            cheatWitnessInfoMap?: {
                [key: string]: string;
            };
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NodeInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NodeInfo;
    }
    namespace NodeInfo {
        class PeerInfo extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                lastSyncBlock?: string;
                remainNum?: number;
                lastBlockUpdateTime?: number;
                syncFlag?: boolean;
                headBlockTimeWeBothHave?: number;
                needSyncFromPeer?: boolean;
                needSyncFromUs?: boolean;
                host?: string;
                port?: number;
                nodeId?: string;
                connectTime?: number;
                avgLatency?: number;
                syncToFetchSize?: number;
                syncToFetchSizePeekNum?: number;
                syncBlockRequestedSize?: number;
                unFetchSynNum?: number;
                blockInPorcSize?: number;
                headBlockWeBothHave?: string;
                isActive?: boolean;
                score?: number;
                nodeCount?: number;
                inFlow?: number;
                disconnectTimes?: number;
                localDisconnectReason?: string;
                remoteDisconnectReason?: string;
            });
            get lastSyncBlock(): string;
            set lastSyncBlock(value: string);
            get remainNum(): number;
            set remainNum(value: number);
            get lastBlockUpdateTime(): number;
            set lastBlockUpdateTime(value: number);
            get syncFlag(): boolean;
            set syncFlag(value: boolean);
            get headBlockTimeWeBothHave(): number;
            set headBlockTimeWeBothHave(value: number);
            get needSyncFromPeer(): boolean;
            set needSyncFromPeer(value: boolean);
            get needSyncFromUs(): boolean;
            set needSyncFromUs(value: boolean);
            get host(): string;
            set host(value: string);
            get port(): number;
            set port(value: number);
            get nodeId(): string;
            set nodeId(value: string);
            get connectTime(): number;
            set connectTime(value: number);
            get avgLatency(): number;
            set avgLatency(value: number);
            get syncToFetchSize(): number;
            set syncToFetchSize(value: number);
            get syncToFetchSizePeekNum(): number;
            set syncToFetchSizePeekNum(value: number);
            get syncBlockRequestedSize(): number;
            set syncBlockRequestedSize(value: number);
            get unFetchSynNum(): number;
            set unFetchSynNum(value: number);
            get blockInPorcSize(): number;
            set blockInPorcSize(value: number);
            get headBlockWeBothHave(): string;
            set headBlockWeBothHave(value: string);
            get isActive(): boolean;
            set isActive(value: boolean);
            get score(): number;
            set score(value: number);
            get nodeCount(): number;
            set nodeCount(value: number);
            get inFlow(): number;
            set inFlow(value: number);
            get disconnectTimes(): number;
            set disconnectTimes(value: number);
            get localDisconnectReason(): string;
            set localDisconnectReason(value: string);
            get remoteDisconnectReason(): string;
            set remoteDisconnectReason(value: string);
            static fromObject(data: {
                lastSyncBlock?: string;
                remainNum?: number;
                lastBlockUpdateTime?: number;
                syncFlag?: boolean;
                headBlockTimeWeBothHave?: number;
                needSyncFromPeer?: boolean;
                needSyncFromUs?: boolean;
                host?: string;
                port?: number;
                nodeId?: string;
                connectTime?: number;
                avgLatency?: number;
                syncToFetchSize?: number;
                syncToFetchSizePeekNum?: number;
                syncBlockRequestedSize?: number;
                unFetchSynNum?: number;
                blockInPorcSize?: number;
                headBlockWeBothHave?: string;
                isActive?: boolean;
                score?: number;
                nodeCount?: number;
                inFlow?: number;
                disconnectTimes?: number;
                localDisconnectReason?: string;
                remoteDisconnectReason?: string;
            }): PeerInfo;
            toObject(): {
                lastSyncBlock?: string;
                remainNum?: number;
                lastBlockUpdateTime?: number;
                syncFlag?: boolean;
                headBlockTimeWeBothHave?: number;
                needSyncFromPeer?: boolean;
                needSyncFromUs?: boolean;
                host?: string;
                port?: number;
                nodeId?: string;
                connectTime?: number;
                avgLatency?: number;
                syncToFetchSize?: number;
                syncToFetchSizePeekNum?: number;
                syncBlockRequestedSize?: number;
                unFetchSynNum?: number;
                blockInPorcSize?: number;
                headBlockWeBothHave?: string;
                isActive?: boolean;
                score?: number;
                nodeCount?: number;
                inFlow?: number;
                disconnectTimes?: number;
                localDisconnectReason?: string;
                remoteDisconnectReason?: string;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PeerInfo;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): PeerInfo;
        }
        class ConfigNodeInfo extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                codeVersion?: string;
                p2pVersion?: string;
                listenPort?: number;
                discoverEnable?: boolean;
                activeNodeSize?: number;
                passiveNodeSize?: number;
                sendNodeSize?: number;
                maxConnectCount?: number;
                sameIpMaxConnectCount?: number;
                backupListenPort?: number;
                backupMemberSize?: number;
                backupPriority?: number;
                dbVersion?: number;
                minParticipationRate?: number;
                supportConstant?: boolean;
                minTimeRatio?: number;
                maxTimeRatio?: number;
                allowCreationOfContracts?: number;
                allowAdaptiveEnergy?: number;
            });
            get codeVersion(): string;
            set codeVersion(value: string);
            get p2pVersion(): string;
            set p2pVersion(value: string);
            get listenPort(): number;
            set listenPort(value: number);
            get discoverEnable(): boolean;
            set discoverEnable(value: boolean);
            get activeNodeSize(): number;
            set activeNodeSize(value: number);
            get passiveNodeSize(): number;
            set passiveNodeSize(value: number);
            get sendNodeSize(): number;
            set sendNodeSize(value: number);
            get maxConnectCount(): number;
            set maxConnectCount(value: number);
            get sameIpMaxConnectCount(): number;
            set sameIpMaxConnectCount(value: number);
            get backupListenPort(): number;
            set backupListenPort(value: number);
            get backupMemberSize(): number;
            set backupMemberSize(value: number);
            get backupPriority(): number;
            set backupPriority(value: number);
            get dbVersion(): number;
            set dbVersion(value: number);
            get minParticipationRate(): number;
            set minParticipationRate(value: number);
            get supportConstant(): boolean;
            set supportConstant(value: boolean);
            get minTimeRatio(): number;
            set minTimeRatio(value: number);
            get maxTimeRatio(): number;
            set maxTimeRatio(value: number);
            get allowCreationOfContracts(): number;
            set allowCreationOfContracts(value: number);
            get allowAdaptiveEnergy(): number;
            set allowAdaptiveEnergy(value: number);
            static fromObject(data: {
                codeVersion?: string;
                p2pVersion?: string;
                listenPort?: number;
                discoverEnable?: boolean;
                activeNodeSize?: number;
                passiveNodeSize?: number;
                sendNodeSize?: number;
                maxConnectCount?: number;
                sameIpMaxConnectCount?: number;
                backupListenPort?: number;
                backupMemberSize?: number;
                backupPriority?: number;
                dbVersion?: number;
                minParticipationRate?: number;
                supportConstant?: boolean;
                minTimeRatio?: number;
                maxTimeRatio?: number;
                allowCreationOfContracts?: number;
                allowAdaptiveEnergy?: number;
            }): ConfigNodeInfo;
            toObject(): {
                codeVersion?: string;
                p2pVersion?: string;
                listenPort?: number;
                discoverEnable?: boolean;
                activeNodeSize?: number;
                passiveNodeSize?: number;
                sendNodeSize?: number;
                maxConnectCount?: number;
                sameIpMaxConnectCount?: number;
                backupListenPort?: number;
                backupMemberSize?: number;
                backupPriority?: number;
                dbVersion?: number;
                minParticipationRate?: number;
                supportConstant?: boolean;
                minTimeRatio?: number;
                maxTimeRatio?: number;
                allowCreationOfContracts?: number;
                allowAdaptiveEnergy?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ConfigNodeInfo;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): ConfigNodeInfo;
        }
        class MachineInfo extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                threadCount?: number;
                deadLockThreadCount?: number;
                cpuCount?: number;
                totalMemory?: number;
                freeMemory?: number;
                cpuRate?: number;
                javaVersion?: string;
                osName?: string;
                jvmTotalMemory?: number;
                jvmFreeMemory?: number;
                processCpuRate?: number;
                memoryDescInfoList?: NodeInfo.MachineInfo.MemoryDescInfo[];
                deadLockThreadInfoList?: NodeInfo.MachineInfo.DeadLockThreadInfo[];
            });
            get threadCount(): number;
            set threadCount(value: number);
            get deadLockThreadCount(): number;
            set deadLockThreadCount(value: number);
            get cpuCount(): number;
            set cpuCount(value: number);
            get totalMemory(): number;
            set totalMemory(value: number);
            get freeMemory(): number;
            set freeMemory(value: number);
            get cpuRate(): number;
            set cpuRate(value: number);
            get javaVersion(): string;
            set javaVersion(value: string);
            get osName(): string;
            set osName(value: string);
            get jvmTotalMemory(): number;
            set jvmTotalMemory(value: number);
            get jvmFreeMemory(): number;
            set jvmFreeMemory(value: number);
            get processCpuRate(): number;
            set processCpuRate(value: number);
            get memoryDescInfoList(): NodeInfo.MachineInfo.MemoryDescInfo[];
            set memoryDescInfoList(value: NodeInfo.MachineInfo.MemoryDescInfo[]);
            get deadLockThreadInfoList(): NodeInfo.MachineInfo.DeadLockThreadInfo[];
            set deadLockThreadInfoList(value: NodeInfo.MachineInfo.DeadLockThreadInfo[]);
            static fromObject(data: {
                threadCount?: number;
                deadLockThreadCount?: number;
                cpuCount?: number;
                totalMemory?: number;
                freeMemory?: number;
                cpuRate?: number;
                javaVersion?: string;
                osName?: string;
                jvmTotalMemory?: number;
                jvmFreeMemory?: number;
                processCpuRate?: number;
                memoryDescInfoList?: ReturnType<typeof NodeInfo.MachineInfo.MemoryDescInfo.prototype.toObject>[];
                deadLockThreadInfoList?: ReturnType<typeof NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.toObject>[];
            }): MachineInfo;
            toObject(): {
                threadCount?: number;
                deadLockThreadCount?: number;
                cpuCount?: number;
                totalMemory?: number;
                freeMemory?: number;
                cpuRate?: number;
                javaVersion?: string;
                osName?: string;
                jvmTotalMemory?: number;
                jvmFreeMemory?: number;
                processCpuRate?: number;
                memoryDescInfoList?: ReturnType<typeof NodeInfo.MachineInfo.MemoryDescInfo.prototype.toObject>[];
                deadLockThreadInfoList?: ReturnType<typeof NodeInfo.MachineInfo.DeadLockThreadInfo.prototype.toObject>[];
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MachineInfo;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): MachineInfo;
        }
        namespace MachineInfo {
            class MemoryDescInfo extends pb_1.Message {
                #private;
                constructor(data?: any[] | {
                    name?: string;
                    initSize?: number;
                    useSize?: number;
                    maxSize?: number;
                    useRate?: number;
                });
                get name(): string;
                set name(value: string);
                get initSize(): number;
                set initSize(value: number);
                get useSize(): number;
                set useSize(value: number);
                get maxSize(): number;
                set maxSize(value: number);
                get useRate(): number;
                set useRate(value: number);
                static fromObject(data: {
                    name?: string;
                    initSize?: number;
                    useSize?: number;
                    maxSize?: number;
                    useRate?: number;
                }): MemoryDescInfo;
                toObject(): {
                    name?: string;
                    initSize?: number;
                    useSize?: number;
                    maxSize?: number;
                    useRate?: number;
                };
                serialize(): Uint8Array;
                serialize(w: pb_1.BinaryWriter): void;
                static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MemoryDescInfo;
                serializeBinary(): Uint8Array;
                static deserializeBinary(bytes: Uint8Array): MemoryDescInfo;
            }
            class DeadLockThreadInfo extends pb_1.Message {
                #private;
                constructor(data?: any[] | {
                    name?: string;
                    lockName?: string;
                    lockOwner?: string;
                    state?: string;
                    blockTime?: number;
                    waitTime?: number;
                    stackTrace?: string;
                });
                get name(): string;
                set name(value: string);
                get lockName(): string;
                set lockName(value: string);
                get lockOwner(): string;
                set lockOwner(value: string);
                get state(): string;
                set state(value: string);
                get blockTime(): number;
                set blockTime(value: number);
                get waitTime(): number;
                set waitTime(value: number);
                get stackTrace(): string;
                set stackTrace(value: string);
                static fromObject(data: {
                    name?: string;
                    lockName?: string;
                    lockOwner?: string;
                    state?: string;
                    blockTime?: number;
                    waitTime?: number;
                    stackTrace?: string;
                }): DeadLockThreadInfo;
                toObject(): {
                    name?: string;
                    lockName?: string;
                    lockOwner?: string;
                    state?: string;
                    blockTime?: number;
                    waitTime?: number;
                    stackTrace?: string;
                };
                serialize(): Uint8Array;
                serialize(w: pb_1.BinaryWriter): void;
                static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DeadLockThreadInfo;
                serializeBinary(): Uint8Array;
                static deserializeBinary(bytes: Uint8Array): DeadLockThreadInfo;
            }
        }
    }
    class MetricsInfo extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            interval?: number;
            node?: MetricsInfo.NodeInfo;
            blockchain?: MetricsInfo.BlockChainInfo;
            net?: MetricsInfo.NetInfo;
        });
        get interval(): number;
        set interval(value: number);
        get node(): MetricsInfo.NodeInfo;
        set node(value: MetricsInfo.NodeInfo);
        get has_node(): boolean;
        get blockchain(): MetricsInfo.BlockChainInfo;
        set blockchain(value: MetricsInfo.BlockChainInfo);
        get has_blockchain(): boolean;
        get net(): MetricsInfo.NetInfo;
        set net(value: MetricsInfo.NetInfo);
        get has_net(): boolean;
        static fromObject(data: {
            interval?: number;
            node?: ReturnType<typeof MetricsInfo.NodeInfo.prototype.toObject>;
            blockchain?: ReturnType<typeof MetricsInfo.BlockChainInfo.prototype.toObject>;
            net?: ReturnType<typeof MetricsInfo.NetInfo.prototype.toObject>;
        }): MetricsInfo;
        toObject(): {
            interval?: number;
            node?: ReturnType<typeof MetricsInfo.NodeInfo.prototype.toObject>;
            blockchain?: ReturnType<typeof MetricsInfo.BlockChainInfo.prototype.toObject>;
            net?: ReturnType<typeof MetricsInfo.NetInfo.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MetricsInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MetricsInfo;
    }
    namespace MetricsInfo {
        class NodeInfo extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                ip?: string;
                nodeType?: number;
                version?: string;
                backupStatus?: number;
            });
            get ip(): string;
            set ip(value: string);
            get nodeType(): number;
            set nodeType(value: number);
            get version(): string;
            set version(value: string);
            get backupStatus(): number;
            set backupStatus(value: number);
            static fromObject(data: {
                ip?: string;
                nodeType?: number;
                version?: string;
                backupStatus?: number;
            }): NodeInfo;
            toObject(): {
                ip?: string;
                nodeType?: number;
                version?: string;
                backupStatus?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NodeInfo;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): NodeInfo;
        }
        class BlockChainInfo extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                headBlockNum?: number;
                headBlockTimestamp?: number;
                headBlockHash?: string;
                forkCount?: number;
                failForkCount?: number;
                blockProcessTime?: MetricsInfo.RateInfo;
                tps?: MetricsInfo.RateInfo;
                transactionCacheSize?: number;
                missedTransaction?: MetricsInfo.RateInfo;
                witnesses?: MetricsInfo.BlockChainInfo.Witness[];
                failProcessBlockNum?: number;
                failProcessBlockReason?: string;
                dupWitness?: MetricsInfo.BlockChainInfo.DupWitness[];
            });
            get headBlockNum(): number;
            set headBlockNum(value: number);
            get headBlockTimestamp(): number;
            set headBlockTimestamp(value: number);
            get headBlockHash(): string;
            set headBlockHash(value: string);
            get forkCount(): number;
            set forkCount(value: number);
            get failForkCount(): number;
            set failForkCount(value: number);
            get blockProcessTime(): MetricsInfo.RateInfo;
            set blockProcessTime(value: MetricsInfo.RateInfo);
            get has_blockProcessTime(): boolean;
            get tps(): MetricsInfo.RateInfo;
            set tps(value: MetricsInfo.RateInfo);
            get has_tps(): boolean;
            get transactionCacheSize(): number;
            set transactionCacheSize(value: number);
            get missedTransaction(): MetricsInfo.RateInfo;
            set missedTransaction(value: MetricsInfo.RateInfo);
            get has_missedTransaction(): boolean;
            get witnesses(): MetricsInfo.BlockChainInfo.Witness[];
            set witnesses(value: MetricsInfo.BlockChainInfo.Witness[]);
            get failProcessBlockNum(): number;
            set failProcessBlockNum(value: number);
            get failProcessBlockReason(): string;
            set failProcessBlockReason(value: string);
            get dupWitness(): MetricsInfo.BlockChainInfo.DupWitness[];
            set dupWitness(value: MetricsInfo.BlockChainInfo.DupWitness[]);
            static fromObject(data: {
                headBlockNum?: number;
                headBlockTimestamp?: number;
                headBlockHash?: string;
                forkCount?: number;
                failForkCount?: number;
                blockProcessTime?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                tps?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                transactionCacheSize?: number;
                missedTransaction?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                witnesses?: ReturnType<typeof MetricsInfo.BlockChainInfo.Witness.prototype.toObject>[];
                failProcessBlockNum?: number;
                failProcessBlockReason?: string;
                dupWitness?: ReturnType<typeof MetricsInfo.BlockChainInfo.DupWitness.prototype.toObject>[];
            }): BlockChainInfo;
            toObject(): {
                headBlockNum?: number;
                headBlockTimestamp?: number;
                headBlockHash?: string;
                forkCount?: number;
                failForkCount?: number;
                blockProcessTime?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                tps?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                transactionCacheSize?: number;
                missedTransaction?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                witnesses?: ReturnType<typeof MetricsInfo.BlockChainInfo.Witness.prototype.toObject>[];
                failProcessBlockNum?: number;
                failProcessBlockReason?: string;
                dupWitness?: ReturnType<typeof MetricsInfo.BlockChainInfo.DupWitness.prototype.toObject>[];
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockChainInfo;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): BlockChainInfo;
        }
        namespace BlockChainInfo {
            class Witness extends pb_1.Message {
                #private;
                constructor(data?: any[] | {
                    address?: string;
                    version?: number;
                });
                get address(): string;
                set address(value: string);
                get version(): number;
                set version(value: number);
                static fromObject(data: {
                    address?: string;
                    version?: number;
                }): Witness;
                toObject(): {
                    address?: string;
                    version?: number;
                };
                serialize(): Uint8Array;
                serialize(w: pb_1.BinaryWriter): void;
                static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Witness;
                serializeBinary(): Uint8Array;
                static deserializeBinary(bytes: Uint8Array): Witness;
            }
            class DupWitness extends pb_1.Message {
                #private;
                constructor(data?: any[] | {
                    address?: string;
                    blockNum?: number;
                    count?: number;
                });
                get address(): string;
                set address(value: string);
                get blockNum(): number;
                set blockNum(value: number);
                get count(): number;
                set count(value: number);
                static fromObject(data: {
                    address?: string;
                    blockNum?: number;
                    count?: number;
                }): DupWitness;
                toObject(): {
                    address?: string;
                    blockNum?: number;
                    count?: number;
                };
                serialize(): Uint8Array;
                serialize(w: pb_1.BinaryWriter): void;
                static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DupWitness;
                serializeBinary(): Uint8Array;
                static deserializeBinary(bytes: Uint8Array): DupWitness;
            }
        }
        class RateInfo extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                count?: number;
                meanRate?: number;
                oneMinuteRate?: number;
                fiveMinuteRate?: number;
                fifteenMinuteRate?: number;
            });
            get count(): number;
            set count(value: number);
            get meanRate(): number;
            set meanRate(value: number);
            get oneMinuteRate(): number;
            set oneMinuteRate(value: number);
            get fiveMinuteRate(): number;
            set fiveMinuteRate(value: number);
            get fifteenMinuteRate(): number;
            set fifteenMinuteRate(value: number);
            static fromObject(data: {
                count?: number;
                meanRate?: number;
                oneMinuteRate?: number;
                fiveMinuteRate?: number;
                fifteenMinuteRate?: number;
            }): RateInfo;
            toObject(): {
                count?: number;
                meanRate?: number;
                oneMinuteRate?: number;
                fiveMinuteRate?: number;
                fifteenMinuteRate?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RateInfo;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): RateInfo;
        }
        class NetInfo extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                errorProtoCount?: number;
                api?: MetricsInfo.NetInfo.ApiInfo;
                connectionCount?: number;
                validConnectionCount?: number;
                tcpInTraffic?: MetricsInfo.RateInfo;
                tcpOutTraffic?: MetricsInfo.RateInfo;
                disconnectionCount?: number;
                disconnectionDetail?: MetricsInfo.NetInfo.DisconnectionDetailInfo[];
                udpInTraffic?: MetricsInfo.RateInfo;
                udpOutTraffic?: MetricsInfo.RateInfo;
                latency?: MetricsInfo.NetInfo.LatencyInfo;
            });
            get errorProtoCount(): number;
            set errorProtoCount(value: number);
            get api(): MetricsInfo.NetInfo.ApiInfo;
            set api(value: MetricsInfo.NetInfo.ApiInfo);
            get has_api(): boolean;
            get connectionCount(): number;
            set connectionCount(value: number);
            get validConnectionCount(): number;
            set validConnectionCount(value: number);
            get tcpInTraffic(): MetricsInfo.RateInfo;
            set tcpInTraffic(value: MetricsInfo.RateInfo);
            get has_tcpInTraffic(): boolean;
            get tcpOutTraffic(): MetricsInfo.RateInfo;
            set tcpOutTraffic(value: MetricsInfo.RateInfo);
            get has_tcpOutTraffic(): boolean;
            get disconnectionCount(): number;
            set disconnectionCount(value: number);
            get disconnectionDetail(): MetricsInfo.NetInfo.DisconnectionDetailInfo[];
            set disconnectionDetail(value: MetricsInfo.NetInfo.DisconnectionDetailInfo[]);
            get udpInTraffic(): MetricsInfo.RateInfo;
            set udpInTraffic(value: MetricsInfo.RateInfo);
            get has_udpInTraffic(): boolean;
            get udpOutTraffic(): MetricsInfo.RateInfo;
            set udpOutTraffic(value: MetricsInfo.RateInfo);
            get has_udpOutTraffic(): boolean;
            get latency(): MetricsInfo.NetInfo.LatencyInfo;
            set latency(value: MetricsInfo.NetInfo.LatencyInfo);
            get has_latency(): boolean;
            static fromObject(data: {
                errorProtoCount?: number;
                api?: ReturnType<typeof MetricsInfo.NetInfo.ApiInfo.prototype.toObject>;
                connectionCount?: number;
                validConnectionCount?: number;
                tcpInTraffic?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                tcpOutTraffic?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                disconnectionCount?: number;
                disconnectionDetail?: ReturnType<typeof MetricsInfo.NetInfo.DisconnectionDetailInfo.prototype.toObject>[];
                udpInTraffic?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                udpOutTraffic?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                latency?: ReturnType<typeof MetricsInfo.NetInfo.LatencyInfo.prototype.toObject>;
            }): NetInfo;
            toObject(): {
                errorProtoCount?: number;
                api?: ReturnType<typeof MetricsInfo.NetInfo.ApiInfo.prototype.toObject>;
                connectionCount?: number;
                validConnectionCount?: number;
                tcpInTraffic?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                tcpOutTraffic?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                disconnectionCount?: number;
                disconnectionDetail?: ReturnType<typeof MetricsInfo.NetInfo.DisconnectionDetailInfo.prototype.toObject>[];
                udpInTraffic?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                udpOutTraffic?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                latency?: ReturnType<typeof MetricsInfo.NetInfo.LatencyInfo.prototype.toObject>;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NetInfo;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): NetInfo;
        }
        namespace NetInfo {
            class ApiInfo extends pb_1.Message {
                #private;
                constructor(data?: any[] | {
                    qps?: MetricsInfo.RateInfo;
                    failQps?: MetricsInfo.RateInfo;
                    outTraffic?: MetricsInfo.RateInfo;
                    detail?: MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo[];
                });
                get qps(): MetricsInfo.RateInfo;
                set qps(value: MetricsInfo.RateInfo);
                get has_qps(): boolean;
                get failQps(): MetricsInfo.RateInfo;
                set failQps(value: MetricsInfo.RateInfo);
                get has_failQps(): boolean;
                get outTraffic(): MetricsInfo.RateInfo;
                set outTraffic(value: MetricsInfo.RateInfo);
                get has_outTraffic(): boolean;
                get detail(): MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo[];
                set detail(value: MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo[]);
                static fromObject(data: {
                    qps?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                    failQps?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                    outTraffic?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                    detail?: ReturnType<typeof MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.toObject>[];
                }): ApiInfo;
                toObject(): {
                    qps?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                    failQps?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                    outTraffic?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                    detail?: ReturnType<typeof MetricsInfo.NetInfo.ApiInfo.ApiDetailInfo.prototype.toObject>[];
                };
                serialize(): Uint8Array;
                serialize(w: pb_1.BinaryWriter): void;
                static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ApiInfo;
                serializeBinary(): Uint8Array;
                static deserializeBinary(bytes: Uint8Array): ApiInfo;
            }
            namespace ApiInfo {
                class ApiDetailInfo extends pb_1.Message {
                    #private;
                    constructor(data?: any[] | {
                        name?: string;
                        qps?: MetricsInfo.RateInfo;
                        failQps?: MetricsInfo.RateInfo;
                        outTraffic?: MetricsInfo.RateInfo;
                    });
                    get name(): string;
                    set name(value: string);
                    get qps(): MetricsInfo.RateInfo;
                    set qps(value: MetricsInfo.RateInfo);
                    get has_qps(): boolean;
                    get failQps(): MetricsInfo.RateInfo;
                    set failQps(value: MetricsInfo.RateInfo);
                    get has_failQps(): boolean;
                    get outTraffic(): MetricsInfo.RateInfo;
                    set outTraffic(value: MetricsInfo.RateInfo);
                    get has_outTraffic(): boolean;
                    static fromObject(data: {
                        name?: string;
                        qps?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                        failQps?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                        outTraffic?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                    }): ApiDetailInfo;
                    toObject(): {
                        name?: string;
                        qps?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                        failQps?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                        outTraffic?: ReturnType<typeof MetricsInfo.RateInfo.prototype.toObject>;
                    };
                    serialize(): Uint8Array;
                    serialize(w: pb_1.BinaryWriter): void;
                    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ApiDetailInfo;
                    serializeBinary(): Uint8Array;
                    static deserializeBinary(bytes: Uint8Array): ApiDetailInfo;
                }
            }
            class DisconnectionDetailInfo extends pb_1.Message {
                #private;
                constructor(data?: any[] | {
                    reason?: string;
                    count?: number;
                });
                get reason(): string;
                set reason(value: string);
                get count(): number;
                set count(value: number);
                static fromObject(data: {
                    reason?: string;
                    count?: number;
                }): DisconnectionDetailInfo;
                toObject(): {
                    reason?: string;
                    count?: number;
                };
                serialize(): Uint8Array;
                serialize(w: pb_1.BinaryWriter): void;
                static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DisconnectionDetailInfo;
                serializeBinary(): Uint8Array;
                static deserializeBinary(bytes: Uint8Array): DisconnectionDetailInfo;
            }
            class LatencyInfo extends pb_1.Message {
                #private;
                constructor(data?: any[] | {
                    top99?: number;
                    top95?: number;
                    top75?: number;
                    totalCount?: number;
                    delay1S?: number;
                    delay2S?: number;
                    delay3S?: number;
                    detail?: MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo[];
                });
                get top99(): number;
                set top99(value: number);
                get top95(): number;
                set top95(value: number);
                get top75(): number;
                set top75(value: number);
                get totalCount(): number;
                set totalCount(value: number);
                get delay1S(): number;
                set delay1S(value: number);
                get delay2S(): number;
                set delay2S(value: number);
                get delay3S(): number;
                set delay3S(value: number);
                get detail(): MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo[];
                set detail(value: MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo[]);
                static fromObject(data: {
                    top99?: number;
                    top95?: number;
                    top75?: number;
                    totalCount?: number;
                    delay1S?: number;
                    delay2S?: number;
                    delay3S?: number;
                    detail?: ReturnType<typeof MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.toObject>[];
                }): LatencyInfo;
                toObject(): {
                    top99?: number;
                    top95?: number;
                    top75?: number;
                    totalCount?: number;
                    delay1S?: number;
                    delay2S?: number;
                    delay3S?: number;
                    detail?: ReturnType<typeof MetricsInfo.NetInfo.LatencyInfo.LatencyDetailInfo.prototype.toObject>[];
                };
                serialize(): Uint8Array;
                serialize(w: pb_1.BinaryWriter): void;
                static deserialize(bytes: Uint8Array | pb_1.BinaryReader): LatencyInfo;
                serializeBinary(): Uint8Array;
                static deserializeBinary(bytes: Uint8Array): LatencyInfo;
            }
            namespace LatencyInfo {
                class LatencyDetailInfo extends pb_1.Message {
                    #private;
                    constructor(data?: any[] | {
                        witness?: string;
                        top99?: number;
                        top95?: number;
                        top75?: number;
                        count?: number;
                        delay1S?: number;
                        delay2S?: number;
                        delay3S?: number;
                    });
                    get witness(): string;
                    set witness(value: string);
                    get top99(): number;
                    set top99(value: number);
                    get top95(): number;
                    set top95(value: number);
                    get top75(): number;
                    set top75(value: number);
                    get count(): number;
                    set count(value: number);
                    get delay1S(): number;
                    set delay1S(value: number);
                    get delay2S(): number;
                    set delay2S(value: number);
                    get delay3S(): number;
                    set delay3S(value: number);
                    static fromObject(data: {
                        witness?: string;
                        top99?: number;
                        top95?: number;
                        top75?: number;
                        count?: number;
                        delay1S?: number;
                        delay2S?: number;
                        delay3S?: number;
                    }): LatencyDetailInfo;
                    toObject(): {
                        witness?: string;
                        top99?: number;
                        top95?: number;
                        top75?: number;
                        count?: number;
                        delay1S?: number;
                        delay2S?: number;
                        delay3S?: number;
                    };
                    serialize(): Uint8Array;
                    serialize(w: pb_1.BinaryWriter): void;
                    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): LatencyDetailInfo;
                    serializeBinary(): Uint8Array;
                    static deserializeBinary(bytes: Uint8Array): LatencyDetailInfo;
                }
            }
        }
    }
    class PBFTMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            raw_data?: PBFTMessage.Raw;
            signature?: Uint8Array;
        });
        get raw_data(): PBFTMessage.Raw;
        set raw_data(value: PBFTMessage.Raw);
        get has_raw_data(): boolean;
        get signature(): Uint8Array;
        set signature(value: Uint8Array);
        static fromObject(data: {
            raw_data?: ReturnType<typeof PBFTMessage.Raw.prototype.toObject>;
            signature?: Uint8Array;
        }): PBFTMessage;
        toObject(): {
            raw_data?: ReturnType<typeof PBFTMessage.Raw.prototype.toObject>;
            signature?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PBFTMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PBFTMessage;
    }
    namespace PBFTMessage {
        enum MsgType {
            VIEW_CHANGE = 0,
            REQUEST = 1,
            PREPREPARE = 2,
            PREPARE = 3,
            COMMIT = 4
        }
        enum DataType {
            BLOCK = 0,
            SRL = 1
        }
        class Raw extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                msg_type?: PBFTMessage.MsgType;
                data_type?: PBFTMessage.DataType;
                view_n?: number;
                epoch?: number;
                data?: Uint8Array;
            });
            get msg_type(): PBFTMessage.MsgType;
            set msg_type(value: PBFTMessage.MsgType);
            get data_type(): PBFTMessage.DataType;
            set data_type(value: PBFTMessage.DataType);
            get view_n(): number;
            set view_n(value: number);
            get epoch(): number;
            set epoch(value: number);
            get data(): Uint8Array;
            set data(value: Uint8Array);
            static fromObject(data: {
                msg_type?: PBFTMessage.MsgType;
                data_type?: PBFTMessage.DataType;
                view_n?: number;
                epoch?: number;
                data?: Uint8Array;
            }): Raw;
            toObject(): {
                msg_type?: PBFTMessage.MsgType;
                data_type?: PBFTMessage.DataType;
                view_n?: number;
                epoch?: number;
                data?: Uint8Array;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Raw;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): Raw;
        }
    }
    class PBFTCommitResult extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            data?: Uint8Array;
            signature?: Uint8Array[];
        });
        get data(): Uint8Array;
        set data(value: Uint8Array);
        get signature(): Uint8Array[];
        set signature(value: Uint8Array[]);
        static fromObject(data: {
            data?: Uint8Array;
            signature?: Uint8Array[];
        }): PBFTCommitResult;
        toObject(): {
            data?: Uint8Array;
            signature?: Uint8Array[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PBFTCommitResult;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PBFTCommitResult;
    }
    class SRL extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            srAddress?: Uint8Array[];
        });
        get srAddress(): Uint8Array[];
        set srAddress(value: Uint8Array[]);
        static fromObject(data: {
            srAddress?: Uint8Array[];
        }): SRL;
        toObject(): {
            srAddress?: Uint8Array[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SRL;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SRL;
    }
    class Any extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            type_url?: string;
            value?: Uint8Array;
        });
        get type_url(): string;
        set type_url(value: string);
        get value(): Uint8Array;
        set value(value: Uint8Array);
        static fromObject(data: {
            type_url?: string;
            value?: Uint8Array;
        }): Any;
        toObject(): {
            type_url?: string;
            value?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Any;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Any;
    }
}
