import * as dependency_1 from "./Tron";
import * as dependency_2 from "./contract/asset_issue_contract";
import * as dependency_3 from "./contract/account_contract";
import * as dependency_4 from "./contract/witness_contract";
import * as dependency_5 from "./contract/balance_contract";
import * as dependency_6 from "./contract/proposal_contract";
import * as dependency_7 from "./contract/storage_contract";
import * as dependency_8 from "./contract/exchange_contract";
import * as dependency_9 from "./contract/market_contract";
import * as dependency_10 from "./contract/smart_contract";
import * as dependency_11 from "./contract/shield_contract";
import * as pb_1 from "google-protobuf";
import * as grpc_1 from "@grpc/grpc-js";
export declare namespace protocol {
    export class Return extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            result?: boolean;
            code?: Return.response_code;
            message?: Uint8Array;
        });
        get result(): boolean;
        set result(value: boolean);
        get code(): Return.response_code;
        set code(value: Return.response_code);
        get message(): Uint8Array;
        set message(value: Uint8Array);
        static fromObject(data: {
            result?: boolean;
            code?: Return.response_code;
            message?: Uint8Array;
        }): Return;
        toObject(): {
            result?: boolean;
            code?: Return.response_code;
            message?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Return;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Return;
    }
    export namespace Return {
        enum response_code {
            SUCCESS = 0,
            SIGERROR = 1,
            CONTRACT_VALIDATE_ERROR = 2,
            CONTRACT_EXE_ERROR = 3,
            BANDWITH_ERROR = 4,
            DUP_TRANSACTION_ERROR = 5,
            TAPOS_ERROR = 6,
            TOO_BIG_TRANSACTION_ERROR = 7,
            TRANSACTION_EXPIRATION_ERROR = 8,
            SERVER_BUSY = 9,
            NO_CONNECTION = 10,
            NOT_ENOUGH_EFFECTIVE_CONNECTION = 11,
            BLOCK_UNSOLIDIFIED = 12,
            OTHER_ERROR = 20
        }
    }
    export class BlockReference extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            block_num?: number;
            block_hash?: Uint8Array;
        });
        get block_num(): number;
        set block_num(value: number);
        get block_hash(): Uint8Array;
        set block_hash(value: Uint8Array);
        static fromObject(data: {
            block_num?: number;
            block_hash?: Uint8Array;
        }): BlockReference;
        toObject(): {
            block_num?: number;
            block_hash?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockReference;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BlockReference;
    }
    export class WitnessList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            witnesses?: dependency_1.protocol.Witness[];
        });
        get witnesses(): dependency_1.protocol.Witness[];
        set witnesses(value: dependency_1.protocol.Witness[]);
        static fromObject(data: {
            witnesses?: ReturnType<typeof dependency_1.protocol.Witness.prototype.toObject>[];
        }): WitnessList;
        toObject(): {
            witnesses?: ReturnType<typeof dependency_1.protocol.Witness.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): WitnessList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): WitnessList;
    }
    export class ProposalList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            proposals?: dependency_1.protocol.Proposal[];
        });
        get proposals(): dependency_1.protocol.Proposal[];
        set proposals(value: dependency_1.protocol.Proposal[]);
        static fromObject(data: {
            proposals?: ReturnType<typeof dependency_1.protocol.Proposal.prototype.toObject>[];
        }): ProposalList;
        toObject(): {
            proposals?: ReturnType<typeof dependency_1.protocol.Proposal.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ProposalList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ProposalList;
    }
    export class ExchangeList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            exchanges?: dependency_1.protocol.Exchange[];
        });
        get exchanges(): dependency_1.protocol.Exchange[];
        set exchanges(value: dependency_1.protocol.Exchange[]);
        static fromObject(data: {
            exchanges?: ReturnType<typeof dependency_1.protocol.Exchange.prototype.toObject>[];
        }): ExchangeList;
        toObject(): {
            exchanges?: ReturnType<typeof dependency_1.protocol.Exchange.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ExchangeList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ExchangeList;
    }
    export class AssetIssueList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            assetIssue?: dependency_2.protocol.AssetIssueContract[];
        });
        get assetIssue(): dependency_2.protocol.AssetIssueContract[];
        set assetIssue(value: dependency_2.protocol.AssetIssueContract[]);
        static fromObject(data: {
            assetIssue?: ReturnType<typeof dependency_2.protocol.AssetIssueContract.prototype.toObject>[];
        }): AssetIssueList;
        toObject(): {
            assetIssue?: ReturnType<typeof dependency_2.protocol.AssetIssueContract.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AssetIssueList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AssetIssueList;
    }
    export class BlockList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            block?: dependency_1.protocol.Block[];
        });
        get block(): dependency_1.protocol.Block[];
        set block(value: dependency_1.protocol.Block[]);
        static fromObject(data: {
            block?: ReturnType<typeof dependency_1.protocol.Block.prototype.toObject>[];
        }): BlockList;
        toObject(): {
            block?: ReturnType<typeof dependency_1.protocol.Block.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BlockList;
    }
    export class TransactionList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            transaction?: dependency_1.protocol.Transaction[];
        });
        get transaction(): dependency_1.protocol.Transaction[];
        set transaction(value: dependency_1.protocol.Transaction[]);
        static fromObject(data: {
            transaction?: ReturnType<typeof dependency_1.protocol.Transaction.prototype.toObject>[];
        }): TransactionList;
        toObject(): {
            transaction?: ReturnType<typeof dependency_1.protocol.Transaction.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TransactionList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TransactionList;
    }
    export class TransactionIdList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            txId?: string[];
        });
        get txId(): string[];
        set txId(value: string[]);
        static fromObject(data: {
            txId?: string[];
        }): TransactionIdList;
        toObject(): {
            txId?: string[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TransactionIdList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TransactionIdList;
    }
    export class DelegatedResourceMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            fromAddress?: Uint8Array;
            toAddress?: Uint8Array;
        });
        get fromAddress(): Uint8Array;
        set fromAddress(value: Uint8Array);
        get toAddress(): Uint8Array;
        set toAddress(value: Uint8Array);
        static fromObject(data: {
            fromAddress?: Uint8Array;
            toAddress?: Uint8Array;
        }): DelegatedResourceMessage;
        toObject(): {
            fromAddress?: Uint8Array;
            toAddress?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DelegatedResourceMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DelegatedResourceMessage;
    }
    export class DelegatedResourceList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            delegatedResource?: dependency_1.protocol.DelegatedResource[];
        });
        get delegatedResource(): dependency_1.protocol.DelegatedResource[];
        set delegatedResource(value: dependency_1.protocol.DelegatedResource[]);
        static fromObject(data: {
            delegatedResource?: ReturnType<typeof dependency_1.protocol.DelegatedResource.prototype.toObject>[];
        }): DelegatedResourceList;
        toObject(): {
            delegatedResource?: ReturnType<typeof dependency_1.protocol.DelegatedResource.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DelegatedResourceList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DelegatedResourceList;
    }
    export class GetAvailableUnfreezeCountRequestMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        static fromObject(data: {
            owner_address?: Uint8Array;
        }): GetAvailableUnfreezeCountRequestMessage;
        toObject(): {
            owner_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetAvailableUnfreezeCountRequestMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetAvailableUnfreezeCountRequestMessage;
    }
    export class GetAvailableUnfreezeCountResponseMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            count?: number;
        });
        get count(): number;
        set count(value: number);
        static fromObject(data: {
            count?: number;
        }): GetAvailableUnfreezeCountResponseMessage;
        toObject(): {
            count?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetAvailableUnfreezeCountResponseMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetAvailableUnfreezeCountResponseMessage;
    }
    export class CanDelegatedMaxSizeRequestMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            type?: number;
            owner_address?: Uint8Array;
        });
        get type(): number;
        set type(value: number);
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        static fromObject(data: {
            type?: number;
            owner_address?: Uint8Array;
        }): CanDelegatedMaxSizeRequestMessage;
        toObject(): {
            type?: number;
            owner_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CanDelegatedMaxSizeRequestMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CanDelegatedMaxSizeRequestMessage;
    }
    export class CanDelegatedMaxSizeResponseMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            max_size?: number;
        });
        get max_size(): number;
        set max_size(value: number);
        static fromObject(data: {
            max_size?: number;
        }): CanDelegatedMaxSizeResponseMessage;
        toObject(): {
            max_size?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CanDelegatedMaxSizeResponseMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CanDelegatedMaxSizeResponseMessage;
    }
    export class CanWithdrawUnfreezeAmountRequestMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            timestamp?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get timestamp(): number;
        set timestamp(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            timestamp?: number;
        }): CanWithdrawUnfreezeAmountRequestMessage;
        toObject(): {
            owner_address?: Uint8Array;
            timestamp?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CanWithdrawUnfreezeAmountRequestMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CanWithdrawUnfreezeAmountRequestMessage;
    }
    export class CanWithdrawUnfreezeAmountResponseMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            amount?: number;
        });
        get amount(): number;
        set amount(value: number);
        static fromObject(data: {
            amount?: number;
        }): CanWithdrawUnfreezeAmountResponseMessage;
        toObject(): {
            amount?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CanWithdrawUnfreezeAmountResponseMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CanWithdrawUnfreezeAmountResponseMessage;
    }
    export class PricesResponseMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            prices?: string;
        });
        get prices(): string;
        set prices(value: string);
        static fromObject(data: {
            prices?: string;
        }): PricesResponseMessage;
        toObject(): {
            prices?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PricesResponseMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PricesResponseMessage;
    }
    export class NodeList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            nodes?: Node[];
        });
        get nodes(): Node[];
        set nodes(value: Node[]);
        static fromObject(data: {
            nodes?: ReturnType<typeof Node.prototype.toObject>[];
        }): NodeList;
        toObject(): {
            nodes?: ReturnType<typeof Node.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NodeList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NodeList;
    }
    export class Node extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            address?: Address;
        });
        get address(): Address;
        set address(value: Address);
        get has_address(): boolean;
        static fromObject(data: {
            address?: ReturnType<typeof Address.prototype.toObject>;
        }): Node;
        toObject(): {
            address?: ReturnType<typeof Address.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Node;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Node;
    }
    export class Address extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            host?: Uint8Array;
            port?: number;
        });
        get host(): Uint8Array;
        set host(value: Uint8Array);
        get port(): number;
        set port(value: number);
        static fromObject(data: {
            host?: Uint8Array;
            port?: number;
        }): Address;
        toObject(): {
            host?: Uint8Array;
            port?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Address;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Address;
    }
    export class EmptyMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {});
        static fromObject(data: {}): EmptyMessage;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EmptyMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): EmptyMessage;
    }
    export class NumberMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            num?: number;
        });
        get num(): number;
        set num(value: number);
        static fromObject(data: {
            num?: number;
        }): NumberMessage;
        toObject(): {
            num?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NumberMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NumberMessage;
    }
    export class BytesMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            value?: Uint8Array;
        });
        get value(): Uint8Array;
        set value(value: Uint8Array);
        static fromObject(data: {
            value?: Uint8Array;
        }): BytesMessage;
        toObject(): {
            value?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BytesMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BytesMessage;
    }
    export class TimeMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            beginInMilliseconds?: number;
            endInMilliseconds?: number;
        });
        get beginInMilliseconds(): number;
        set beginInMilliseconds(value: number);
        get endInMilliseconds(): number;
        set endInMilliseconds(value: number);
        static fromObject(data: {
            beginInMilliseconds?: number;
            endInMilliseconds?: number;
        }): TimeMessage;
        toObject(): {
            beginInMilliseconds?: number;
            endInMilliseconds?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TimeMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TimeMessage;
    }
    export class BlockReq extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            id_or_num?: string;
            detail?: boolean;
        });
        get id_or_num(): string;
        set id_or_num(value: string);
        get detail(): boolean;
        set detail(value: boolean);
        static fromObject(data: {
            id_or_num?: string;
            detail?: boolean;
        }): BlockReq;
        toObject(): {
            id_or_num?: string;
            detail?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockReq;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BlockReq;
    }
    export class BlockLimit extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            startNum?: number;
            endNum?: number;
        });
        get startNum(): number;
        set startNum(value: number);
        get endNum(): number;
        set endNum(value: number);
        static fromObject(data: {
            startNum?: number;
            endNum?: number;
        }): BlockLimit;
        toObject(): {
            startNum?: number;
            endNum?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockLimit;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BlockLimit;
    }
    export class TransactionLimit extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            transactionId?: Uint8Array;
            limitNum?: number;
        });
        get transactionId(): Uint8Array;
        set transactionId(value: Uint8Array);
        get limitNum(): number;
        set limitNum(value: number);
        static fromObject(data: {
            transactionId?: Uint8Array;
            limitNum?: number;
        }): TransactionLimit;
        toObject(): {
            transactionId?: Uint8Array;
            limitNum?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TransactionLimit;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TransactionLimit;
    }
    export class AccountPaginated extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            account?: dependency_1.protocol.Account;
            offset?: number;
            limit?: number;
        });
        get account(): dependency_1.protocol.Account;
        set account(value: dependency_1.protocol.Account);
        get has_account(): boolean;
        get offset(): number;
        set offset(value: number);
        get limit(): number;
        set limit(value: number);
        static fromObject(data: {
            account?: ReturnType<typeof dependency_1.protocol.Account.prototype.toObject>;
            offset?: number;
            limit?: number;
        }): AccountPaginated;
        toObject(): {
            account?: ReturnType<typeof dependency_1.protocol.Account.prototype.toObject>;
            offset?: number;
            limit?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AccountPaginated;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AccountPaginated;
    }
    export class TimePaginatedMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            timeMessage?: TimeMessage;
            offset?: number;
            limit?: number;
        });
        get timeMessage(): TimeMessage;
        set timeMessage(value: TimeMessage);
        get has_timeMessage(): boolean;
        get offset(): number;
        set offset(value: number);
        get limit(): number;
        set limit(value: number);
        static fromObject(data: {
            timeMessage?: ReturnType<typeof TimeMessage.prototype.toObject>;
            offset?: number;
            limit?: number;
        }): TimePaginatedMessage;
        toObject(): {
            timeMessage?: ReturnType<typeof TimeMessage.prototype.toObject>;
            offset?: number;
            limit?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TimePaginatedMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TimePaginatedMessage;
    }
    export class AccountNetMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            freeNetUsed?: number;
            freeNetLimit?: number;
            NetUsed?: number;
            NetLimit?: number;
            assetNetUsed?: Map<string, number>;
            assetNetLimit?: Map<string, number>;
            TotalNetLimit?: number;
            TotalNetWeight?: number;
        });
        get freeNetUsed(): number;
        set freeNetUsed(value: number);
        get freeNetLimit(): number;
        set freeNetLimit(value: number);
        get NetUsed(): number;
        set NetUsed(value: number);
        get NetLimit(): number;
        set NetLimit(value: number);
        get assetNetUsed(): Map<string, number>;
        set assetNetUsed(value: Map<string, number>);
        get assetNetLimit(): Map<string, number>;
        set assetNetLimit(value: Map<string, number>);
        get TotalNetLimit(): number;
        set TotalNetLimit(value: number);
        get TotalNetWeight(): number;
        set TotalNetWeight(value: number);
        static fromObject(data: {
            freeNetUsed?: number;
            freeNetLimit?: number;
            NetUsed?: number;
            NetLimit?: number;
            assetNetUsed?: {
                [key: string]: number;
            };
            assetNetLimit?: {
                [key: string]: number;
            };
            TotalNetLimit?: number;
            TotalNetWeight?: number;
        }): AccountNetMessage;
        toObject(): {
            freeNetUsed?: number;
            freeNetLimit?: number;
            NetUsed?: number;
            NetLimit?: number;
            assetNetUsed?: {
                [key: string]: number;
            };
            assetNetLimit?: {
                [key: string]: number;
            };
            TotalNetLimit?: number;
            TotalNetWeight?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AccountNetMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AccountNetMessage;
    }
    export class AccountResourceMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            freeNetUsed?: number;
            freeNetLimit?: number;
            NetUsed?: number;
            NetLimit?: number;
            assetNetUsed?: Map<string, number>;
            assetNetLimit?: Map<string, number>;
            TotalNetLimit?: number;
            TotalNetWeight?: number;
            TotalTronPowerWeight?: number;
            tronPowerUsed?: number;
            tronPowerLimit?: number;
            EnergyUsed?: number;
            EnergyLimit?: number;
            TotalEnergyLimit?: number;
            TotalEnergyWeight?: number;
            storageUsed?: number;
            storageLimit?: number;
        });
        get freeNetUsed(): number;
        set freeNetUsed(value: number);
        get freeNetLimit(): number;
        set freeNetLimit(value: number);
        get NetUsed(): number;
        set NetUsed(value: number);
        get NetLimit(): number;
        set NetLimit(value: number);
        get assetNetUsed(): Map<string, number>;
        set assetNetUsed(value: Map<string, number>);
        get assetNetLimit(): Map<string, number>;
        set assetNetLimit(value: Map<string, number>);
        get TotalNetLimit(): number;
        set TotalNetLimit(value: number);
        get TotalNetWeight(): number;
        set TotalNetWeight(value: number);
        get TotalTronPowerWeight(): number;
        set TotalTronPowerWeight(value: number);
        get tronPowerUsed(): number;
        set tronPowerUsed(value: number);
        get tronPowerLimit(): number;
        set tronPowerLimit(value: number);
        get EnergyUsed(): number;
        set EnergyUsed(value: number);
        get EnergyLimit(): number;
        set EnergyLimit(value: number);
        get TotalEnergyLimit(): number;
        set TotalEnergyLimit(value: number);
        get TotalEnergyWeight(): number;
        set TotalEnergyWeight(value: number);
        get storageUsed(): number;
        set storageUsed(value: number);
        get storageLimit(): number;
        set storageLimit(value: number);
        static fromObject(data: {
            freeNetUsed?: number;
            freeNetLimit?: number;
            NetUsed?: number;
            NetLimit?: number;
            assetNetUsed?: {
                [key: string]: number;
            };
            assetNetLimit?: {
                [key: string]: number;
            };
            TotalNetLimit?: number;
            TotalNetWeight?: number;
            TotalTronPowerWeight?: number;
            tronPowerUsed?: number;
            tronPowerLimit?: number;
            EnergyUsed?: number;
            EnergyLimit?: number;
            TotalEnergyLimit?: number;
            TotalEnergyWeight?: number;
            storageUsed?: number;
            storageLimit?: number;
        }): AccountResourceMessage;
        toObject(): {
            freeNetUsed?: number;
            freeNetLimit?: number;
            NetUsed?: number;
            NetLimit?: number;
            assetNetUsed?: {
                [key: string]: number;
            };
            assetNetLimit?: {
                [key: string]: number;
            };
            TotalNetLimit?: number;
            TotalNetWeight?: number;
            TotalTronPowerWeight?: number;
            tronPowerUsed?: number;
            tronPowerLimit?: number;
            EnergyUsed?: number;
            EnergyLimit?: number;
            TotalEnergyLimit?: number;
            TotalEnergyWeight?: number;
            storageUsed?: number;
            storageLimit?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AccountResourceMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AccountResourceMessage;
    }
    export class PaginatedMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            offset?: number;
            limit?: number;
        });
        get offset(): number;
        set offset(value: number);
        get limit(): number;
        set limit(value: number);
        static fromObject(data: {
            offset?: number;
            limit?: number;
        }): PaginatedMessage;
        toObject(): {
            offset?: number;
            limit?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PaginatedMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PaginatedMessage;
    }
    export class TransactionExtention extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            transaction?: dependency_1.protocol.Transaction;
            txid?: Uint8Array;
            constant_result?: Uint8Array[];
            result?: Return;
            energy_used?: number;
            logs?: dependency_1.protocol.TransactionInfo.Log[];
            internal_transactions?: dependency_1.protocol.InternalTransaction[];
            energy_penalty?: number;
        });
        get transaction(): dependency_1.protocol.Transaction;
        set transaction(value: dependency_1.protocol.Transaction);
        get has_transaction(): boolean;
        get txid(): Uint8Array;
        set txid(value: Uint8Array);
        get constant_result(): Uint8Array[];
        set constant_result(value: Uint8Array[]);
        get result(): Return;
        set result(value: Return);
        get has_result(): boolean;
        get energy_used(): number;
        set energy_used(value: number);
        get logs(): dependency_1.protocol.TransactionInfo.Log[];
        set logs(value: dependency_1.protocol.TransactionInfo.Log[]);
        get internal_transactions(): dependency_1.protocol.InternalTransaction[];
        set internal_transactions(value: dependency_1.protocol.InternalTransaction[]);
        get energy_penalty(): number;
        set energy_penalty(value: number);
        static fromObject(data: {
            transaction?: ReturnType<typeof dependency_1.protocol.Transaction.prototype.toObject>;
            txid?: Uint8Array;
            constant_result?: Uint8Array[];
            result?: ReturnType<typeof Return.prototype.toObject>;
            energy_used?: number;
            logs?: ReturnType<typeof dependency_1.protocol.TransactionInfo.Log.prototype.toObject>[];
            internal_transactions?: ReturnType<typeof dependency_1.protocol.InternalTransaction.prototype.toObject>[];
            energy_penalty?: number;
        }): TransactionExtention;
        toObject(): {
            transaction?: ReturnType<typeof dependency_1.protocol.Transaction.prototype.toObject>;
            txid?: Uint8Array;
            constant_result?: Uint8Array[];
            result?: ReturnType<typeof Return.prototype.toObject>;
            energy_used?: number;
            logs?: ReturnType<typeof dependency_1.protocol.TransactionInfo.Log.prototype.toObject>[];
            internal_transactions?: ReturnType<typeof dependency_1.protocol.InternalTransaction.prototype.toObject>[];
            energy_penalty?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TransactionExtention;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TransactionExtention;
    }
    export class EstimateEnergyMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            result?: Return;
            energy_required?: number;
        });
        get result(): Return;
        set result(value: Return);
        get has_result(): boolean;
        get energy_required(): number;
        set energy_required(value: number);
        static fromObject(data: {
            result?: ReturnType<typeof Return.prototype.toObject>;
            energy_required?: number;
        }): EstimateEnergyMessage;
        toObject(): {
            result?: ReturnType<typeof Return.prototype.toObject>;
            energy_required?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EstimateEnergyMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): EstimateEnergyMessage;
    }
    export class BlockExtention extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            transactions?: TransactionExtention[];
            block_header?: dependency_1.protocol.BlockHeader;
            blockid?: Uint8Array;
        });
        get transactions(): TransactionExtention[];
        set transactions(value: TransactionExtention[]);
        get block_header(): dependency_1.protocol.BlockHeader;
        set block_header(value: dependency_1.protocol.BlockHeader);
        get has_block_header(): boolean;
        get blockid(): Uint8Array;
        set blockid(value: Uint8Array);
        static fromObject(data: {
            transactions?: ReturnType<typeof TransactionExtention.prototype.toObject>[];
            block_header?: ReturnType<typeof dependency_1.protocol.BlockHeader.prototype.toObject>;
            blockid?: Uint8Array;
        }): BlockExtention;
        toObject(): {
            transactions?: ReturnType<typeof TransactionExtention.prototype.toObject>[];
            block_header?: ReturnType<typeof dependency_1.protocol.BlockHeader.prototype.toObject>;
            blockid?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockExtention;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BlockExtention;
    }
    export class BlockListExtention extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            block?: BlockExtention[];
        });
        get block(): BlockExtention[];
        set block(value: BlockExtention[]);
        static fromObject(data: {
            block?: ReturnType<typeof BlockExtention.prototype.toObject>[];
        }): BlockListExtention;
        toObject(): {
            block?: ReturnType<typeof BlockExtention.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockListExtention;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BlockListExtention;
    }
    export class TransactionListExtention extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            transaction?: TransactionExtention[];
        });
        get transaction(): TransactionExtention[];
        set transaction(value: TransactionExtention[]);
        static fromObject(data: {
            transaction?: ReturnType<typeof TransactionExtention.prototype.toObject>[];
        }): TransactionListExtention;
        toObject(): {
            transaction?: ReturnType<typeof TransactionExtention.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TransactionListExtention;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TransactionListExtention;
    }
    export class BlockIncrementalMerkleTree extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            number?: number;
            merkleTree?: dependency_11.protocol.IncrementalMerkleTree;
        });
        get number(): number;
        set number(value: number);
        get merkleTree(): dependency_11.protocol.IncrementalMerkleTree;
        set merkleTree(value: dependency_11.protocol.IncrementalMerkleTree);
        get has_merkleTree(): boolean;
        static fromObject(data: {
            number?: number;
            merkleTree?: ReturnType<typeof dependency_11.protocol.IncrementalMerkleTree.prototype.toObject>;
        }): BlockIncrementalMerkleTree;
        toObject(): {
            number?: number;
            merkleTree?: ReturnType<typeof dependency_11.protocol.IncrementalMerkleTree.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockIncrementalMerkleTree;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BlockIncrementalMerkleTree;
    }
    export class TransactionSignWeight extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            permission?: dependency_1.protocol.Permission;
            approved_list?: Uint8Array[];
            current_weight?: number;
            result?: TransactionSignWeight.Result;
            transaction?: TransactionExtention;
        });
        get permission(): dependency_1.protocol.Permission;
        set permission(value: dependency_1.protocol.Permission);
        get has_permission(): boolean;
        get approved_list(): Uint8Array[];
        set approved_list(value: Uint8Array[]);
        get current_weight(): number;
        set current_weight(value: number);
        get result(): TransactionSignWeight.Result;
        set result(value: TransactionSignWeight.Result);
        get has_result(): boolean;
        get transaction(): TransactionExtention;
        set transaction(value: TransactionExtention);
        get has_transaction(): boolean;
        static fromObject(data: {
            permission?: ReturnType<typeof dependency_1.protocol.Permission.prototype.toObject>;
            approved_list?: Uint8Array[];
            current_weight?: number;
            result?: ReturnType<typeof TransactionSignWeight.Result.prototype.toObject>;
            transaction?: ReturnType<typeof TransactionExtention.prototype.toObject>;
        }): TransactionSignWeight;
        toObject(): {
            permission?: ReturnType<typeof dependency_1.protocol.Permission.prototype.toObject>;
            approved_list?: Uint8Array[];
            current_weight?: number;
            result?: ReturnType<typeof TransactionSignWeight.Result.prototype.toObject>;
            transaction?: ReturnType<typeof TransactionExtention.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TransactionSignWeight;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TransactionSignWeight;
    }
    export namespace TransactionSignWeight {
        class Result extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                code?: TransactionSignWeight.Result.response_code;
                message?: string;
            });
            get code(): TransactionSignWeight.Result.response_code;
            set code(value: TransactionSignWeight.Result.response_code);
            get message(): string;
            set message(value: string);
            static fromObject(data: {
                code?: TransactionSignWeight.Result.response_code;
                message?: string;
            }): Result;
            toObject(): {
                code?: TransactionSignWeight.Result.response_code;
                message?: string;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Result;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): Result;
        }
        namespace Result {
            enum response_code {
                ENOUGH_PERMISSION = 0,
                NOT_ENOUGH_PERMISSION = 1,
                SIGNATURE_FORMAT_ERROR = 2,
                COMPUTE_ADDRESS_ERROR = 3,
                PERMISSION_ERROR = 4,
                OTHER_ERROR = 20
            }
        }
    }
    export class TransactionApprovedList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            approved_list?: Uint8Array[];
            result?: TransactionApprovedList.Result;
            transaction?: TransactionExtention;
        });
        get approved_list(): Uint8Array[];
        set approved_list(value: Uint8Array[]);
        get result(): TransactionApprovedList.Result;
        set result(value: TransactionApprovedList.Result);
        get has_result(): boolean;
        get transaction(): TransactionExtention;
        set transaction(value: TransactionExtention);
        get has_transaction(): boolean;
        static fromObject(data: {
            approved_list?: Uint8Array[];
            result?: ReturnType<typeof TransactionApprovedList.Result.prototype.toObject>;
            transaction?: ReturnType<typeof TransactionExtention.prototype.toObject>;
        }): TransactionApprovedList;
        toObject(): {
            approved_list?: Uint8Array[];
            result?: ReturnType<typeof TransactionApprovedList.Result.prototype.toObject>;
            transaction?: ReturnType<typeof TransactionExtention.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TransactionApprovedList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TransactionApprovedList;
    }
    export namespace TransactionApprovedList {
        class Result extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                code?: TransactionApprovedList.Result.response_code;
                message?: string;
            });
            get code(): TransactionApprovedList.Result.response_code;
            set code(value: TransactionApprovedList.Result.response_code);
            get message(): string;
            set message(value: string);
            static fromObject(data: {
                code?: TransactionApprovedList.Result.response_code;
                message?: string;
            }): Result;
            toObject(): {
                code?: TransactionApprovedList.Result.response_code;
                message?: string;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Result;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): Result;
        }
        namespace Result {
            enum response_code {
                SUCCESS = 0,
                SIGNATURE_FORMAT_ERROR = 1,
                COMPUTE_ADDRESS_ERROR = 2,
                OTHER_ERROR = 20
            }
        }
    }
    export class IvkDecryptParameters extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            start_block_index?: number;
            end_block_index?: number;
            ivk?: Uint8Array;
        });
        get start_block_index(): number;
        set start_block_index(value: number);
        get end_block_index(): number;
        set end_block_index(value: number);
        get ivk(): Uint8Array;
        set ivk(value: Uint8Array);
        static fromObject(data: {
            start_block_index?: number;
            end_block_index?: number;
            ivk?: Uint8Array;
        }): IvkDecryptParameters;
        toObject(): {
            start_block_index?: number;
            end_block_index?: number;
            ivk?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IvkDecryptParameters;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): IvkDecryptParameters;
    }
    export class IvkDecryptAndMarkParameters extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            start_block_index?: number;
            end_block_index?: number;
            ivk?: Uint8Array;
            ak?: Uint8Array;
            nk?: Uint8Array;
        });
        get start_block_index(): number;
        set start_block_index(value: number);
        get end_block_index(): number;
        set end_block_index(value: number);
        get ivk(): Uint8Array;
        set ivk(value: Uint8Array);
        get ak(): Uint8Array;
        set ak(value: Uint8Array);
        get nk(): Uint8Array;
        set nk(value: Uint8Array);
        static fromObject(data: {
            start_block_index?: number;
            end_block_index?: number;
            ivk?: Uint8Array;
            ak?: Uint8Array;
            nk?: Uint8Array;
        }): IvkDecryptAndMarkParameters;
        toObject(): {
            start_block_index?: number;
            end_block_index?: number;
            ivk?: Uint8Array;
            ak?: Uint8Array;
            nk?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IvkDecryptAndMarkParameters;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): IvkDecryptAndMarkParameters;
    }
    export class OvkDecryptParameters extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            start_block_index?: number;
            end_block_index?: number;
            ovk?: Uint8Array;
        });
        get start_block_index(): number;
        set start_block_index(value: number);
        get end_block_index(): number;
        set end_block_index(value: number);
        get ovk(): Uint8Array;
        set ovk(value: Uint8Array);
        static fromObject(data: {
            start_block_index?: number;
            end_block_index?: number;
            ovk?: Uint8Array;
        }): OvkDecryptParameters;
        toObject(): {
            start_block_index?: number;
            end_block_index?: number;
            ovk?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): OvkDecryptParameters;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): OvkDecryptParameters;
    }
    export class DecryptNotes extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            noteTxs?: DecryptNotes.NoteTx[];
        });
        get noteTxs(): DecryptNotes.NoteTx[];
        set noteTxs(value: DecryptNotes.NoteTx[]);
        static fromObject(data: {
            noteTxs?: ReturnType<typeof DecryptNotes.NoteTx.prototype.toObject>[];
        }): DecryptNotes;
        toObject(): {
            noteTxs?: ReturnType<typeof DecryptNotes.NoteTx.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DecryptNotes;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DecryptNotes;
    }
    export namespace DecryptNotes {
        class NoteTx extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                note?: Note;
                txid?: Uint8Array;
                index?: number;
            });
            get note(): Note;
            set note(value: Note);
            get has_note(): boolean;
            get txid(): Uint8Array;
            set txid(value: Uint8Array);
            get index(): number;
            set index(value: number);
            static fromObject(data: {
                note?: ReturnType<typeof Note.prototype.toObject>;
                txid?: Uint8Array;
                index?: number;
            }): NoteTx;
            toObject(): {
                note?: ReturnType<typeof Note.prototype.toObject>;
                txid?: Uint8Array;
                index?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NoteTx;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): NoteTx;
        }
    }
    export class DecryptNotesMarked extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            noteTxs?: DecryptNotesMarked.NoteTx[];
        });
        get noteTxs(): DecryptNotesMarked.NoteTx[];
        set noteTxs(value: DecryptNotesMarked.NoteTx[]);
        static fromObject(data: {
            noteTxs?: ReturnType<typeof DecryptNotesMarked.NoteTx.prototype.toObject>[];
        }): DecryptNotesMarked;
        toObject(): {
            noteTxs?: ReturnType<typeof DecryptNotesMarked.NoteTx.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DecryptNotesMarked;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DecryptNotesMarked;
    }
    export namespace DecryptNotesMarked {
        class NoteTx extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                note?: Note;
                txid?: Uint8Array;
                index?: number;
                is_spend?: boolean;
            });
            get note(): Note;
            set note(value: Note);
            get has_note(): boolean;
            get txid(): Uint8Array;
            set txid(value: Uint8Array);
            get index(): number;
            set index(value: number);
            get is_spend(): boolean;
            set is_spend(value: boolean);
            static fromObject(data: {
                note?: ReturnType<typeof Note.prototype.toObject>;
                txid?: Uint8Array;
                index?: number;
                is_spend?: boolean;
            }): NoteTx;
            toObject(): {
                note?: ReturnType<typeof Note.prototype.toObject>;
                txid?: Uint8Array;
                index?: number;
                is_spend?: boolean;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NoteTx;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): NoteTx;
        }
    }
    export class Note extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            value?: number;
            payment_address?: string;
            rcm?: Uint8Array;
            memo?: Uint8Array;
        });
        get value(): number;
        set value(value: number);
        get payment_address(): string;
        set payment_address(value: string);
        get rcm(): Uint8Array;
        set rcm(value: Uint8Array);
        get memo(): Uint8Array;
        set memo(value: Uint8Array);
        static fromObject(data: {
            value?: number;
            payment_address?: string;
            rcm?: Uint8Array;
            memo?: Uint8Array;
        }): Note;
        toObject(): {
            value?: number;
            payment_address?: string;
            rcm?: Uint8Array;
            memo?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Note;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Note;
    }
    export class SpendNote extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            note?: Note;
            alpha?: Uint8Array;
            voucher?: dependency_11.protocol.IncrementalMerkleVoucher;
            path?: Uint8Array;
        });
        get note(): Note;
        set note(value: Note);
        get has_note(): boolean;
        get alpha(): Uint8Array;
        set alpha(value: Uint8Array);
        get voucher(): dependency_11.protocol.IncrementalMerkleVoucher;
        set voucher(value: dependency_11.protocol.IncrementalMerkleVoucher);
        get has_voucher(): boolean;
        get path(): Uint8Array;
        set path(value: Uint8Array);
        static fromObject(data: {
            note?: ReturnType<typeof Note.prototype.toObject>;
            alpha?: Uint8Array;
            voucher?: ReturnType<typeof dependency_11.protocol.IncrementalMerkleVoucher.prototype.toObject>;
            path?: Uint8Array;
        }): SpendNote;
        toObject(): {
            note?: ReturnType<typeof Note.prototype.toObject>;
            alpha?: Uint8Array;
            voucher?: ReturnType<typeof dependency_11.protocol.IncrementalMerkleVoucher.prototype.toObject>;
            path?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SpendNote;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SpendNote;
    }
    export class ReceiveNote extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            note?: Note;
        });
        get note(): Note;
        set note(value: Note);
        get has_note(): boolean;
        static fromObject(data: {
            note?: ReturnType<typeof Note.prototype.toObject>;
        }): ReceiveNote;
        toObject(): {
            note?: ReturnType<typeof Note.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ReceiveNote;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ReceiveNote;
    }
    export class PrivateParameters extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            transparent_from_address?: Uint8Array;
            ask?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
            from_amount?: number;
            shielded_spends?: SpendNote[];
            shielded_receives?: ReceiveNote[];
            transparent_to_address?: Uint8Array;
            to_amount?: number;
            timeout?: number;
        });
        get transparent_from_address(): Uint8Array;
        set transparent_from_address(value: Uint8Array);
        get ask(): Uint8Array;
        set ask(value: Uint8Array);
        get nsk(): Uint8Array;
        set nsk(value: Uint8Array);
        get ovk(): Uint8Array;
        set ovk(value: Uint8Array);
        get from_amount(): number;
        set from_amount(value: number);
        get shielded_spends(): SpendNote[];
        set shielded_spends(value: SpendNote[]);
        get shielded_receives(): ReceiveNote[];
        set shielded_receives(value: ReceiveNote[]);
        get transparent_to_address(): Uint8Array;
        set transparent_to_address(value: Uint8Array);
        get to_amount(): number;
        set to_amount(value: number);
        get timeout(): number;
        set timeout(value: number);
        static fromObject(data: {
            transparent_from_address?: Uint8Array;
            ask?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
            from_amount?: number;
            shielded_spends?: ReturnType<typeof SpendNote.prototype.toObject>[];
            shielded_receives?: ReturnType<typeof ReceiveNote.prototype.toObject>[];
            transparent_to_address?: Uint8Array;
            to_amount?: number;
            timeout?: number;
        }): PrivateParameters;
        toObject(): {
            transparent_from_address?: Uint8Array;
            ask?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
            from_amount?: number;
            shielded_spends?: ReturnType<typeof SpendNote.prototype.toObject>[];
            shielded_receives?: ReturnType<typeof ReceiveNote.prototype.toObject>[];
            transparent_to_address?: Uint8Array;
            to_amount?: number;
            timeout?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PrivateParameters;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PrivateParameters;
    }
    export class PrivateParametersWithoutAsk extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            transparent_from_address?: Uint8Array;
            ak?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
            from_amount?: number;
            shielded_spends?: SpendNote[];
            shielded_receives?: ReceiveNote[];
            transparent_to_address?: Uint8Array;
            to_amount?: number;
            timeout?: number;
        });
        get transparent_from_address(): Uint8Array;
        set transparent_from_address(value: Uint8Array);
        get ak(): Uint8Array;
        set ak(value: Uint8Array);
        get nsk(): Uint8Array;
        set nsk(value: Uint8Array);
        get ovk(): Uint8Array;
        set ovk(value: Uint8Array);
        get from_amount(): number;
        set from_amount(value: number);
        get shielded_spends(): SpendNote[];
        set shielded_spends(value: SpendNote[]);
        get shielded_receives(): ReceiveNote[];
        set shielded_receives(value: ReceiveNote[]);
        get transparent_to_address(): Uint8Array;
        set transparent_to_address(value: Uint8Array);
        get to_amount(): number;
        set to_amount(value: number);
        get timeout(): number;
        set timeout(value: number);
        static fromObject(data: {
            transparent_from_address?: Uint8Array;
            ak?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
            from_amount?: number;
            shielded_spends?: ReturnType<typeof SpendNote.prototype.toObject>[];
            shielded_receives?: ReturnType<typeof ReceiveNote.prototype.toObject>[];
            transparent_to_address?: Uint8Array;
            to_amount?: number;
            timeout?: number;
        }): PrivateParametersWithoutAsk;
        toObject(): {
            transparent_from_address?: Uint8Array;
            ak?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
            from_amount?: number;
            shielded_spends?: ReturnType<typeof SpendNote.prototype.toObject>[];
            shielded_receives?: ReturnType<typeof ReceiveNote.prototype.toObject>[];
            transparent_to_address?: Uint8Array;
            to_amount?: number;
            timeout?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PrivateParametersWithoutAsk;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PrivateParametersWithoutAsk;
    }
    export class SpendAuthSigParameters extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            ask?: Uint8Array;
            tx_hash?: Uint8Array;
            alpha?: Uint8Array;
        });
        get ask(): Uint8Array;
        set ask(value: Uint8Array);
        get tx_hash(): Uint8Array;
        set tx_hash(value: Uint8Array);
        get alpha(): Uint8Array;
        set alpha(value: Uint8Array);
        static fromObject(data: {
            ask?: Uint8Array;
            tx_hash?: Uint8Array;
            alpha?: Uint8Array;
        }): SpendAuthSigParameters;
        toObject(): {
            ask?: Uint8Array;
            tx_hash?: Uint8Array;
            alpha?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SpendAuthSigParameters;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SpendAuthSigParameters;
    }
    export class NfParameters extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            note?: Note;
            voucher?: dependency_11.protocol.IncrementalMerkleVoucher;
            ak?: Uint8Array;
            nk?: Uint8Array;
        });
        get note(): Note;
        set note(value: Note);
        get has_note(): boolean;
        get voucher(): dependency_11.protocol.IncrementalMerkleVoucher;
        set voucher(value: dependency_11.protocol.IncrementalMerkleVoucher);
        get has_voucher(): boolean;
        get ak(): Uint8Array;
        set ak(value: Uint8Array);
        get nk(): Uint8Array;
        set nk(value: Uint8Array);
        static fromObject(data: {
            note?: ReturnType<typeof Note.prototype.toObject>;
            voucher?: ReturnType<typeof dependency_11.protocol.IncrementalMerkleVoucher.prototype.toObject>;
            ak?: Uint8Array;
            nk?: Uint8Array;
        }): NfParameters;
        toObject(): {
            note?: ReturnType<typeof Note.prototype.toObject>;
            voucher?: ReturnType<typeof dependency_11.protocol.IncrementalMerkleVoucher.prototype.toObject>;
            ak?: Uint8Array;
            nk?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NfParameters;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NfParameters;
    }
    export class ExpandedSpendingKeyMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            ask?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
        });
        get ask(): Uint8Array;
        set ask(value: Uint8Array);
        get nsk(): Uint8Array;
        set nsk(value: Uint8Array);
        get ovk(): Uint8Array;
        set ovk(value: Uint8Array);
        static fromObject(data: {
            ask?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
        }): ExpandedSpendingKeyMessage;
        toObject(): {
            ask?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ExpandedSpendingKeyMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ExpandedSpendingKeyMessage;
    }
    export class ViewingKeyMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            ak?: Uint8Array;
            nk?: Uint8Array;
        });
        get ak(): Uint8Array;
        set ak(value: Uint8Array);
        get nk(): Uint8Array;
        set nk(value: Uint8Array);
        static fromObject(data: {
            ak?: Uint8Array;
            nk?: Uint8Array;
        }): ViewingKeyMessage;
        toObject(): {
            ak?: Uint8Array;
            nk?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ViewingKeyMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ViewingKeyMessage;
    }
    export class IncomingViewingKeyMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            ivk?: Uint8Array;
        });
        get ivk(): Uint8Array;
        set ivk(value: Uint8Array);
        static fromObject(data: {
            ivk?: Uint8Array;
        }): IncomingViewingKeyMessage;
        toObject(): {
            ivk?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IncomingViewingKeyMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): IncomingViewingKeyMessage;
    }
    export class DiversifierMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            d?: Uint8Array;
        });
        get d(): Uint8Array;
        set d(value: Uint8Array);
        static fromObject(data: {
            d?: Uint8Array;
        }): DiversifierMessage;
        toObject(): {
            d?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DiversifierMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DiversifierMessage;
    }
    export class IncomingViewingKeyDiversifierMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            ivk?: IncomingViewingKeyMessage;
            d?: DiversifierMessage;
        });
        get ivk(): IncomingViewingKeyMessage;
        set ivk(value: IncomingViewingKeyMessage);
        get has_ivk(): boolean;
        get d(): DiversifierMessage;
        set d(value: DiversifierMessage);
        get has_d(): boolean;
        static fromObject(data: {
            ivk?: ReturnType<typeof IncomingViewingKeyMessage.prototype.toObject>;
            d?: ReturnType<typeof DiversifierMessage.prototype.toObject>;
        }): IncomingViewingKeyDiversifierMessage;
        toObject(): {
            ivk?: ReturnType<typeof IncomingViewingKeyMessage.prototype.toObject>;
            d?: ReturnType<typeof DiversifierMessage.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IncomingViewingKeyDiversifierMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): IncomingViewingKeyDiversifierMessage;
    }
    export class PaymentAddressMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            d?: DiversifierMessage;
            pkD?: Uint8Array;
            payment_address?: string;
        });
        get d(): DiversifierMessage;
        set d(value: DiversifierMessage);
        get has_d(): boolean;
        get pkD(): Uint8Array;
        set pkD(value: Uint8Array);
        get payment_address(): string;
        set payment_address(value: string);
        static fromObject(data: {
            d?: ReturnType<typeof DiversifierMessage.prototype.toObject>;
            pkD?: Uint8Array;
            payment_address?: string;
        }): PaymentAddressMessage;
        toObject(): {
            d?: ReturnType<typeof DiversifierMessage.prototype.toObject>;
            pkD?: Uint8Array;
            payment_address?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PaymentAddressMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PaymentAddressMessage;
    }
    export class ShieldedAddressInfo extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            sk?: Uint8Array;
            ask?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
            ak?: Uint8Array;
            nk?: Uint8Array;
            ivk?: Uint8Array;
            d?: Uint8Array;
            pkD?: Uint8Array;
            payment_address?: string;
        });
        get sk(): Uint8Array;
        set sk(value: Uint8Array);
        get ask(): Uint8Array;
        set ask(value: Uint8Array);
        get nsk(): Uint8Array;
        set nsk(value: Uint8Array);
        get ovk(): Uint8Array;
        set ovk(value: Uint8Array);
        get ak(): Uint8Array;
        set ak(value: Uint8Array);
        get nk(): Uint8Array;
        set nk(value: Uint8Array);
        get ivk(): Uint8Array;
        set ivk(value: Uint8Array);
        get d(): Uint8Array;
        set d(value: Uint8Array);
        get pkD(): Uint8Array;
        set pkD(value: Uint8Array);
        get payment_address(): string;
        set payment_address(value: string);
        static fromObject(data: {
            sk?: Uint8Array;
            ask?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
            ak?: Uint8Array;
            nk?: Uint8Array;
            ivk?: Uint8Array;
            d?: Uint8Array;
            pkD?: Uint8Array;
            payment_address?: string;
        }): ShieldedAddressInfo;
        toObject(): {
            sk?: Uint8Array;
            ask?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
            ak?: Uint8Array;
            nk?: Uint8Array;
            ivk?: Uint8Array;
            d?: Uint8Array;
            pkD?: Uint8Array;
            payment_address?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ShieldedAddressInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ShieldedAddressInfo;
    }
    export class NoteParameters extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            ak?: Uint8Array;
            nk?: Uint8Array;
            note?: Note;
            txid?: Uint8Array;
            index?: number;
        });
        get ak(): Uint8Array;
        set ak(value: Uint8Array);
        get nk(): Uint8Array;
        set nk(value: Uint8Array);
        get note(): Note;
        set note(value: Note);
        get has_note(): boolean;
        get txid(): Uint8Array;
        set txid(value: Uint8Array);
        get index(): number;
        set index(value: number);
        static fromObject(data: {
            ak?: Uint8Array;
            nk?: Uint8Array;
            note?: ReturnType<typeof Note.prototype.toObject>;
            txid?: Uint8Array;
            index?: number;
        }): NoteParameters;
        toObject(): {
            ak?: Uint8Array;
            nk?: Uint8Array;
            note?: ReturnType<typeof Note.prototype.toObject>;
            txid?: Uint8Array;
            index?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NoteParameters;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NoteParameters;
    }
    export class SpendResult extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            result?: boolean;
            message?: string;
        });
        get result(): boolean;
        set result(value: boolean);
        get message(): string;
        set message(value: string);
        static fromObject(data: {
            result?: boolean;
            message?: string;
        }): SpendResult;
        toObject(): {
            result?: boolean;
            message?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SpendResult;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SpendResult;
    }
    export class TransactionInfoList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            transactionInfo?: dependency_1.protocol.TransactionInfo[];
        });
        get transactionInfo(): dependency_1.protocol.TransactionInfo[];
        set transactionInfo(value: dependency_1.protocol.TransactionInfo[]);
        static fromObject(data: {
            transactionInfo?: ReturnType<typeof dependency_1.protocol.TransactionInfo.prototype.toObject>[];
        }): TransactionInfoList;
        toObject(): {
            transactionInfo?: ReturnType<typeof dependency_1.protocol.TransactionInfo.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TransactionInfoList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TransactionInfoList;
    }
    export class SpendNoteTRC20 extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            note?: Note;
            alpha?: Uint8Array;
            root?: Uint8Array;
            path?: Uint8Array;
            pos?: number;
        });
        get note(): Note;
        set note(value: Note);
        get has_note(): boolean;
        get alpha(): Uint8Array;
        set alpha(value: Uint8Array);
        get root(): Uint8Array;
        set root(value: Uint8Array);
        get path(): Uint8Array;
        set path(value: Uint8Array);
        get pos(): number;
        set pos(value: number);
        static fromObject(data: {
            note?: ReturnType<typeof Note.prototype.toObject>;
            alpha?: Uint8Array;
            root?: Uint8Array;
            path?: Uint8Array;
            pos?: number;
        }): SpendNoteTRC20;
        toObject(): {
            note?: ReturnType<typeof Note.prototype.toObject>;
            alpha?: Uint8Array;
            root?: Uint8Array;
            path?: Uint8Array;
            pos?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SpendNoteTRC20;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SpendNoteTRC20;
    }
    export class PrivateShieldedTRC20Parameters extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            ask?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
            from_amount?: string;
            shielded_spends?: SpendNoteTRC20[];
            shielded_receives?: ReceiveNote[];
            transparent_to_address?: Uint8Array;
            to_amount?: string;
            shielded_TRC20_contract_address?: Uint8Array;
        });
        get ask(): Uint8Array;
        set ask(value: Uint8Array);
        get nsk(): Uint8Array;
        set nsk(value: Uint8Array);
        get ovk(): Uint8Array;
        set ovk(value: Uint8Array);
        get from_amount(): string;
        set from_amount(value: string);
        get shielded_spends(): SpendNoteTRC20[];
        set shielded_spends(value: SpendNoteTRC20[]);
        get shielded_receives(): ReceiveNote[];
        set shielded_receives(value: ReceiveNote[]);
        get transparent_to_address(): Uint8Array;
        set transparent_to_address(value: Uint8Array);
        get to_amount(): string;
        set to_amount(value: string);
        get shielded_TRC20_contract_address(): Uint8Array;
        set shielded_TRC20_contract_address(value: Uint8Array);
        static fromObject(data: {
            ask?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
            from_amount?: string;
            shielded_spends?: ReturnType<typeof SpendNoteTRC20.prototype.toObject>[];
            shielded_receives?: ReturnType<typeof ReceiveNote.prototype.toObject>[];
            transparent_to_address?: Uint8Array;
            to_amount?: string;
            shielded_TRC20_contract_address?: Uint8Array;
        }): PrivateShieldedTRC20Parameters;
        toObject(): {
            ask?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
            from_amount?: string;
            shielded_spends?: ReturnType<typeof SpendNoteTRC20.prototype.toObject>[];
            shielded_receives?: ReturnType<typeof ReceiveNote.prototype.toObject>[];
            transparent_to_address?: Uint8Array;
            to_amount?: string;
            shielded_TRC20_contract_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PrivateShieldedTRC20Parameters;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PrivateShieldedTRC20Parameters;
    }
    export class PrivateShieldedTRC20ParametersWithoutAsk extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            ak?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
            from_amount?: string;
            shielded_spends?: SpendNoteTRC20[];
            shielded_receives?: ReceiveNote[];
            transparent_to_address?: Uint8Array;
            to_amount?: string;
            shielded_TRC20_contract_address?: Uint8Array;
        });
        get ak(): Uint8Array;
        set ak(value: Uint8Array);
        get nsk(): Uint8Array;
        set nsk(value: Uint8Array);
        get ovk(): Uint8Array;
        set ovk(value: Uint8Array);
        get from_amount(): string;
        set from_amount(value: string);
        get shielded_spends(): SpendNoteTRC20[];
        set shielded_spends(value: SpendNoteTRC20[]);
        get shielded_receives(): ReceiveNote[];
        set shielded_receives(value: ReceiveNote[]);
        get transparent_to_address(): Uint8Array;
        set transparent_to_address(value: Uint8Array);
        get to_amount(): string;
        set to_amount(value: string);
        get shielded_TRC20_contract_address(): Uint8Array;
        set shielded_TRC20_contract_address(value: Uint8Array);
        static fromObject(data: {
            ak?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
            from_amount?: string;
            shielded_spends?: ReturnType<typeof SpendNoteTRC20.prototype.toObject>[];
            shielded_receives?: ReturnType<typeof ReceiveNote.prototype.toObject>[];
            transparent_to_address?: Uint8Array;
            to_amount?: string;
            shielded_TRC20_contract_address?: Uint8Array;
        }): PrivateShieldedTRC20ParametersWithoutAsk;
        toObject(): {
            ak?: Uint8Array;
            nsk?: Uint8Array;
            ovk?: Uint8Array;
            from_amount?: string;
            shielded_spends?: ReturnType<typeof SpendNoteTRC20.prototype.toObject>[];
            shielded_receives?: ReturnType<typeof ReceiveNote.prototype.toObject>[];
            transparent_to_address?: Uint8Array;
            to_amount?: string;
            shielded_TRC20_contract_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PrivateShieldedTRC20ParametersWithoutAsk;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PrivateShieldedTRC20ParametersWithoutAsk;
    }
    export class ShieldedTRC20Parameters extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            spend_description?: dependency_11.protocol.SpendDescription[];
            receive_description?: dependency_11.protocol.ReceiveDescription[];
            binding_signature?: Uint8Array;
            message_hash?: Uint8Array;
            trigger_contract_input?: string;
            parameter_type?: string;
        });
        get spend_description(): dependency_11.protocol.SpendDescription[];
        set spend_description(value: dependency_11.protocol.SpendDescription[]);
        get receive_description(): dependency_11.protocol.ReceiveDescription[];
        set receive_description(value: dependency_11.protocol.ReceiveDescription[]);
        get binding_signature(): Uint8Array;
        set binding_signature(value: Uint8Array);
        get message_hash(): Uint8Array;
        set message_hash(value: Uint8Array);
        get trigger_contract_input(): string;
        set trigger_contract_input(value: string);
        get parameter_type(): string;
        set parameter_type(value: string);
        static fromObject(data: {
            spend_description?: ReturnType<typeof dependency_11.protocol.SpendDescription.prototype.toObject>[];
            receive_description?: ReturnType<typeof dependency_11.protocol.ReceiveDescription.prototype.toObject>[];
            binding_signature?: Uint8Array;
            message_hash?: Uint8Array;
            trigger_contract_input?: string;
            parameter_type?: string;
        }): ShieldedTRC20Parameters;
        toObject(): {
            spend_description?: ReturnType<typeof dependency_11.protocol.SpendDescription.prototype.toObject>[];
            receive_description?: ReturnType<typeof dependency_11.protocol.ReceiveDescription.prototype.toObject>[];
            binding_signature?: Uint8Array;
            message_hash?: Uint8Array;
            trigger_contract_input?: string;
            parameter_type?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ShieldedTRC20Parameters;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ShieldedTRC20Parameters;
    }
    export class IvkDecryptTRC20Parameters extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            start_block_index?: number;
            end_block_index?: number;
            shielded_TRC20_contract_address?: Uint8Array;
            ivk?: Uint8Array;
            ak?: Uint8Array;
            nk?: Uint8Array;
            events?: string[];
        });
        get start_block_index(): number;
        set start_block_index(value: number);
        get end_block_index(): number;
        set end_block_index(value: number);
        get shielded_TRC20_contract_address(): Uint8Array;
        set shielded_TRC20_contract_address(value: Uint8Array);
        get ivk(): Uint8Array;
        set ivk(value: Uint8Array);
        get ak(): Uint8Array;
        set ak(value: Uint8Array);
        get nk(): Uint8Array;
        set nk(value: Uint8Array);
        get events(): string[];
        set events(value: string[]);
        static fromObject(data: {
            start_block_index?: number;
            end_block_index?: number;
            shielded_TRC20_contract_address?: Uint8Array;
            ivk?: Uint8Array;
            ak?: Uint8Array;
            nk?: Uint8Array;
            events?: string[];
        }): IvkDecryptTRC20Parameters;
        toObject(): {
            start_block_index?: number;
            end_block_index?: number;
            shielded_TRC20_contract_address?: Uint8Array;
            ivk?: Uint8Array;
            ak?: Uint8Array;
            nk?: Uint8Array;
            events?: string[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IvkDecryptTRC20Parameters;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): IvkDecryptTRC20Parameters;
    }
    export class OvkDecryptTRC20Parameters extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            start_block_index?: number;
            end_block_index?: number;
            ovk?: Uint8Array;
            shielded_TRC20_contract_address?: Uint8Array;
            events?: string[];
        });
        get start_block_index(): number;
        set start_block_index(value: number);
        get end_block_index(): number;
        set end_block_index(value: number);
        get ovk(): Uint8Array;
        set ovk(value: Uint8Array);
        get shielded_TRC20_contract_address(): Uint8Array;
        set shielded_TRC20_contract_address(value: Uint8Array);
        get events(): string[];
        set events(value: string[]);
        static fromObject(data: {
            start_block_index?: number;
            end_block_index?: number;
            ovk?: Uint8Array;
            shielded_TRC20_contract_address?: Uint8Array;
            events?: string[];
        }): OvkDecryptTRC20Parameters;
        toObject(): {
            start_block_index?: number;
            end_block_index?: number;
            ovk?: Uint8Array;
            shielded_TRC20_contract_address?: Uint8Array;
            events?: string[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): OvkDecryptTRC20Parameters;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): OvkDecryptTRC20Parameters;
    }
    export class DecryptNotesTRC20 extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            noteTxs?: DecryptNotesTRC20.NoteTx[];
        });
        get noteTxs(): DecryptNotesTRC20.NoteTx[];
        set noteTxs(value: DecryptNotesTRC20.NoteTx[]);
        static fromObject(data: {
            noteTxs?: ReturnType<typeof DecryptNotesTRC20.NoteTx.prototype.toObject>[];
        }): DecryptNotesTRC20;
        toObject(): {
            noteTxs?: ReturnType<typeof DecryptNotesTRC20.NoteTx.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DecryptNotesTRC20;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DecryptNotesTRC20;
    }
    export namespace DecryptNotesTRC20 {
        class NoteTx extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                note?: Note;
                position?: number;
                is_spent?: boolean;
                txid?: Uint8Array;
                index?: number;
                to_amount?: string;
                transparent_to_address?: Uint8Array;
            });
            get note(): Note;
            set note(value: Note);
            get has_note(): boolean;
            get position(): number;
            set position(value: number);
            get is_spent(): boolean;
            set is_spent(value: boolean);
            get txid(): Uint8Array;
            set txid(value: Uint8Array);
            get index(): number;
            set index(value: number);
            get to_amount(): string;
            set to_amount(value: string);
            get transparent_to_address(): Uint8Array;
            set transparent_to_address(value: Uint8Array);
            static fromObject(data: {
                note?: ReturnType<typeof Note.prototype.toObject>;
                position?: number;
                is_spent?: boolean;
                txid?: Uint8Array;
                index?: number;
                to_amount?: string;
                transparent_to_address?: Uint8Array;
            }): NoteTx;
            toObject(): {
                note?: ReturnType<typeof Note.prototype.toObject>;
                position?: number;
                is_spent?: boolean;
                txid?: Uint8Array;
                index?: number;
                to_amount?: string;
                transparent_to_address?: Uint8Array;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NoteTx;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): NoteTx;
        }
    }
    export class NfTRC20Parameters extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            note?: Note;
            ak?: Uint8Array;
            nk?: Uint8Array;
            position?: number;
            shielded_TRC20_contract_address?: Uint8Array;
        });
        get note(): Note;
        set note(value: Note);
        get has_note(): boolean;
        get ak(): Uint8Array;
        set ak(value: Uint8Array);
        get nk(): Uint8Array;
        set nk(value: Uint8Array);
        get position(): number;
        set position(value: number);
        get shielded_TRC20_contract_address(): Uint8Array;
        set shielded_TRC20_contract_address(value: Uint8Array);
        static fromObject(data: {
            note?: ReturnType<typeof Note.prototype.toObject>;
            ak?: Uint8Array;
            nk?: Uint8Array;
            position?: number;
            shielded_TRC20_contract_address?: Uint8Array;
        }): NfTRC20Parameters;
        toObject(): {
            note?: ReturnType<typeof Note.prototype.toObject>;
            ak?: Uint8Array;
            nk?: Uint8Array;
            position?: number;
            shielded_TRC20_contract_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NfTRC20Parameters;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NfTRC20Parameters;
    }
    export class NullifierResult extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            is_spent?: boolean;
        });
        get is_spent(): boolean;
        set is_spent(value: boolean);
        static fromObject(data: {
            is_spent?: boolean;
        }): NullifierResult;
        toObject(): {
            is_spent?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NullifierResult;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NullifierResult;
    }
    export class ShieldedTRC20TriggerContractParameters extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            shielded_TRC20_Parameters?: ShieldedTRC20Parameters;
            spend_authority_signature?: BytesMessage[];
            amount?: string;
            transparent_to_address?: Uint8Array;
        });
        get shielded_TRC20_Parameters(): ShieldedTRC20Parameters;
        set shielded_TRC20_Parameters(value: ShieldedTRC20Parameters);
        get has_shielded_TRC20_Parameters(): boolean;
        get spend_authority_signature(): BytesMessage[];
        set spend_authority_signature(value: BytesMessage[]);
        get amount(): string;
        set amount(value: string);
        get transparent_to_address(): Uint8Array;
        set transparent_to_address(value: Uint8Array);
        static fromObject(data: {
            shielded_TRC20_Parameters?: ReturnType<typeof ShieldedTRC20Parameters.prototype.toObject>;
            spend_authority_signature?: ReturnType<typeof BytesMessage.prototype.toObject>[];
            amount?: string;
            transparent_to_address?: Uint8Array;
        }): ShieldedTRC20TriggerContractParameters;
        toObject(): {
            shielded_TRC20_Parameters?: ReturnType<typeof ShieldedTRC20Parameters.prototype.toObject>;
            spend_authority_signature?: ReturnType<typeof BytesMessage.prototype.toObject>[];
            amount?: string;
            transparent_to_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ShieldedTRC20TriggerContractParameters;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ShieldedTRC20TriggerContractParameters;
    }
    interface GrpcUnaryServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
    }
    export abstract class UnimplementedWalletService {
        static definition: {
            GetAccount: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.Account) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.Account;
                responseSerialize: (message: dependency_1.protocol.Account) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Account;
            };
            GetAccountById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.Account) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.Account;
                responseSerialize: (message: dependency_1.protocol.Account) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Account;
            };
            GetAccountBalance: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.AccountBalanceRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.AccountBalanceRequest;
                responseSerialize: (message: dependency_5.protocol.AccountBalanceResponse) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_5.protocol.AccountBalanceResponse;
            };
            GetBlockBalanceTrace: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.BlockBalanceTrace.BlockIdentifier) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.BlockBalanceTrace.BlockIdentifier;
                responseSerialize: (message: dependency_5.protocol.BlockBalanceTrace) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_5.protocol.BlockBalanceTrace;
            };
            CreateTransaction: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.TransferContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.TransferContract;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            CreateTransaction2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.TransferContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.TransferContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            BroadcastTransaction: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
                responseSerialize: (message: Return) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Return;
            };
            UpdateAccount: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_3.protocol.AccountUpdateContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_3.protocol.AccountUpdateContract;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            SetAccountId: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_3.protocol.SetAccountIdContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_3.protocol.SetAccountIdContract;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            UpdateAccount2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_3.protocol.AccountUpdateContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_3.protocol.AccountUpdateContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            VoteWitnessAccount: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_4.protocol.VoteWitnessContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_4.protocol.VoteWitnessContract;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            UpdateSetting: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_10.protocol.UpdateSettingContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_10.protocol.UpdateSettingContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            UpdateEnergyLimit: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_10.protocol.UpdateEnergyLimitContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_10.protocol.UpdateEnergyLimitContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            VoteWitnessAccount2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_4.protocol.VoteWitnessContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_4.protocol.VoteWitnessContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            CreateAssetIssue: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_2.protocol.AssetIssueContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_2.protocol.AssetIssueContract;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            CreateAssetIssue2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_2.protocol.AssetIssueContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_2.protocol.AssetIssueContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            UpdateWitness: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_4.protocol.WitnessUpdateContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_4.protocol.WitnessUpdateContract;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            UpdateWitness2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_4.protocol.WitnessUpdateContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_4.protocol.WitnessUpdateContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            CreateAccount: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_3.protocol.AccountCreateContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_3.protocol.AccountCreateContract;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            CreateAccount2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_3.protocol.AccountCreateContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_3.protocol.AccountCreateContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            CreateWitness: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_4.protocol.WitnessCreateContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_4.protocol.WitnessCreateContract;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            CreateWitness2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_4.protocol.WitnessCreateContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_4.protocol.WitnessCreateContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            TransferAsset: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_2.protocol.TransferAssetContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_2.protocol.TransferAssetContract;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            TransferAsset2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_2.protocol.TransferAssetContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_2.protocol.TransferAssetContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            ParticipateAssetIssue: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_2.protocol.ParticipateAssetIssueContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_2.protocol.ParticipateAssetIssueContract;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            ParticipateAssetIssue2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_2.protocol.ParticipateAssetIssueContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_2.protocol.ParticipateAssetIssueContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            FreezeBalance: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.FreezeBalanceContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.FreezeBalanceContract;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            FreezeBalance2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.FreezeBalanceContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.FreezeBalanceContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            FreezeBalanceV2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.FreezeBalanceV2Contract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.FreezeBalanceV2Contract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            UnfreezeBalance: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.UnfreezeBalanceContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.UnfreezeBalanceContract;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            UnfreezeBalance2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.UnfreezeBalanceContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.UnfreezeBalanceContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            UnfreezeBalanceV2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.UnfreezeBalanceV2Contract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.UnfreezeBalanceV2Contract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            UnfreezeAsset: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_2.protocol.UnfreezeAssetContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_2.protocol.UnfreezeAssetContract;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            UnfreezeAsset2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_2.protocol.UnfreezeAssetContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_2.protocol.UnfreezeAssetContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            WithdrawBalance: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.WithdrawBalanceContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.WithdrawBalanceContract;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            WithdrawBalance2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.WithdrawBalanceContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.WithdrawBalanceContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            WithdrawExpireUnfreeze: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.WithdrawExpireUnfreezeContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.WithdrawExpireUnfreezeContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            DelegateResource: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.DelegateResourceContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.DelegateResourceContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            UnDelegateResource: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.UnDelegateResourceContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.UnDelegateResourceContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            CancelAllUnfreezeV2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_5.protocol.CancelAllUnfreezeV2Contract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_5.protocol.CancelAllUnfreezeV2Contract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            UpdateAsset: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_2.protocol.UpdateAssetContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_2.protocol.UpdateAssetContract;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            UpdateAsset2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_2.protocol.UpdateAssetContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_2.protocol.UpdateAssetContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            ProposalCreate: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_6.protocol.ProposalCreateContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_6.protocol.ProposalCreateContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            ProposalApprove: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_6.protocol.ProposalApproveContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_6.protocol.ProposalApproveContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            ProposalDelete: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_6.protocol.ProposalDeleteContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_6.protocol.ProposalDeleteContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            BuyStorage: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_7.protocol.BuyStorageContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_7.protocol.BuyStorageContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            BuyStorageBytes: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_7.protocol.BuyStorageBytesContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_7.protocol.BuyStorageBytesContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            SellStorage: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_7.protocol.SellStorageContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_7.protocol.SellStorageContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            ExchangeCreate: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_8.protocol.ExchangeCreateContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_8.protocol.ExchangeCreateContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            ExchangeInject: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_8.protocol.ExchangeInjectContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_8.protocol.ExchangeInjectContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            ExchangeWithdraw: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_8.protocol.ExchangeWithdrawContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_8.protocol.ExchangeWithdrawContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            ExchangeTransaction: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_8.protocol.ExchangeTransactionContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_8.protocol.ExchangeTransactionContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            MarketSellAsset: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_9.protocol.MarketSellAssetContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_9.protocol.MarketSellAssetContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            MarketCancelOrder: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_9.protocol.MarketCancelOrderContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_9.protocol.MarketCancelOrderContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            GetMarketOrderById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.MarketOrder) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.MarketOrder;
            };
            GetMarketOrderByAccount: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.MarketOrderList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.MarketOrderList;
            };
            GetMarketPriceByPair: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.MarketOrderPair) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.MarketOrderPair;
                responseSerialize: (message: dependency_1.protocol.MarketPriceList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.MarketPriceList;
            };
            GetMarketOrderListByPair: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.MarketOrderPair) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.MarketOrderPair;
                responseSerialize: (message: dependency_1.protocol.MarketOrderList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.MarketOrderList;
            };
            GetMarketPairList: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: dependency_1.protocol.MarketOrderPairList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.MarketOrderPairList;
            };
            ListNodes: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: NodeList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NodeList;
            };
            GetAssetIssueByAccount: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.Account) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.Account;
                responseSerialize: (message: AssetIssueList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => AssetIssueList;
            };
            GetAccountNet: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.Account) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.Account;
                responseSerialize: (message: AccountNetMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => AccountNetMessage;
            };
            GetAccountResource: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.Account) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.Account;
                responseSerialize: (message: AccountResourceMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => AccountResourceMessage;
            };
            GetAssetIssueByName: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_2.protocol.AssetIssueContract) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_2.protocol.AssetIssueContract;
            };
            GetAssetIssueListByName: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: AssetIssueList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => AssetIssueList;
            };
            GetAssetIssueById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_2.protocol.AssetIssueContract) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_2.protocol.AssetIssueContract;
            };
            GetNowBlock: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: dependency_1.protocol.Block) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Block;
            };
            GetNowBlock2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: BlockExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BlockExtention;
            };
            GetBlockByNum: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NumberMessage;
                responseSerialize: (message: dependency_1.protocol.Block) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Block;
            };
            GetBlockByNum2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NumberMessage;
                responseSerialize: (message: BlockExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BlockExtention;
            };
            GetTransactionCountByBlockNum: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NumberMessage;
                responseSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NumberMessage;
            };
            GetBlockById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.Block) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Block;
            };
            GetBlockByLimitNext: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BlockLimit) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BlockLimit;
                responseSerialize: (message: BlockList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BlockList;
            };
            GetBlockByLimitNext2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BlockLimit) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BlockLimit;
                responseSerialize: (message: BlockListExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BlockListExtention;
            };
            GetBlockByLatestNum: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NumberMessage;
                responseSerialize: (message: BlockList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BlockList;
            };
            GetBlockByLatestNum2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NumberMessage;
                responseSerialize: (message: BlockListExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BlockListExtention;
            };
            GetTransactionById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            DeployContract: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_10.protocol.CreateSmartContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_10.protocol.CreateSmartContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            GetContract: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_10.protocol.SmartContract) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_10.protocol.SmartContract;
            };
            GetContractInfo: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_10.protocol.SmartContractDataWrapper) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_10.protocol.SmartContractDataWrapper;
            };
            TriggerContract: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_10.protocol.TriggerSmartContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_10.protocol.TriggerSmartContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            TriggerConstantContract: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_10.protocol.TriggerSmartContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_10.protocol.TriggerSmartContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            EstimateEnergy: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_10.protocol.TriggerSmartContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_10.protocol.TriggerSmartContract;
                responseSerialize: (message: EstimateEnergyMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => EstimateEnergyMessage;
            };
            ClearContractABI: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_10.protocol.ClearABIContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_10.protocol.ClearABIContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            ListWitnesses: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: WitnessList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => WitnessList;
            };
            GetPaginatedNowWitnessList: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: PaginatedMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => PaginatedMessage;
                responseSerialize: (message: WitnessList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => WitnessList;
            };
            GetDelegatedResource: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: DelegatedResourceMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => DelegatedResourceMessage;
                responseSerialize: (message: DelegatedResourceList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DelegatedResourceList;
            };
            GetDelegatedResourceV2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: DelegatedResourceMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => DelegatedResourceMessage;
                responseSerialize: (message: DelegatedResourceList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DelegatedResourceList;
            };
            GetDelegatedResourceAccountIndex: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.DelegatedResourceAccountIndex) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.DelegatedResourceAccountIndex;
            };
            GetDelegatedResourceAccountIndexV2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.DelegatedResourceAccountIndex) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.DelegatedResourceAccountIndex;
            };
            GetCanDelegatedMaxSize: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: CanDelegatedMaxSizeRequestMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => CanDelegatedMaxSizeRequestMessage;
                responseSerialize: (message: CanDelegatedMaxSizeResponseMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => CanDelegatedMaxSizeResponseMessage;
            };
            GetAvailableUnfreezeCount: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: GetAvailableUnfreezeCountRequestMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => GetAvailableUnfreezeCountRequestMessage;
                responseSerialize: (message: GetAvailableUnfreezeCountResponseMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => GetAvailableUnfreezeCountResponseMessage;
            };
            GetCanWithdrawUnfreezeAmount: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: CanWithdrawUnfreezeAmountRequestMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => CanWithdrawUnfreezeAmountRequestMessage;
                responseSerialize: (message: CanWithdrawUnfreezeAmountResponseMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => CanWithdrawUnfreezeAmountResponseMessage;
            };
            ListProposals: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: ProposalList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => ProposalList;
            };
            GetPaginatedProposalList: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: PaginatedMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => PaginatedMessage;
                responseSerialize: (message: ProposalList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => ProposalList;
            };
            GetProposalById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.Proposal) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Proposal;
            };
            ListExchanges: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: ExchangeList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => ExchangeList;
            };
            GetPaginatedExchangeList: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: PaginatedMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => PaginatedMessage;
                responseSerialize: (message: ExchangeList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => ExchangeList;
            };
            GetExchangeById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.Exchange) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Exchange;
            };
            GetChainParameters: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: dependency_1.protocol.ChainParameters) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.ChainParameters;
            };
            GetAssetIssueList: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: AssetIssueList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => AssetIssueList;
            };
            GetPaginatedAssetIssueList: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: PaginatedMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => PaginatedMessage;
                responseSerialize: (message: AssetIssueList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => AssetIssueList;
            };
            TotalTransaction: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NumberMessage;
            };
            GetNextMaintenanceTime: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NumberMessage;
            };
            GetTransactionInfoById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.TransactionInfo) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.TransactionInfo;
            };
            AccountPermissionUpdate: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_3.protocol.AccountPermissionUpdateContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_3.protocol.AccountPermissionUpdateContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            GetTransactionSignWeight: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
                responseSerialize: (message: TransactionSignWeight) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionSignWeight;
            };
            GetTransactionApprovedList: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
                responseSerialize: (message: TransactionApprovedList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionApprovedList;
            };
            GetNodeInfo: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: dependency_1.protocol.NodeInfo) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.NodeInfo;
            };
            GetRewardInfo: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NumberMessage;
            };
            GetBrokerageInfo: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NumberMessage;
            };
            UpdateBrokerage: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_7.protocol.UpdateBrokerageContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_7.protocol.UpdateBrokerageContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            CreateShieldedTransaction: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: PrivateParameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => PrivateParameters;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            GetMerkleTreeVoucherInfo: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_11.protocol.OutputPointInfo) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_11.protocol.OutputPointInfo;
                responseSerialize: (message: dependency_11.protocol.IncrementalMerkleVoucherInfo) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_11.protocol.IncrementalMerkleVoucherInfo;
            };
            ScanNoteByIvk: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: IvkDecryptParameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => IvkDecryptParameters;
                responseSerialize: (message: DecryptNotes) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DecryptNotes;
            };
            ScanAndMarkNoteByIvk: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: IvkDecryptAndMarkParameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => IvkDecryptAndMarkParameters;
                responseSerialize: (message: DecryptNotesMarked) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DecryptNotesMarked;
            };
            ScanNoteByOvk: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: OvkDecryptParameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => OvkDecryptParameters;
                responseSerialize: (message: DecryptNotes) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DecryptNotes;
            };
            GetSpendingKey: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BytesMessage;
            };
            GetExpandedSpendingKey: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: ExpandedSpendingKeyMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => ExpandedSpendingKeyMessage;
            };
            GetAkFromAsk: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BytesMessage;
            };
            GetNkFromNsk: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BytesMessage;
            };
            GetIncomingViewingKey: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: ViewingKeyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => ViewingKeyMessage;
                responseSerialize: (message: IncomingViewingKeyMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => IncomingViewingKeyMessage;
            };
            GetDiversifier: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: DiversifierMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DiversifierMessage;
            };
            GetNewShieldedAddress: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: ShieldedAddressInfo) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => ShieldedAddressInfo;
            };
            GetZenPaymentAddress: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: IncomingViewingKeyDiversifierMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => IncomingViewingKeyDiversifierMessage;
                responseSerialize: (message: PaymentAddressMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => PaymentAddressMessage;
            };
            GetRcm: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BytesMessage;
            };
            IsSpend: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NoteParameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NoteParameters;
                responseSerialize: (message: SpendResult) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => SpendResult;
            };
            CreateShieldedTransactionWithoutSpendAuthSig: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: PrivateParametersWithoutAsk) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => PrivateParametersWithoutAsk;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            GetShieldTransactionHash: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
                responseSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BytesMessage;
            };
            CreateSpendAuthSig: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: SpendAuthSigParameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => SpendAuthSigParameters;
                responseSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BytesMessage;
            };
            CreateShieldNullifier: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NfParameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NfParameters;
                responseSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BytesMessage;
            };
            CreateShieldedContractParameters: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: PrivateShieldedTRC20Parameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => PrivateShieldedTRC20Parameters;
                responseSerialize: (message: ShieldedTRC20Parameters) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => ShieldedTRC20Parameters;
            };
            CreateShieldedContractParametersWithoutAsk: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: PrivateShieldedTRC20ParametersWithoutAsk) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => PrivateShieldedTRC20ParametersWithoutAsk;
                responseSerialize: (message: ShieldedTRC20Parameters) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => ShieldedTRC20Parameters;
            };
            ScanShieldedTRC20NotesByIvk: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: IvkDecryptTRC20Parameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => IvkDecryptTRC20Parameters;
                responseSerialize: (message: DecryptNotesTRC20) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DecryptNotesTRC20;
            };
            ScanShieldedTRC20NotesByOvk: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: OvkDecryptTRC20Parameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => OvkDecryptTRC20Parameters;
                responseSerialize: (message: DecryptNotesTRC20) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DecryptNotesTRC20;
            };
            IsShieldedTRC20ContractNoteSpent: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NfTRC20Parameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NfTRC20Parameters;
                responseSerialize: (message: NullifierResult) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NullifierResult;
            };
            GetTriggerInputForShieldedTRC20Contract: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: ShieldedTRC20TriggerContractParameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => ShieldedTRC20TriggerContractParameters;
                responseSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BytesMessage;
            };
            CreateCommonTransaction: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            GetTransactionInfoByBlockNum: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NumberMessage;
                responseSerialize: (message: TransactionInfoList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionInfoList;
            };
            GetBurnTrx: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NumberMessage;
            };
            GetTransactionFromPending: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            GetTransactionListFromPending: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: TransactionIdList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionIdList;
            };
            GetPendingSize: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NumberMessage;
            };
            GetBlock: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BlockReq) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BlockReq;
                responseSerialize: (message: BlockExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BlockExtention;
            };
            GetBandwidthPrices: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: PricesResponseMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => PricesResponseMessage;
            };
            GetEnergyPrices: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: PricesResponseMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => PricesResponseMessage;
            };
            GetMemoFee: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: PricesResponseMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => PricesResponseMessage;
            };
        };
        [method: string]: grpc_1.UntypedHandleCall;
        abstract GetAccount(call: grpc_1.ServerUnaryCall<dependency_1.protocol.Account, dependency_1.protocol.Account>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Account>): void;
        abstract GetAccountById(call: grpc_1.ServerUnaryCall<dependency_1.protocol.Account, dependency_1.protocol.Account>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Account>): void;
        abstract GetAccountBalance(call: grpc_1.ServerUnaryCall<dependency_5.protocol.AccountBalanceRequest, dependency_5.protocol.AccountBalanceResponse>, callback: grpc_1.sendUnaryData<dependency_5.protocol.AccountBalanceResponse>): void;
        abstract GetBlockBalanceTrace(call: grpc_1.ServerUnaryCall<dependency_5.protocol.BlockBalanceTrace.BlockIdentifier, dependency_5.protocol.BlockBalanceTrace>, callback: grpc_1.sendUnaryData<dependency_5.protocol.BlockBalanceTrace>): void;
        abstract CreateTransaction(call: grpc_1.ServerUnaryCall<dependency_5.protocol.TransferContract, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract CreateTransaction2(call: grpc_1.ServerUnaryCall<dependency_5.protocol.TransferContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract BroadcastTransaction(call: grpc_1.ServerUnaryCall<dependency_1.protocol.Transaction, Return>, callback: grpc_1.sendUnaryData<Return>): void;
        abstract UpdateAccount(call: grpc_1.ServerUnaryCall<dependency_3.protocol.AccountUpdateContract, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract SetAccountId(call: grpc_1.ServerUnaryCall<dependency_3.protocol.SetAccountIdContract, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract UpdateAccount2(call: grpc_1.ServerUnaryCall<dependency_3.protocol.AccountUpdateContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract VoteWitnessAccount(call: grpc_1.ServerUnaryCall<dependency_4.protocol.VoteWitnessContract, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract UpdateSetting(call: grpc_1.ServerUnaryCall<dependency_10.protocol.UpdateSettingContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract UpdateEnergyLimit(call: grpc_1.ServerUnaryCall<dependency_10.protocol.UpdateEnergyLimitContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract VoteWitnessAccount2(call: grpc_1.ServerUnaryCall<dependency_4.protocol.VoteWitnessContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract CreateAssetIssue(call: grpc_1.ServerUnaryCall<dependency_2.protocol.AssetIssueContract, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract CreateAssetIssue2(call: grpc_1.ServerUnaryCall<dependency_2.protocol.AssetIssueContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract UpdateWitness(call: grpc_1.ServerUnaryCall<dependency_4.protocol.WitnessUpdateContract, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract UpdateWitness2(call: grpc_1.ServerUnaryCall<dependency_4.protocol.WitnessUpdateContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract CreateAccount(call: grpc_1.ServerUnaryCall<dependency_3.protocol.AccountCreateContract, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract CreateAccount2(call: grpc_1.ServerUnaryCall<dependency_3.protocol.AccountCreateContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract CreateWitness(call: grpc_1.ServerUnaryCall<dependency_4.protocol.WitnessCreateContract, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract CreateWitness2(call: grpc_1.ServerUnaryCall<dependency_4.protocol.WitnessCreateContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract TransferAsset(call: grpc_1.ServerUnaryCall<dependency_2.protocol.TransferAssetContract, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract TransferAsset2(call: grpc_1.ServerUnaryCall<dependency_2.protocol.TransferAssetContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract ParticipateAssetIssue(call: grpc_1.ServerUnaryCall<dependency_2.protocol.ParticipateAssetIssueContract, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract ParticipateAssetIssue2(call: grpc_1.ServerUnaryCall<dependency_2.protocol.ParticipateAssetIssueContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract FreezeBalance(call: grpc_1.ServerUnaryCall<dependency_5.protocol.FreezeBalanceContract, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract FreezeBalance2(call: grpc_1.ServerUnaryCall<dependency_5.protocol.FreezeBalanceContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract FreezeBalanceV2(call: grpc_1.ServerUnaryCall<dependency_5.protocol.FreezeBalanceV2Contract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract UnfreezeBalance(call: grpc_1.ServerUnaryCall<dependency_5.protocol.UnfreezeBalanceContract, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract UnfreezeBalance2(call: grpc_1.ServerUnaryCall<dependency_5.protocol.UnfreezeBalanceContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract UnfreezeBalanceV2(call: grpc_1.ServerUnaryCall<dependency_5.protocol.UnfreezeBalanceV2Contract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract UnfreezeAsset(call: grpc_1.ServerUnaryCall<dependency_2.protocol.UnfreezeAssetContract, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract UnfreezeAsset2(call: grpc_1.ServerUnaryCall<dependency_2.protocol.UnfreezeAssetContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract WithdrawBalance(call: grpc_1.ServerUnaryCall<dependency_5.protocol.WithdrawBalanceContract, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract WithdrawBalance2(call: grpc_1.ServerUnaryCall<dependency_5.protocol.WithdrawBalanceContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract WithdrawExpireUnfreeze(call: grpc_1.ServerUnaryCall<dependency_5.protocol.WithdrawExpireUnfreezeContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract DelegateResource(call: grpc_1.ServerUnaryCall<dependency_5.protocol.DelegateResourceContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract UnDelegateResource(call: grpc_1.ServerUnaryCall<dependency_5.protocol.UnDelegateResourceContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract CancelAllUnfreezeV2(call: grpc_1.ServerUnaryCall<dependency_5.protocol.CancelAllUnfreezeV2Contract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract UpdateAsset(call: grpc_1.ServerUnaryCall<dependency_2.protocol.UpdateAssetContract, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract UpdateAsset2(call: grpc_1.ServerUnaryCall<dependency_2.protocol.UpdateAssetContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract ProposalCreate(call: grpc_1.ServerUnaryCall<dependency_6.protocol.ProposalCreateContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract ProposalApprove(call: grpc_1.ServerUnaryCall<dependency_6.protocol.ProposalApproveContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract ProposalDelete(call: grpc_1.ServerUnaryCall<dependency_6.protocol.ProposalDeleteContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract BuyStorage(call: grpc_1.ServerUnaryCall<dependency_7.protocol.BuyStorageContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract BuyStorageBytes(call: grpc_1.ServerUnaryCall<dependency_7.protocol.BuyStorageBytesContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract SellStorage(call: grpc_1.ServerUnaryCall<dependency_7.protocol.SellStorageContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract ExchangeCreate(call: grpc_1.ServerUnaryCall<dependency_8.protocol.ExchangeCreateContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract ExchangeInject(call: grpc_1.ServerUnaryCall<dependency_8.protocol.ExchangeInjectContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract ExchangeWithdraw(call: grpc_1.ServerUnaryCall<dependency_8.protocol.ExchangeWithdrawContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract ExchangeTransaction(call: grpc_1.ServerUnaryCall<dependency_8.protocol.ExchangeTransactionContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract MarketSellAsset(call: grpc_1.ServerUnaryCall<dependency_9.protocol.MarketSellAssetContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract MarketCancelOrder(call: grpc_1.ServerUnaryCall<dependency_9.protocol.MarketCancelOrderContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract GetMarketOrderById(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.MarketOrder>, callback: grpc_1.sendUnaryData<dependency_1.protocol.MarketOrder>): void;
        abstract GetMarketOrderByAccount(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.MarketOrderList>, callback: grpc_1.sendUnaryData<dependency_1.protocol.MarketOrderList>): void;
        abstract GetMarketPriceByPair(call: grpc_1.ServerUnaryCall<dependency_1.protocol.MarketOrderPair, dependency_1.protocol.MarketPriceList>, callback: grpc_1.sendUnaryData<dependency_1.protocol.MarketPriceList>): void;
        abstract GetMarketOrderListByPair(call: grpc_1.ServerUnaryCall<dependency_1.protocol.MarketOrderPair, dependency_1.protocol.MarketOrderList>, callback: grpc_1.sendUnaryData<dependency_1.protocol.MarketOrderList>): void;
        abstract GetMarketPairList(call: grpc_1.ServerUnaryCall<EmptyMessage, dependency_1.protocol.MarketOrderPairList>, callback: grpc_1.sendUnaryData<dependency_1.protocol.MarketOrderPairList>): void;
        abstract ListNodes(call: grpc_1.ServerUnaryCall<EmptyMessage, NodeList>, callback: grpc_1.sendUnaryData<NodeList>): void;
        abstract GetAssetIssueByAccount(call: grpc_1.ServerUnaryCall<dependency_1.protocol.Account, AssetIssueList>, callback: grpc_1.sendUnaryData<AssetIssueList>): void;
        abstract GetAccountNet(call: grpc_1.ServerUnaryCall<dependency_1.protocol.Account, AccountNetMessage>, callback: grpc_1.sendUnaryData<AccountNetMessage>): void;
        abstract GetAccountResource(call: grpc_1.ServerUnaryCall<dependency_1.protocol.Account, AccountResourceMessage>, callback: grpc_1.sendUnaryData<AccountResourceMessage>): void;
        abstract GetAssetIssueByName(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_2.protocol.AssetIssueContract>, callback: grpc_1.sendUnaryData<dependency_2.protocol.AssetIssueContract>): void;
        abstract GetAssetIssueListByName(call: grpc_1.ServerUnaryCall<BytesMessage, AssetIssueList>, callback: grpc_1.sendUnaryData<AssetIssueList>): void;
        abstract GetAssetIssueById(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_2.protocol.AssetIssueContract>, callback: grpc_1.sendUnaryData<dependency_2.protocol.AssetIssueContract>): void;
        abstract GetNowBlock(call: grpc_1.ServerUnaryCall<EmptyMessage, dependency_1.protocol.Block>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Block>): void;
        abstract GetNowBlock2(call: grpc_1.ServerUnaryCall<EmptyMessage, BlockExtention>, callback: grpc_1.sendUnaryData<BlockExtention>): void;
        abstract GetBlockByNum(call: grpc_1.ServerUnaryCall<NumberMessage, dependency_1.protocol.Block>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Block>): void;
        abstract GetBlockByNum2(call: grpc_1.ServerUnaryCall<NumberMessage, BlockExtention>, callback: grpc_1.sendUnaryData<BlockExtention>): void;
        abstract GetTransactionCountByBlockNum(call: grpc_1.ServerUnaryCall<NumberMessage, NumberMessage>, callback: grpc_1.sendUnaryData<NumberMessage>): void;
        abstract GetBlockById(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.Block>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Block>): void;
        abstract GetBlockByLimitNext(call: grpc_1.ServerUnaryCall<BlockLimit, BlockList>, callback: grpc_1.sendUnaryData<BlockList>): void;
        abstract GetBlockByLimitNext2(call: grpc_1.ServerUnaryCall<BlockLimit, BlockListExtention>, callback: grpc_1.sendUnaryData<BlockListExtention>): void;
        abstract GetBlockByLatestNum(call: grpc_1.ServerUnaryCall<NumberMessage, BlockList>, callback: grpc_1.sendUnaryData<BlockList>): void;
        abstract GetBlockByLatestNum2(call: grpc_1.ServerUnaryCall<NumberMessage, BlockListExtention>, callback: grpc_1.sendUnaryData<BlockListExtention>): void;
        abstract GetTransactionById(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract DeployContract(call: grpc_1.ServerUnaryCall<dependency_10.protocol.CreateSmartContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract GetContract(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_10.protocol.SmartContract>, callback: grpc_1.sendUnaryData<dependency_10.protocol.SmartContract>): void;
        abstract GetContractInfo(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_10.protocol.SmartContractDataWrapper>, callback: grpc_1.sendUnaryData<dependency_10.protocol.SmartContractDataWrapper>): void;
        abstract TriggerContract(call: grpc_1.ServerUnaryCall<dependency_10.protocol.TriggerSmartContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract TriggerConstantContract(call: grpc_1.ServerUnaryCall<dependency_10.protocol.TriggerSmartContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract EstimateEnergy(call: grpc_1.ServerUnaryCall<dependency_10.protocol.TriggerSmartContract, EstimateEnergyMessage>, callback: grpc_1.sendUnaryData<EstimateEnergyMessage>): void;
        abstract ClearContractABI(call: grpc_1.ServerUnaryCall<dependency_10.protocol.ClearABIContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract ListWitnesses(call: grpc_1.ServerUnaryCall<EmptyMessage, WitnessList>, callback: grpc_1.sendUnaryData<WitnessList>): void;
        abstract GetPaginatedNowWitnessList(call: grpc_1.ServerUnaryCall<PaginatedMessage, WitnessList>, callback: grpc_1.sendUnaryData<WitnessList>): void;
        abstract GetDelegatedResource(call: grpc_1.ServerUnaryCall<DelegatedResourceMessage, DelegatedResourceList>, callback: grpc_1.sendUnaryData<DelegatedResourceList>): void;
        abstract GetDelegatedResourceV2(call: grpc_1.ServerUnaryCall<DelegatedResourceMessage, DelegatedResourceList>, callback: grpc_1.sendUnaryData<DelegatedResourceList>): void;
        abstract GetDelegatedResourceAccountIndex(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.DelegatedResourceAccountIndex>, callback: grpc_1.sendUnaryData<dependency_1.protocol.DelegatedResourceAccountIndex>): void;
        abstract GetDelegatedResourceAccountIndexV2(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.DelegatedResourceAccountIndex>, callback: grpc_1.sendUnaryData<dependency_1.protocol.DelegatedResourceAccountIndex>): void;
        abstract GetCanDelegatedMaxSize(call: grpc_1.ServerUnaryCall<CanDelegatedMaxSizeRequestMessage, CanDelegatedMaxSizeResponseMessage>, callback: grpc_1.sendUnaryData<CanDelegatedMaxSizeResponseMessage>): void;
        abstract GetAvailableUnfreezeCount(call: grpc_1.ServerUnaryCall<GetAvailableUnfreezeCountRequestMessage, GetAvailableUnfreezeCountResponseMessage>, callback: grpc_1.sendUnaryData<GetAvailableUnfreezeCountResponseMessage>): void;
        abstract GetCanWithdrawUnfreezeAmount(call: grpc_1.ServerUnaryCall<CanWithdrawUnfreezeAmountRequestMessage, CanWithdrawUnfreezeAmountResponseMessage>, callback: grpc_1.sendUnaryData<CanWithdrawUnfreezeAmountResponseMessage>): void;
        abstract ListProposals(call: grpc_1.ServerUnaryCall<EmptyMessage, ProposalList>, callback: grpc_1.sendUnaryData<ProposalList>): void;
        abstract GetPaginatedProposalList(call: grpc_1.ServerUnaryCall<PaginatedMessage, ProposalList>, callback: grpc_1.sendUnaryData<ProposalList>): void;
        abstract GetProposalById(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.Proposal>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Proposal>): void;
        abstract ListExchanges(call: grpc_1.ServerUnaryCall<EmptyMessage, ExchangeList>, callback: grpc_1.sendUnaryData<ExchangeList>): void;
        abstract GetPaginatedExchangeList(call: grpc_1.ServerUnaryCall<PaginatedMessage, ExchangeList>, callback: grpc_1.sendUnaryData<ExchangeList>): void;
        abstract GetExchangeById(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.Exchange>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Exchange>): void;
        abstract GetChainParameters(call: grpc_1.ServerUnaryCall<EmptyMessage, dependency_1.protocol.ChainParameters>, callback: grpc_1.sendUnaryData<dependency_1.protocol.ChainParameters>): void;
        abstract GetAssetIssueList(call: grpc_1.ServerUnaryCall<EmptyMessage, AssetIssueList>, callback: grpc_1.sendUnaryData<AssetIssueList>): void;
        abstract GetPaginatedAssetIssueList(call: grpc_1.ServerUnaryCall<PaginatedMessage, AssetIssueList>, callback: grpc_1.sendUnaryData<AssetIssueList>): void;
        abstract TotalTransaction(call: grpc_1.ServerUnaryCall<EmptyMessage, NumberMessage>, callback: grpc_1.sendUnaryData<NumberMessage>): void;
        abstract GetNextMaintenanceTime(call: grpc_1.ServerUnaryCall<EmptyMessage, NumberMessage>, callback: grpc_1.sendUnaryData<NumberMessage>): void;
        abstract GetTransactionInfoById(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.TransactionInfo>, callback: grpc_1.sendUnaryData<dependency_1.protocol.TransactionInfo>): void;
        abstract AccountPermissionUpdate(call: grpc_1.ServerUnaryCall<dependency_3.protocol.AccountPermissionUpdateContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract GetTransactionSignWeight(call: grpc_1.ServerUnaryCall<dependency_1.protocol.Transaction, TransactionSignWeight>, callback: grpc_1.sendUnaryData<TransactionSignWeight>): void;
        abstract GetTransactionApprovedList(call: grpc_1.ServerUnaryCall<dependency_1.protocol.Transaction, TransactionApprovedList>, callback: grpc_1.sendUnaryData<TransactionApprovedList>): void;
        abstract GetNodeInfo(call: grpc_1.ServerUnaryCall<EmptyMessage, dependency_1.protocol.NodeInfo>, callback: grpc_1.sendUnaryData<dependency_1.protocol.NodeInfo>): void;
        abstract GetRewardInfo(call: grpc_1.ServerUnaryCall<BytesMessage, NumberMessage>, callback: grpc_1.sendUnaryData<NumberMessage>): void;
        abstract GetBrokerageInfo(call: grpc_1.ServerUnaryCall<BytesMessage, NumberMessage>, callback: grpc_1.sendUnaryData<NumberMessage>): void;
        abstract UpdateBrokerage(call: grpc_1.ServerUnaryCall<dependency_7.protocol.UpdateBrokerageContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract CreateShieldedTransaction(call: grpc_1.ServerUnaryCall<PrivateParameters, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract GetMerkleTreeVoucherInfo(call: grpc_1.ServerUnaryCall<dependency_11.protocol.OutputPointInfo, dependency_11.protocol.IncrementalMerkleVoucherInfo>, callback: grpc_1.sendUnaryData<dependency_11.protocol.IncrementalMerkleVoucherInfo>): void;
        abstract ScanNoteByIvk(call: grpc_1.ServerUnaryCall<IvkDecryptParameters, DecryptNotes>, callback: grpc_1.sendUnaryData<DecryptNotes>): void;
        abstract ScanAndMarkNoteByIvk(call: grpc_1.ServerUnaryCall<IvkDecryptAndMarkParameters, DecryptNotesMarked>, callback: grpc_1.sendUnaryData<DecryptNotesMarked>): void;
        abstract ScanNoteByOvk(call: grpc_1.ServerUnaryCall<OvkDecryptParameters, DecryptNotes>, callback: grpc_1.sendUnaryData<DecryptNotes>): void;
        abstract GetSpendingKey(call: grpc_1.ServerUnaryCall<EmptyMessage, BytesMessage>, callback: grpc_1.sendUnaryData<BytesMessage>): void;
        abstract GetExpandedSpendingKey(call: grpc_1.ServerUnaryCall<BytesMessage, ExpandedSpendingKeyMessage>, callback: grpc_1.sendUnaryData<ExpandedSpendingKeyMessage>): void;
        abstract GetAkFromAsk(call: grpc_1.ServerUnaryCall<BytesMessage, BytesMessage>, callback: grpc_1.sendUnaryData<BytesMessage>): void;
        abstract GetNkFromNsk(call: grpc_1.ServerUnaryCall<BytesMessage, BytesMessage>, callback: grpc_1.sendUnaryData<BytesMessage>): void;
        abstract GetIncomingViewingKey(call: grpc_1.ServerUnaryCall<ViewingKeyMessage, IncomingViewingKeyMessage>, callback: grpc_1.sendUnaryData<IncomingViewingKeyMessage>): void;
        abstract GetDiversifier(call: grpc_1.ServerUnaryCall<EmptyMessage, DiversifierMessage>, callback: grpc_1.sendUnaryData<DiversifierMessage>): void;
        abstract GetNewShieldedAddress(call: grpc_1.ServerUnaryCall<EmptyMessage, ShieldedAddressInfo>, callback: grpc_1.sendUnaryData<ShieldedAddressInfo>): void;
        abstract GetZenPaymentAddress(call: grpc_1.ServerUnaryCall<IncomingViewingKeyDiversifierMessage, PaymentAddressMessage>, callback: grpc_1.sendUnaryData<PaymentAddressMessage>): void;
        abstract GetRcm(call: grpc_1.ServerUnaryCall<EmptyMessage, BytesMessage>, callback: grpc_1.sendUnaryData<BytesMessage>): void;
        abstract IsSpend(call: grpc_1.ServerUnaryCall<NoteParameters, SpendResult>, callback: grpc_1.sendUnaryData<SpendResult>): void;
        abstract CreateShieldedTransactionWithoutSpendAuthSig(call: grpc_1.ServerUnaryCall<PrivateParametersWithoutAsk, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract GetShieldTransactionHash(call: grpc_1.ServerUnaryCall<dependency_1.protocol.Transaction, BytesMessage>, callback: grpc_1.sendUnaryData<BytesMessage>): void;
        abstract CreateSpendAuthSig(call: grpc_1.ServerUnaryCall<SpendAuthSigParameters, BytesMessage>, callback: grpc_1.sendUnaryData<BytesMessage>): void;
        abstract CreateShieldNullifier(call: grpc_1.ServerUnaryCall<NfParameters, BytesMessage>, callback: grpc_1.sendUnaryData<BytesMessage>): void;
        abstract CreateShieldedContractParameters(call: grpc_1.ServerUnaryCall<PrivateShieldedTRC20Parameters, ShieldedTRC20Parameters>, callback: grpc_1.sendUnaryData<ShieldedTRC20Parameters>): void;
        abstract CreateShieldedContractParametersWithoutAsk(call: grpc_1.ServerUnaryCall<PrivateShieldedTRC20ParametersWithoutAsk, ShieldedTRC20Parameters>, callback: grpc_1.sendUnaryData<ShieldedTRC20Parameters>): void;
        abstract ScanShieldedTRC20NotesByIvk(call: grpc_1.ServerUnaryCall<IvkDecryptTRC20Parameters, DecryptNotesTRC20>, callback: grpc_1.sendUnaryData<DecryptNotesTRC20>): void;
        abstract ScanShieldedTRC20NotesByOvk(call: grpc_1.ServerUnaryCall<OvkDecryptTRC20Parameters, DecryptNotesTRC20>, callback: grpc_1.sendUnaryData<DecryptNotesTRC20>): void;
        abstract IsShieldedTRC20ContractNoteSpent(call: grpc_1.ServerUnaryCall<NfTRC20Parameters, NullifierResult>, callback: grpc_1.sendUnaryData<NullifierResult>): void;
        abstract GetTriggerInputForShieldedTRC20Contract(call: grpc_1.ServerUnaryCall<ShieldedTRC20TriggerContractParameters, BytesMessage>, callback: grpc_1.sendUnaryData<BytesMessage>): void;
        abstract CreateCommonTransaction(call: grpc_1.ServerUnaryCall<dependency_1.protocol.Transaction, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract GetTransactionInfoByBlockNum(call: grpc_1.ServerUnaryCall<NumberMessage, TransactionInfoList>, callback: grpc_1.sendUnaryData<TransactionInfoList>): void;
        abstract GetBurnTrx(call: grpc_1.ServerUnaryCall<EmptyMessage, NumberMessage>, callback: grpc_1.sendUnaryData<NumberMessage>): void;
        abstract GetTransactionFromPending(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract GetTransactionListFromPending(call: grpc_1.ServerUnaryCall<EmptyMessage, TransactionIdList>, callback: grpc_1.sendUnaryData<TransactionIdList>): void;
        abstract GetPendingSize(call: grpc_1.ServerUnaryCall<EmptyMessage, NumberMessage>, callback: grpc_1.sendUnaryData<NumberMessage>): void;
        abstract GetBlock(call: grpc_1.ServerUnaryCall<BlockReq, BlockExtention>, callback: grpc_1.sendUnaryData<BlockExtention>): void;
        abstract GetBandwidthPrices(call: grpc_1.ServerUnaryCall<EmptyMessage, PricesResponseMessage>, callback: grpc_1.sendUnaryData<PricesResponseMessage>): void;
        abstract GetEnergyPrices(call: grpc_1.ServerUnaryCall<EmptyMessage, PricesResponseMessage>, callback: grpc_1.sendUnaryData<PricesResponseMessage>): void;
        abstract GetMemoFee(call: grpc_1.ServerUnaryCall<EmptyMessage, PricesResponseMessage>, callback: grpc_1.sendUnaryData<PricesResponseMessage>): void;
    }
    const WalletClient_base: grpc_1.ServiceClientConstructor;
    export class WalletClient extends WalletClient_base {
        constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>);
        GetAccount: GrpcUnaryServiceInterface<dependency_1.protocol.Account, dependency_1.protocol.Account>;
        GetAccountById: GrpcUnaryServiceInterface<dependency_1.protocol.Account, dependency_1.protocol.Account>;
        GetAccountBalance: GrpcUnaryServiceInterface<dependency_5.protocol.AccountBalanceRequest, dependency_5.protocol.AccountBalanceResponse>;
        GetBlockBalanceTrace: GrpcUnaryServiceInterface<dependency_5.protocol.BlockBalanceTrace.BlockIdentifier, dependency_5.protocol.BlockBalanceTrace>;
        CreateTransaction: GrpcUnaryServiceInterface<dependency_5.protocol.TransferContract, dependency_1.protocol.Transaction>;
        CreateTransaction2: GrpcUnaryServiceInterface<dependency_5.protocol.TransferContract, TransactionExtention>;
        BroadcastTransaction: GrpcUnaryServiceInterface<dependency_1.protocol.Transaction, Return>;
        UpdateAccount: GrpcUnaryServiceInterface<dependency_3.protocol.AccountUpdateContract, dependency_1.protocol.Transaction>;
        SetAccountId: GrpcUnaryServiceInterface<dependency_3.protocol.SetAccountIdContract, dependency_1.protocol.Transaction>;
        UpdateAccount2: GrpcUnaryServiceInterface<dependency_3.protocol.AccountUpdateContract, TransactionExtention>;
        VoteWitnessAccount: GrpcUnaryServiceInterface<dependency_4.protocol.VoteWitnessContract, dependency_1.protocol.Transaction>;
        UpdateSetting: GrpcUnaryServiceInterface<dependency_10.protocol.UpdateSettingContract, TransactionExtention>;
        UpdateEnergyLimit: GrpcUnaryServiceInterface<dependency_10.protocol.UpdateEnergyLimitContract, TransactionExtention>;
        VoteWitnessAccount2: GrpcUnaryServiceInterface<dependency_4.protocol.VoteWitnessContract, TransactionExtention>;
        CreateAssetIssue: GrpcUnaryServiceInterface<dependency_2.protocol.AssetIssueContract, dependency_1.protocol.Transaction>;
        CreateAssetIssue2: GrpcUnaryServiceInterface<dependency_2.protocol.AssetIssueContract, TransactionExtention>;
        UpdateWitness: GrpcUnaryServiceInterface<dependency_4.protocol.WitnessUpdateContract, dependency_1.protocol.Transaction>;
        UpdateWitness2: GrpcUnaryServiceInterface<dependency_4.protocol.WitnessUpdateContract, TransactionExtention>;
        CreateAccount: GrpcUnaryServiceInterface<dependency_3.protocol.AccountCreateContract, dependency_1.protocol.Transaction>;
        CreateAccount2: GrpcUnaryServiceInterface<dependency_3.protocol.AccountCreateContract, TransactionExtention>;
        CreateWitness: GrpcUnaryServiceInterface<dependency_4.protocol.WitnessCreateContract, dependency_1.protocol.Transaction>;
        CreateWitness2: GrpcUnaryServiceInterface<dependency_4.protocol.WitnessCreateContract, TransactionExtention>;
        TransferAsset: GrpcUnaryServiceInterface<dependency_2.protocol.TransferAssetContract, dependency_1.protocol.Transaction>;
        TransferAsset2: GrpcUnaryServiceInterface<dependency_2.protocol.TransferAssetContract, TransactionExtention>;
        ParticipateAssetIssue: GrpcUnaryServiceInterface<dependency_2.protocol.ParticipateAssetIssueContract, dependency_1.protocol.Transaction>;
        ParticipateAssetIssue2: GrpcUnaryServiceInterface<dependency_2.protocol.ParticipateAssetIssueContract, TransactionExtention>;
        FreezeBalance: GrpcUnaryServiceInterface<dependency_5.protocol.FreezeBalanceContract, dependency_1.protocol.Transaction>;
        FreezeBalance2: GrpcUnaryServiceInterface<dependency_5.protocol.FreezeBalanceContract, TransactionExtention>;
        FreezeBalanceV2: GrpcUnaryServiceInterface<dependency_5.protocol.FreezeBalanceV2Contract, TransactionExtention>;
        UnfreezeBalance: GrpcUnaryServiceInterface<dependency_5.protocol.UnfreezeBalanceContract, dependency_1.protocol.Transaction>;
        UnfreezeBalance2: GrpcUnaryServiceInterface<dependency_5.protocol.UnfreezeBalanceContract, TransactionExtention>;
        UnfreezeBalanceV2: GrpcUnaryServiceInterface<dependency_5.protocol.UnfreezeBalanceV2Contract, TransactionExtention>;
        UnfreezeAsset: GrpcUnaryServiceInterface<dependency_2.protocol.UnfreezeAssetContract, dependency_1.protocol.Transaction>;
        UnfreezeAsset2: GrpcUnaryServiceInterface<dependency_2.protocol.UnfreezeAssetContract, TransactionExtention>;
        WithdrawBalance: GrpcUnaryServiceInterface<dependency_5.protocol.WithdrawBalanceContract, dependency_1.protocol.Transaction>;
        WithdrawBalance2: GrpcUnaryServiceInterface<dependency_5.protocol.WithdrawBalanceContract, TransactionExtention>;
        WithdrawExpireUnfreeze: GrpcUnaryServiceInterface<dependency_5.protocol.WithdrawExpireUnfreezeContract, TransactionExtention>;
        DelegateResource: GrpcUnaryServiceInterface<dependency_5.protocol.DelegateResourceContract, TransactionExtention>;
        UnDelegateResource: GrpcUnaryServiceInterface<dependency_5.protocol.UnDelegateResourceContract, TransactionExtention>;
        CancelAllUnfreezeV2: GrpcUnaryServiceInterface<dependency_5.protocol.CancelAllUnfreezeV2Contract, TransactionExtention>;
        UpdateAsset: GrpcUnaryServiceInterface<dependency_2.protocol.UpdateAssetContract, dependency_1.protocol.Transaction>;
        UpdateAsset2: GrpcUnaryServiceInterface<dependency_2.protocol.UpdateAssetContract, TransactionExtention>;
        ProposalCreate: GrpcUnaryServiceInterface<dependency_6.protocol.ProposalCreateContract, TransactionExtention>;
        ProposalApprove: GrpcUnaryServiceInterface<dependency_6.protocol.ProposalApproveContract, TransactionExtention>;
        ProposalDelete: GrpcUnaryServiceInterface<dependency_6.protocol.ProposalDeleteContract, TransactionExtention>;
        BuyStorage: GrpcUnaryServiceInterface<dependency_7.protocol.BuyStorageContract, TransactionExtention>;
        BuyStorageBytes: GrpcUnaryServiceInterface<dependency_7.protocol.BuyStorageBytesContract, TransactionExtention>;
        SellStorage: GrpcUnaryServiceInterface<dependency_7.protocol.SellStorageContract, TransactionExtention>;
        ExchangeCreate: GrpcUnaryServiceInterface<dependency_8.protocol.ExchangeCreateContract, TransactionExtention>;
        ExchangeInject: GrpcUnaryServiceInterface<dependency_8.protocol.ExchangeInjectContract, TransactionExtention>;
        ExchangeWithdraw: GrpcUnaryServiceInterface<dependency_8.protocol.ExchangeWithdrawContract, TransactionExtention>;
        ExchangeTransaction: GrpcUnaryServiceInterface<dependency_8.protocol.ExchangeTransactionContract, TransactionExtention>;
        MarketSellAsset: GrpcUnaryServiceInterface<dependency_9.protocol.MarketSellAssetContract, TransactionExtention>;
        MarketCancelOrder: GrpcUnaryServiceInterface<dependency_9.protocol.MarketCancelOrderContract, TransactionExtention>;
        GetMarketOrderById: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.MarketOrder>;
        GetMarketOrderByAccount: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.MarketOrderList>;
        GetMarketPriceByPair: GrpcUnaryServiceInterface<dependency_1.protocol.MarketOrderPair, dependency_1.protocol.MarketPriceList>;
        GetMarketOrderListByPair: GrpcUnaryServiceInterface<dependency_1.protocol.MarketOrderPair, dependency_1.protocol.MarketOrderList>;
        GetMarketPairList: GrpcUnaryServiceInterface<EmptyMessage, dependency_1.protocol.MarketOrderPairList>;
        ListNodes: GrpcUnaryServiceInterface<EmptyMessage, NodeList>;
        GetAssetIssueByAccount: GrpcUnaryServiceInterface<dependency_1.protocol.Account, AssetIssueList>;
        GetAccountNet: GrpcUnaryServiceInterface<dependency_1.protocol.Account, AccountNetMessage>;
        GetAccountResource: GrpcUnaryServiceInterface<dependency_1.protocol.Account, AccountResourceMessage>;
        GetAssetIssueByName: GrpcUnaryServiceInterface<BytesMessage, dependency_2.protocol.AssetIssueContract>;
        GetAssetIssueListByName: GrpcUnaryServiceInterface<BytesMessage, AssetIssueList>;
        GetAssetIssueById: GrpcUnaryServiceInterface<BytesMessage, dependency_2.protocol.AssetIssueContract>;
        GetNowBlock: GrpcUnaryServiceInterface<EmptyMessage, dependency_1.protocol.Block>;
        GetNowBlock2: GrpcUnaryServiceInterface<EmptyMessage, BlockExtention>;
        GetBlockByNum: GrpcUnaryServiceInterface<NumberMessage, dependency_1.protocol.Block>;
        GetBlockByNum2: GrpcUnaryServiceInterface<NumberMessage, BlockExtention>;
        GetTransactionCountByBlockNum: GrpcUnaryServiceInterface<NumberMessage, NumberMessage>;
        GetBlockById: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.Block>;
        GetBlockByLimitNext: GrpcUnaryServiceInterface<BlockLimit, BlockList>;
        GetBlockByLimitNext2: GrpcUnaryServiceInterface<BlockLimit, BlockListExtention>;
        GetBlockByLatestNum: GrpcUnaryServiceInterface<NumberMessage, BlockList>;
        GetBlockByLatestNum2: GrpcUnaryServiceInterface<NumberMessage, BlockListExtention>;
        GetTransactionById: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.Transaction>;
        DeployContract: GrpcUnaryServiceInterface<dependency_10.protocol.CreateSmartContract, TransactionExtention>;
        GetContract: GrpcUnaryServiceInterface<BytesMessage, dependency_10.protocol.SmartContract>;
        GetContractInfo: GrpcUnaryServiceInterface<BytesMessage, dependency_10.protocol.SmartContractDataWrapper>;
        TriggerContract: GrpcUnaryServiceInterface<dependency_10.protocol.TriggerSmartContract, TransactionExtention>;
        TriggerConstantContract: GrpcUnaryServiceInterface<dependency_10.protocol.TriggerSmartContract, TransactionExtention>;
        EstimateEnergy: GrpcUnaryServiceInterface<dependency_10.protocol.TriggerSmartContract, EstimateEnergyMessage>;
        ClearContractABI: GrpcUnaryServiceInterface<dependency_10.protocol.ClearABIContract, TransactionExtention>;
        ListWitnesses: GrpcUnaryServiceInterface<EmptyMessage, WitnessList>;
        GetPaginatedNowWitnessList: GrpcUnaryServiceInterface<PaginatedMessage, WitnessList>;
        GetDelegatedResource: GrpcUnaryServiceInterface<DelegatedResourceMessage, DelegatedResourceList>;
        GetDelegatedResourceV2: GrpcUnaryServiceInterface<DelegatedResourceMessage, DelegatedResourceList>;
        GetDelegatedResourceAccountIndex: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.DelegatedResourceAccountIndex>;
        GetDelegatedResourceAccountIndexV2: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.DelegatedResourceAccountIndex>;
        GetCanDelegatedMaxSize: GrpcUnaryServiceInterface<CanDelegatedMaxSizeRequestMessage, CanDelegatedMaxSizeResponseMessage>;
        GetAvailableUnfreezeCount: GrpcUnaryServiceInterface<GetAvailableUnfreezeCountRequestMessage, GetAvailableUnfreezeCountResponseMessage>;
        GetCanWithdrawUnfreezeAmount: GrpcUnaryServiceInterface<CanWithdrawUnfreezeAmountRequestMessage, CanWithdrawUnfreezeAmountResponseMessage>;
        ListProposals: GrpcUnaryServiceInterface<EmptyMessage, ProposalList>;
        GetPaginatedProposalList: GrpcUnaryServiceInterface<PaginatedMessage, ProposalList>;
        GetProposalById: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.Proposal>;
        ListExchanges: GrpcUnaryServiceInterface<EmptyMessage, ExchangeList>;
        GetPaginatedExchangeList: GrpcUnaryServiceInterface<PaginatedMessage, ExchangeList>;
        GetExchangeById: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.Exchange>;
        GetChainParameters: GrpcUnaryServiceInterface<EmptyMessage, dependency_1.protocol.ChainParameters>;
        GetAssetIssueList: GrpcUnaryServiceInterface<EmptyMessage, AssetIssueList>;
        GetPaginatedAssetIssueList: GrpcUnaryServiceInterface<PaginatedMessage, AssetIssueList>;
        TotalTransaction: GrpcUnaryServiceInterface<EmptyMessage, NumberMessage>;
        GetNextMaintenanceTime: GrpcUnaryServiceInterface<EmptyMessage, NumberMessage>;
        GetTransactionInfoById: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.TransactionInfo>;
        AccountPermissionUpdate: GrpcUnaryServiceInterface<dependency_3.protocol.AccountPermissionUpdateContract, TransactionExtention>;
        GetTransactionSignWeight: GrpcUnaryServiceInterface<dependency_1.protocol.Transaction, TransactionSignWeight>;
        GetTransactionApprovedList: GrpcUnaryServiceInterface<dependency_1.protocol.Transaction, TransactionApprovedList>;
        GetNodeInfo: GrpcUnaryServiceInterface<EmptyMessage, dependency_1.protocol.NodeInfo>;
        GetRewardInfo: GrpcUnaryServiceInterface<BytesMessage, NumberMessage>;
        GetBrokerageInfo: GrpcUnaryServiceInterface<BytesMessage, NumberMessage>;
        UpdateBrokerage: GrpcUnaryServiceInterface<dependency_7.protocol.UpdateBrokerageContract, TransactionExtention>;
        CreateShieldedTransaction: GrpcUnaryServiceInterface<PrivateParameters, TransactionExtention>;
        GetMerkleTreeVoucherInfo: GrpcUnaryServiceInterface<dependency_11.protocol.OutputPointInfo, dependency_11.protocol.IncrementalMerkleVoucherInfo>;
        ScanNoteByIvk: GrpcUnaryServiceInterface<IvkDecryptParameters, DecryptNotes>;
        ScanAndMarkNoteByIvk: GrpcUnaryServiceInterface<IvkDecryptAndMarkParameters, DecryptNotesMarked>;
        ScanNoteByOvk: GrpcUnaryServiceInterface<OvkDecryptParameters, DecryptNotes>;
        GetSpendingKey: GrpcUnaryServiceInterface<EmptyMessage, BytesMessage>;
        GetExpandedSpendingKey: GrpcUnaryServiceInterface<BytesMessage, ExpandedSpendingKeyMessage>;
        GetAkFromAsk: GrpcUnaryServiceInterface<BytesMessage, BytesMessage>;
        GetNkFromNsk: GrpcUnaryServiceInterface<BytesMessage, BytesMessage>;
        GetIncomingViewingKey: GrpcUnaryServiceInterface<ViewingKeyMessage, IncomingViewingKeyMessage>;
        GetDiversifier: GrpcUnaryServiceInterface<EmptyMessage, DiversifierMessage>;
        GetNewShieldedAddress: GrpcUnaryServiceInterface<EmptyMessage, ShieldedAddressInfo>;
        GetZenPaymentAddress: GrpcUnaryServiceInterface<IncomingViewingKeyDiversifierMessage, PaymentAddressMessage>;
        GetRcm: GrpcUnaryServiceInterface<EmptyMessage, BytesMessage>;
        IsSpend: GrpcUnaryServiceInterface<NoteParameters, SpendResult>;
        CreateShieldedTransactionWithoutSpendAuthSig: GrpcUnaryServiceInterface<PrivateParametersWithoutAsk, TransactionExtention>;
        GetShieldTransactionHash: GrpcUnaryServiceInterface<dependency_1.protocol.Transaction, BytesMessage>;
        CreateSpendAuthSig: GrpcUnaryServiceInterface<SpendAuthSigParameters, BytesMessage>;
        CreateShieldNullifier: GrpcUnaryServiceInterface<NfParameters, BytesMessage>;
        CreateShieldedContractParameters: GrpcUnaryServiceInterface<PrivateShieldedTRC20Parameters, ShieldedTRC20Parameters>;
        CreateShieldedContractParametersWithoutAsk: GrpcUnaryServiceInterface<PrivateShieldedTRC20ParametersWithoutAsk, ShieldedTRC20Parameters>;
        ScanShieldedTRC20NotesByIvk: GrpcUnaryServiceInterface<IvkDecryptTRC20Parameters, DecryptNotesTRC20>;
        ScanShieldedTRC20NotesByOvk: GrpcUnaryServiceInterface<OvkDecryptTRC20Parameters, DecryptNotesTRC20>;
        IsShieldedTRC20ContractNoteSpent: GrpcUnaryServiceInterface<NfTRC20Parameters, NullifierResult>;
        GetTriggerInputForShieldedTRC20Contract: GrpcUnaryServiceInterface<ShieldedTRC20TriggerContractParameters, BytesMessage>;
        CreateCommonTransaction: GrpcUnaryServiceInterface<dependency_1.protocol.Transaction, TransactionExtention>;
        GetTransactionInfoByBlockNum: GrpcUnaryServiceInterface<NumberMessage, TransactionInfoList>;
        GetBurnTrx: GrpcUnaryServiceInterface<EmptyMessage, NumberMessage>;
        GetTransactionFromPending: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.Transaction>;
        GetTransactionListFromPending: GrpcUnaryServiceInterface<EmptyMessage, TransactionIdList>;
        GetPendingSize: GrpcUnaryServiceInterface<EmptyMessage, NumberMessage>;
        GetBlock: GrpcUnaryServiceInterface<BlockReq, BlockExtention>;
        GetBandwidthPrices: GrpcUnaryServiceInterface<EmptyMessage, PricesResponseMessage>;
        GetEnergyPrices: GrpcUnaryServiceInterface<EmptyMessage, PricesResponseMessage>;
        GetMemoFee: GrpcUnaryServiceInterface<EmptyMessage, PricesResponseMessage>;
    }
    export abstract class UnimplementedWalletSolidityService {
        static definition: {
            GetAccount: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.Account) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.Account;
                responseSerialize: (message: dependency_1.protocol.Account) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Account;
            };
            GetAccountById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.Account) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.Account;
                responseSerialize: (message: dependency_1.protocol.Account) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Account;
            };
            ListWitnesses: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: WitnessList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => WitnessList;
            };
            GetPaginatedNowWitnessList: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: PaginatedMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => PaginatedMessage;
                responseSerialize: (message: WitnessList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => WitnessList;
            };
            GetAssetIssueList: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: AssetIssueList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => AssetIssueList;
            };
            GetPaginatedAssetIssueList: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: PaginatedMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => PaginatedMessage;
                responseSerialize: (message: AssetIssueList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => AssetIssueList;
            };
            GetAssetIssueByName: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_2.protocol.AssetIssueContract) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_2.protocol.AssetIssueContract;
            };
            GetAssetIssueListByName: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: AssetIssueList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => AssetIssueList;
            };
            GetAssetIssueById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_2.protocol.AssetIssueContract) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_2.protocol.AssetIssueContract;
            };
            GetNowBlock: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: dependency_1.protocol.Block) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Block;
            };
            GetNowBlock2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: BlockExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BlockExtention;
            };
            GetBlockByNum: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NumberMessage;
                responseSerialize: (message: dependency_1.protocol.Block) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Block;
            };
            GetBlockByNum2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NumberMessage;
                responseSerialize: (message: BlockExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BlockExtention;
            };
            GetTransactionCountByBlockNum: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NumberMessage;
                responseSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NumberMessage;
            };
            GetDelegatedResource: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: DelegatedResourceMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => DelegatedResourceMessage;
                responseSerialize: (message: DelegatedResourceList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DelegatedResourceList;
            };
            GetDelegatedResourceV2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: DelegatedResourceMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => DelegatedResourceMessage;
                responseSerialize: (message: DelegatedResourceList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DelegatedResourceList;
            };
            GetDelegatedResourceAccountIndex: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.DelegatedResourceAccountIndex) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.DelegatedResourceAccountIndex;
            };
            GetDelegatedResourceAccountIndexV2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.DelegatedResourceAccountIndex) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.DelegatedResourceAccountIndex;
            };
            GetCanDelegatedMaxSize: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: CanDelegatedMaxSizeRequestMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => CanDelegatedMaxSizeRequestMessage;
                responseSerialize: (message: CanDelegatedMaxSizeResponseMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => CanDelegatedMaxSizeResponseMessage;
            };
            GetAvailableUnfreezeCount: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: GetAvailableUnfreezeCountRequestMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => GetAvailableUnfreezeCountRequestMessage;
                responseSerialize: (message: GetAvailableUnfreezeCountResponseMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => GetAvailableUnfreezeCountResponseMessage;
            };
            GetCanWithdrawUnfreezeAmount: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: CanWithdrawUnfreezeAmountRequestMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => CanWithdrawUnfreezeAmountRequestMessage;
                responseSerialize: (message: CanWithdrawUnfreezeAmountResponseMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => CanWithdrawUnfreezeAmountResponseMessage;
            };
            GetExchangeById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.Exchange) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Exchange;
            };
            ListExchanges: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: ExchangeList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => ExchangeList;
            };
            GetTransactionById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.Transaction) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Transaction;
            };
            GetTransactionInfoById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.TransactionInfo) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.TransactionInfo;
            };
            GetMerkleTreeVoucherInfo: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_11.protocol.OutputPointInfo) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_11.protocol.OutputPointInfo;
                responseSerialize: (message: dependency_11.protocol.IncrementalMerkleVoucherInfo) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_11.protocol.IncrementalMerkleVoucherInfo;
            };
            ScanNoteByIvk: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: IvkDecryptParameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => IvkDecryptParameters;
                responseSerialize: (message: DecryptNotes) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DecryptNotes;
            };
            ScanAndMarkNoteByIvk: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: IvkDecryptAndMarkParameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => IvkDecryptAndMarkParameters;
                responseSerialize: (message: DecryptNotesMarked) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DecryptNotesMarked;
            };
            ScanNoteByOvk: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: OvkDecryptParameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => OvkDecryptParameters;
                responseSerialize: (message: DecryptNotes) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DecryptNotes;
            };
            IsSpend: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NoteParameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NoteParameters;
                responseSerialize: (message: SpendResult) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => SpendResult;
            };
            ScanShieldedTRC20NotesByIvk: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: IvkDecryptTRC20Parameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => IvkDecryptTRC20Parameters;
                responseSerialize: (message: DecryptNotesTRC20) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DecryptNotesTRC20;
            };
            ScanShieldedTRC20NotesByOvk: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: OvkDecryptTRC20Parameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => OvkDecryptTRC20Parameters;
                responseSerialize: (message: DecryptNotesTRC20) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DecryptNotesTRC20;
            };
            IsShieldedTRC20ContractNoteSpent: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NfTRC20Parameters) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NfTRC20Parameters;
                responseSerialize: (message: NullifierResult) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NullifierResult;
            };
            GetRewardInfo: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NumberMessage;
            };
            GetBrokerageInfo: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NumberMessage;
            };
            TriggerConstantContract: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_10.protocol.TriggerSmartContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_10.protocol.TriggerSmartContract;
                responseSerialize: (message: TransactionExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionExtention;
            };
            EstimateEnergy: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_10.protocol.TriggerSmartContract) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_10.protocol.TriggerSmartContract;
                responseSerialize: (message: EstimateEnergyMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => EstimateEnergyMessage;
            };
            GetTransactionInfoByBlockNum: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NumberMessage;
                responseSerialize: (message: TransactionInfoList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionInfoList;
            };
            GetMarketOrderById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.MarketOrder) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.MarketOrder;
            };
            GetMarketOrderByAccount: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BytesMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BytesMessage;
                responseSerialize: (message: dependency_1.protocol.MarketOrderList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.MarketOrderList;
            };
            GetMarketPriceByPair: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.MarketOrderPair) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.MarketOrderPair;
                responseSerialize: (message: dependency_1.protocol.MarketPriceList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.MarketPriceList;
            };
            GetMarketOrderListByPair: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: dependency_1.protocol.MarketOrderPair) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => dependency_1.protocol.MarketOrderPair;
                responseSerialize: (message: dependency_1.protocol.MarketOrderList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.MarketOrderList;
            };
            GetMarketPairList: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: dependency_1.protocol.MarketOrderPairList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.MarketOrderPairList;
            };
            GetBurnTrx: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NumberMessage;
            };
            GetBlock: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: BlockReq) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => BlockReq;
                responseSerialize: (message: BlockExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BlockExtention;
            };
            GetBandwidthPrices: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: PricesResponseMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => PricesResponseMessage;
            };
            GetEnergyPrices: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: PricesResponseMessage) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => PricesResponseMessage;
            };
        };
        [method: string]: grpc_1.UntypedHandleCall;
        abstract GetAccount(call: grpc_1.ServerUnaryCall<dependency_1.protocol.Account, dependency_1.protocol.Account>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Account>): void;
        abstract GetAccountById(call: grpc_1.ServerUnaryCall<dependency_1.protocol.Account, dependency_1.protocol.Account>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Account>): void;
        abstract ListWitnesses(call: grpc_1.ServerUnaryCall<EmptyMessage, WitnessList>, callback: grpc_1.sendUnaryData<WitnessList>): void;
        abstract GetPaginatedNowWitnessList(call: grpc_1.ServerUnaryCall<PaginatedMessage, WitnessList>, callback: grpc_1.sendUnaryData<WitnessList>): void;
        abstract GetAssetIssueList(call: grpc_1.ServerUnaryCall<EmptyMessage, AssetIssueList>, callback: grpc_1.sendUnaryData<AssetIssueList>): void;
        abstract GetPaginatedAssetIssueList(call: grpc_1.ServerUnaryCall<PaginatedMessage, AssetIssueList>, callback: grpc_1.sendUnaryData<AssetIssueList>): void;
        abstract GetAssetIssueByName(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_2.protocol.AssetIssueContract>, callback: grpc_1.sendUnaryData<dependency_2.protocol.AssetIssueContract>): void;
        abstract GetAssetIssueListByName(call: grpc_1.ServerUnaryCall<BytesMessage, AssetIssueList>, callback: grpc_1.sendUnaryData<AssetIssueList>): void;
        abstract GetAssetIssueById(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_2.protocol.AssetIssueContract>, callback: grpc_1.sendUnaryData<dependency_2.protocol.AssetIssueContract>): void;
        abstract GetNowBlock(call: grpc_1.ServerUnaryCall<EmptyMessage, dependency_1.protocol.Block>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Block>): void;
        abstract GetNowBlock2(call: grpc_1.ServerUnaryCall<EmptyMessage, BlockExtention>, callback: grpc_1.sendUnaryData<BlockExtention>): void;
        abstract GetBlockByNum(call: grpc_1.ServerUnaryCall<NumberMessage, dependency_1.protocol.Block>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Block>): void;
        abstract GetBlockByNum2(call: grpc_1.ServerUnaryCall<NumberMessage, BlockExtention>, callback: grpc_1.sendUnaryData<BlockExtention>): void;
        abstract GetTransactionCountByBlockNum(call: grpc_1.ServerUnaryCall<NumberMessage, NumberMessage>, callback: grpc_1.sendUnaryData<NumberMessage>): void;
        abstract GetDelegatedResource(call: grpc_1.ServerUnaryCall<DelegatedResourceMessage, DelegatedResourceList>, callback: grpc_1.sendUnaryData<DelegatedResourceList>): void;
        abstract GetDelegatedResourceV2(call: grpc_1.ServerUnaryCall<DelegatedResourceMessage, DelegatedResourceList>, callback: grpc_1.sendUnaryData<DelegatedResourceList>): void;
        abstract GetDelegatedResourceAccountIndex(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.DelegatedResourceAccountIndex>, callback: grpc_1.sendUnaryData<dependency_1.protocol.DelegatedResourceAccountIndex>): void;
        abstract GetDelegatedResourceAccountIndexV2(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.DelegatedResourceAccountIndex>, callback: grpc_1.sendUnaryData<dependency_1.protocol.DelegatedResourceAccountIndex>): void;
        abstract GetCanDelegatedMaxSize(call: grpc_1.ServerUnaryCall<CanDelegatedMaxSizeRequestMessage, CanDelegatedMaxSizeResponseMessage>, callback: grpc_1.sendUnaryData<CanDelegatedMaxSizeResponseMessage>): void;
        abstract GetAvailableUnfreezeCount(call: grpc_1.ServerUnaryCall<GetAvailableUnfreezeCountRequestMessage, GetAvailableUnfreezeCountResponseMessage>, callback: grpc_1.sendUnaryData<GetAvailableUnfreezeCountResponseMessage>): void;
        abstract GetCanWithdrawUnfreezeAmount(call: grpc_1.ServerUnaryCall<CanWithdrawUnfreezeAmountRequestMessage, CanWithdrawUnfreezeAmountResponseMessage>, callback: grpc_1.sendUnaryData<CanWithdrawUnfreezeAmountResponseMessage>): void;
        abstract GetExchangeById(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.Exchange>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Exchange>): void;
        abstract ListExchanges(call: grpc_1.ServerUnaryCall<EmptyMessage, ExchangeList>, callback: grpc_1.sendUnaryData<ExchangeList>): void;
        abstract GetTransactionById(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.Transaction>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Transaction>): void;
        abstract GetTransactionInfoById(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.TransactionInfo>, callback: grpc_1.sendUnaryData<dependency_1.protocol.TransactionInfo>): void;
        abstract GetMerkleTreeVoucherInfo(call: grpc_1.ServerUnaryCall<dependency_11.protocol.OutputPointInfo, dependency_11.protocol.IncrementalMerkleVoucherInfo>, callback: grpc_1.sendUnaryData<dependency_11.protocol.IncrementalMerkleVoucherInfo>): void;
        abstract ScanNoteByIvk(call: grpc_1.ServerUnaryCall<IvkDecryptParameters, DecryptNotes>, callback: grpc_1.sendUnaryData<DecryptNotes>): void;
        abstract ScanAndMarkNoteByIvk(call: grpc_1.ServerUnaryCall<IvkDecryptAndMarkParameters, DecryptNotesMarked>, callback: grpc_1.sendUnaryData<DecryptNotesMarked>): void;
        abstract ScanNoteByOvk(call: grpc_1.ServerUnaryCall<OvkDecryptParameters, DecryptNotes>, callback: grpc_1.sendUnaryData<DecryptNotes>): void;
        abstract IsSpend(call: grpc_1.ServerUnaryCall<NoteParameters, SpendResult>, callback: grpc_1.sendUnaryData<SpendResult>): void;
        abstract ScanShieldedTRC20NotesByIvk(call: grpc_1.ServerUnaryCall<IvkDecryptTRC20Parameters, DecryptNotesTRC20>, callback: grpc_1.sendUnaryData<DecryptNotesTRC20>): void;
        abstract ScanShieldedTRC20NotesByOvk(call: grpc_1.ServerUnaryCall<OvkDecryptTRC20Parameters, DecryptNotesTRC20>, callback: grpc_1.sendUnaryData<DecryptNotesTRC20>): void;
        abstract IsShieldedTRC20ContractNoteSpent(call: grpc_1.ServerUnaryCall<NfTRC20Parameters, NullifierResult>, callback: grpc_1.sendUnaryData<NullifierResult>): void;
        abstract GetRewardInfo(call: grpc_1.ServerUnaryCall<BytesMessage, NumberMessage>, callback: grpc_1.sendUnaryData<NumberMessage>): void;
        abstract GetBrokerageInfo(call: grpc_1.ServerUnaryCall<BytesMessage, NumberMessage>, callback: grpc_1.sendUnaryData<NumberMessage>): void;
        abstract TriggerConstantContract(call: grpc_1.ServerUnaryCall<dependency_10.protocol.TriggerSmartContract, TransactionExtention>, callback: grpc_1.sendUnaryData<TransactionExtention>): void;
        abstract EstimateEnergy(call: grpc_1.ServerUnaryCall<dependency_10.protocol.TriggerSmartContract, EstimateEnergyMessage>, callback: grpc_1.sendUnaryData<EstimateEnergyMessage>): void;
        abstract GetTransactionInfoByBlockNum(call: grpc_1.ServerUnaryCall<NumberMessage, TransactionInfoList>, callback: grpc_1.sendUnaryData<TransactionInfoList>): void;
        abstract GetMarketOrderById(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.MarketOrder>, callback: grpc_1.sendUnaryData<dependency_1.protocol.MarketOrder>): void;
        abstract GetMarketOrderByAccount(call: grpc_1.ServerUnaryCall<BytesMessage, dependency_1.protocol.MarketOrderList>, callback: grpc_1.sendUnaryData<dependency_1.protocol.MarketOrderList>): void;
        abstract GetMarketPriceByPair(call: grpc_1.ServerUnaryCall<dependency_1.protocol.MarketOrderPair, dependency_1.protocol.MarketPriceList>, callback: grpc_1.sendUnaryData<dependency_1.protocol.MarketPriceList>): void;
        abstract GetMarketOrderListByPair(call: grpc_1.ServerUnaryCall<dependency_1.protocol.MarketOrderPair, dependency_1.protocol.MarketOrderList>, callback: grpc_1.sendUnaryData<dependency_1.protocol.MarketOrderList>): void;
        abstract GetMarketPairList(call: grpc_1.ServerUnaryCall<EmptyMessage, dependency_1.protocol.MarketOrderPairList>, callback: grpc_1.sendUnaryData<dependency_1.protocol.MarketOrderPairList>): void;
        abstract GetBurnTrx(call: grpc_1.ServerUnaryCall<EmptyMessage, NumberMessage>, callback: grpc_1.sendUnaryData<NumberMessage>): void;
        abstract GetBlock(call: grpc_1.ServerUnaryCall<BlockReq, BlockExtention>, callback: grpc_1.sendUnaryData<BlockExtention>): void;
        abstract GetBandwidthPrices(call: grpc_1.ServerUnaryCall<EmptyMessage, PricesResponseMessage>, callback: grpc_1.sendUnaryData<PricesResponseMessage>): void;
        abstract GetEnergyPrices(call: grpc_1.ServerUnaryCall<EmptyMessage, PricesResponseMessage>, callback: grpc_1.sendUnaryData<PricesResponseMessage>): void;
    }
    const WalletSolidityClient_base: grpc_1.ServiceClientConstructor;
    export class WalletSolidityClient extends WalletSolidityClient_base {
        constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>);
        GetAccount: GrpcUnaryServiceInterface<dependency_1.protocol.Account, dependency_1.protocol.Account>;
        GetAccountById: GrpcUnaryServiceInterface<dependency_1.protocol.Account, dependency_1.protocol.Account>;
        ListWitnesses: GrpcUnaryServiceInterface<EmptyMessage, WitnessList>;
        GetPaginatedNowWitnessList: GrpcUnaryServiceInterface<PaginatedMessage, WitnessList>;
        GetAssetIssueList: GrpcUnaryServiceInterface<EmptyMessage, AssetIssueList>;
        GetPaginatedAssetIssueList: GrpcUnaryServiceInterface<PaginatedMessage, AssetIssueList>;
        GetAssetIssueByName: GrpcUnaryServiceInterface<BytesMessage, dependency_2.protocol.AssetIssueContract>;
        GetAssetIssueListByName: GrpcUnaryServiceInterface<BytesMessage, AssetIssueList>;
        GetAssetIssueById: GrpcUnaryServiceInterface<BytesMessage, dependency_2.protocol.AssetIssueContract>;
        GetNowBlock: GrpcUnaryServiceInterface<EmptyMessage, dependency_1.protocol.Block>;
        GetNowBlock2: GrpcUnaryServiceInterface<EmptyMessage, BlockExtention>;
        GetBlockByNum: GrpcUnaryServiceInterface<NumberMessage, dependency_1.protocol.Block>;
        GetBlockByNum2: GrpcUnaryServiceInterface<NumberMessage, BlockExtention>;
        GetTransactionCountByBlockNum: GrpcUnaryServiceInterface<NumberMessage, NumberMessage>;
        GetDelegatedResource: GrpcUnaryServiceInterface<DelegatedResourceMessage, DelegatedResourceList>;
        GetDelegatedResourceV2: GrpcUnaryServiceInterface<DelegatedResourceMessage, DelegatedResourceList>;
        GetDelegatedResourceAccountIndex: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.DelegatedResourceAccountIndex>;
        GetDelegatedResourceAccountIndexV2: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.DelegatedResourceAccountIndex>;
        GetCanDelegatedMaxSize: GrpcUnaryServiceInterface<CanDelegatedMaxSizeRequestMessage, CanDelegatedMaxSizeResponseMessage>;
        GetAvailableUnfreezeCount: GrpcUnaryServiceInterface<GetAvailableUnfreezeCountRequestMessage, GetAvailableUnfreezeCountResponseMessage>;
        GetCanWithdrawUnfreezeAmount: GrpcUnaryServiceInterface<CanWithdrawUnfreezeAmountRequestMessage, CanWithdrawUnfreezeAmountResponseMessage>;
        GetExchangeById: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.Exchange>;
        ListExchanges: GrpcUnaryServiceInterface<EmptyMessage, ExchangeList>;
        GetTransactionById: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.Transaction>;
        GetTransactionInfoById: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.TransactionInfo>;
        GetMerkleTreeVoucherInfo: GrpcUnaryServiceInterface<dependency_11.protocol.OutputPointInfo, dependency_11.protocol.IncrementalMerkleVoucherInfo>;
        ScanNoteByIvk: GrpcUnaryServiceInterface<IvkDecryptParameters, DecryptNotes>;
        ScanAndMarkNoteByIvk: GrpcUnaryServiceInterface<IvkDecryptAndMarkParameters, DecryptNotesMarked>;
        ScanNoteByOvk: GrpcUnaryServiceInterface<OvkDecryptParameters, DecryptNotes>;
        IsSpend: GrpcUnaryServiceInterface<NoteParameters, SpendResult>;
        ScanShieldedTRC20NotesByIvk: GrpcUnaryServiceInterface<IvkDecryptTRC20Parameters, DecryptNotesTRC20>;
        ScanShieldedTRC20NotesByOvk: GrpcUnaryServiceInterface<OvkDecryptTRC20Parameters, DecryptNotesTRC20>;
        IsShieldedTRC20ContractNoteSpent: GrpcUnaryServiceInterface<NfTRC20Parameters, NullifierResult>;
        GetRewardInfo: GrpcUnaryServiceInterface<BytesMessage, NumberMessage>;
        GetBrokerageInfo: GrpcUnaryServiceInterface<BytesMessage, NumberMessage>;
        TriggerConstantContract: GrpcUnaryServiceInterface<dependency_10.protocol.TriggerSmartContract, TransactionExtention>;
        EstimateEnergy: GrpcUnaryServiceInterface<dependency_10.protocol.TriggerSmartContract, EstimateEnergyMessage>;
        GetTransactionInfoByBlockNum: GrpcUnaryServiceInterface<NumberMessage, TransactionInfoList>;
        GetMarketOrderById: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.MarketOrder>;
        GetMarketOrderByAccount: GrpcUnaryServiceInterface<BytesMessage, dependency_1.protocol.MarketOrderList>;
        GetMarketPriceByPair: GrpcUnaryServiceInterface<dependency_1.protocol.MarketOrderPair, dependency_1.protocol.MarketPriceList>;
        GetMarketOrderListByPair: GrpcUnaryServiceInterface<dependency_1.protocol.MarketOrderPair, dependency_1.protocol.MarketOrderList>;
        GetMarketPairList: GrpcUnaryServiceInterface<EmptyMessage, dependency_1.protocol.MarketOrderPairList>;
        GetBurnTrx: GrpcUnaryServiceInterface<EmptyMessage, NumberMessage>;
        GetBlock: GrpcUnaryServiceInterface<BlockReq, BlockExtention>;
        GetBandwidthPrices: GrpcUnaryServiceInterface<EmptyMessage, PricesResponseMessage>;
        GetEnergyPrices: GrpcUnaryServiceInterface<EmptyMessage, PricesResponseMessage>;
    }
    export abstract class UnimplementedWalletExtensionService {
        static definition: {
            GetTransactionsFromThis: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: AccountPaginated) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => AccountPaginated;
                responseSerialize: (message: TransactionList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionList;
            };
            GetTransactionsFromThis2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: AccountPaginated) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => AccountPaginated;
                responseSerialize: (message: TransactionListExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionListExtention;
            };
            GetTransactionsToThis: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: AccountPaginated) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => AccountPaginated;
                responseSerialize: (message: TransactionList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionList;
            };
            GetTransactionsToThis2: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: AccountPaginated) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => AccountPaginated;
                responseSerialize: (message: TransactionListExtention) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => TransactionListExtention;
            };
        };
        [method: string]: grpc_1.UntypedHandleCall;
        abstract GetTransactionsFromThis(call: grpc_1.ServerUnaryCall<AccountPaginated, TransactionList>, callback: grpc_1.sendUnaryData<TransactionList>): void;
        abstract GetTransactionsFromThis2(call: grpc_1.ServerUnaryCall<AccountPaginated, TransactionListExtention>, callback: grpc_1.sendUnaryData<TransactionListExtention>): void;
        abstract GetTransactionsToThis(call: grpc_1.ServerUnaryCall<AccountPaginated, TransactionList>, callback: grpc_1.sendUnaryData<TransactionList>): void;
        abstract GetTransactionsToThis2(call: grpc_1.ServerUnaryCall<AccountPaginated, TransactionListExtention>, callback: grpc_1.sendUnaryData<TransactionListExtention>): void;
    }
    const WalletExtensionClient_base: grpc_1.ServiceClientConstructor;
    export class WalletExtensionClient extends WalletExtensionClient_base {
        constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>);
        GetTransactionsFromThis: GrpcUnaryServiceInterface<AccountPaginated, TransactionList>;
        GetTransactionsFromThis2: GrpcUnaryServiceInterface<AccountPaginated, TransactionListExtention>;
        GetTransactionsToThis: GrpcUnaryServiceInterface<AccountPaginated, TransactionList>;
        GetTransactionsToThis2: GrpcUnaryServiceInterface<AccountPaginated, TransactionListExtention>;
    }
    export abstract class UnimplementedDatabaseService {
        static definition: {
            getBlockReference: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: BlockReference) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => BlockReference;
            };
            GetDynamicProperties: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: dependency_1.protocol.DynamicProperties) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.DynamicProperties;
            };
            GetNowBlock: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: dependency_1.protocol.Block) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Block;
            };
            GetBlockByNum: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NumberMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NumberMessage;
                responseSerialize: (message: dependency_1.protocol.Block) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.Block;
            };
        };
        [method: string]: grpc_1.UntypedHandleCall;
        abstract getBlockReference(call: grpc_1.ServerUnaryCall<EmptyMessage, BlockReference>, callback: grpc_1.sendUnaryData<BlockReference>): void;
        abstract GetDynamicProperties(call: grpc_1.ServerUnaryCall<EmptyMessage, dependency_1.protocol.DynamicProperties>, callback: grpc_1.sendUnaryData<dependency_1.protocol.DynamicProperties>): void;
        abstract GetNowBlock(call: grpc_1.ServerUnaryCall<EmptyMessage, dependency_1.protocol.Block>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Block>): void;
        abstract GetBlockByNum(call: grpc_1.ServerUnaryCall<NumberMessage, dependency_1.protocol.Block>, callback: grpc_1.sendUnaryData<dependency_1.protocol.Block>): void;
    }
    const DatabaseClient_base: grpc_1.ServiceClientConstructor;
    export class DatabaseClient extends DatabaseClient_base {
        constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>);
        getBlockReference: GrpcUnaryServiceInterface<EmptyMessage, BlockReference>;
        GetDynamicProperties: GrpcUnaryServiceInterface<EmptyMessage, dependency_1.protocol.DynamicProperties>;
        GetNowBlock: GrpcUnaryServiceInterface<EmptyMessage, dependency_1.protocol.Block>;
        GetBlockByNum: GrpcUnaryServiceInterface<NumberMessage, dependency_1.protocol.Block>;
    }
    export abstract class UnimplementedMonitorService {
        static definition: {
            GetStatsInfo: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EmptyMessage) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EmptyMessage;
                responseSerialize: (message: dependency_1.protocol.MetricsInfo) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => dependency_1.protocol.MetricsInfo;
            };
        };
        [method: string]: grpc_1.UntypedHandleCall;
        abstract GetStatsInfo(call: grpc_1.ServerUnaryCall<EmptyMessage, dependency_1.protocol.MetricsInfo>, callback: grpc_1.sendUnaryData<dependency_1.protocol.MetricsInfo>): void;
    }
    const MonitorClient_base: grpc_1.ServiceClientConstructor;
    export class MonitorClient extends MonitorClient_base {
        constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>);
        GetStatsInfo: GrpcUnaryServiceInterface<EmptyMessage, dependency_1.protocol.MetricsInfo>;
    }
    export abstract class UnimplementedNetworkService {
        static definition: {};
        [method: string]: grpc_1.UntypedHandleCall;
    }
    const NetworkClient_base: grpc_1.ServiceClientConstructor;
    export class NetworkClient extends NetworkClient_base {
        constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>);
    }
    export {};
}
