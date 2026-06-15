import * as dependency_1 from "./common";
import * as pb_1 from "google-protobuf";
export declare namespace protocol {
    class FreezeBalanceContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            frozen_balance?: number;
            frozen_duration?: number;
            resource?: dependency_1.protocol.ResourceCode;
            receiver_address?: Uint8Array;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get frozen_balance(): number;
        set frozen_balance(value: number);
        get frozen_duration(): number;
        set frozen_duration(value: number);
        get resource(): dependency_1.protocol.ResourceCode;
        set resource(value: dependency_1.protocol.ResourceCode);
        get receiver_address(): Uint8Array;
        set receiver_address(value: Uint8Array);
        static fromObject(data: {
            owner_address?: Uint8Array;
            frozen_balance?: number;
            frozen_duration?: number;
            resource?: dependency_1.protocol.ResourceCode;
            receiver_address?: Uint8Array;
        }): FreezeBalanceContract;
        toObject(): {
            owner_address?: Uint8Array;
            frozen_balance?: number;
            frozen_duration?: number;
            resource?: dependency_1.protocol.ResourceCode;
            receiver_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): FreezeBalanceContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): FreezeBalanceContract;
    }
    class UnfreezeBalanceContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            resource?: dependency_1.protocol.ResourceCode;
            receiver_address?: Uint8Array;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get resource(): dependency_1.protocol.ResourceCode;
        set resource(value: dependency_1.protocol.ResourceCode);
        get receiver_address(): Uint8Array;
        set receiver_address(value: Uint8Array);
        static fromObject(data: {
            owner_address?: Uint8Array;
            resource?: dependency_1.protocol.ResourceCode;
            receiver_address?: Uint8Array;
        }): UnfreezeBalanceContract;
        toObject(): {
            owner_address?: Uint8Array;
            resource?: dependency_1.protocol.ResourceCode;
            receiver_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UnfreezeBalanceContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): UnfreezeBalanceContract;
    }
    class WithdrawBalanceContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        static fromObject(data: {
            owner_address?: Uint8Array;
        }): WithdrawBalanceContract;
        toObject(): {
            owner_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): WithdrawBalanceContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): WithdrawBalanceContract;
    }
    class TransferContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            to_address?: Uint8Array;
            amount?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get to_address(): Uint8Array;
        set to_address(value: Uint8Array);
        get amount(): number;
        set amount(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            to_address?: Uint8Array;
            amount?: number;
        }): TransferContract;
        toObject(): {
            owner_address?: Uint8Array;
            to_address?: Uint8Array;
            amount?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TransferContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TransferContract;
    }
    class TransactionBalanceTrace extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            transaction_identifier?: Uint8Array;
            operation?: TransactionBalanceTrace.Operation[];
            type?: string;
            status?: string;
        });
        get transaction_identifier(): Uint8Array;
        set transaction_identifier(value: Uint8Array);
        get operation(): TransactionBalanceTrace.Operation[];
        set operation(value: TransactionBalanceTrace.Operation[]);
        get type(): string;
        set type(value: string);
        get status(): string;
        set status(value: string);
        static fromObject(data: {
            transaction_identifier?: Uint8Array;
            operation?: ReturnType<typeof TransactionBalanceTrace.Operation.prototype.toObject>[];
            type?: string;
            status?: string;
        }): TransactionBalanceTrace;
        toObject(): {
            transaction_identifier?: Uint8Array;
            operation?: ReturnType<typeof TransactionBalanceTrace.Operation.prototype.toObject>[];
            type?: string;
            status?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TransactionBalanceTrace;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TransactionBalanceTrace;
    }
    namespace TransactionBalanceTrace {
        class Operation extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                operation_identifier?: number;
                address?: Uint8Array;
                amount?: number;
            });
            get operation_identifier(): number;
            set operation_identifier(value: number);
            get address(): Uint8Array;
            set address(value: Uint8Array);
            get amount(): number;
            set amount(value: number);
            static fromObject(data: {
                operation_identifier?: number;
                address?: Uint8Array;
                amount?: number;
            }): Operation;
            toObject(): {
                operation_identifier?: number;
                address?: Uint8Array;
                amount?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Operation;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): Operation;
        }
    }
    class BlockBalanceTrace extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            block_identifier?: BlockBalanceTrace.BlockIdentifier;
            timestamp?: number;
            transaction_balance_trace?: TransactionBalanceTrace[];
        });
        get block_identifier(): BlockBalanceTrace.BlockIdentifier;
        set block_identifier(value: BlockBalanceTrace.BlockIdentifier);
        get has_block_identifier(): boolean;
        get timestamp(): number;
        set timestamp(value: number);
        get transaction_balance_trace(): TransactionBalanceTrace[];
        set transaction_balance_trace(value: TransactionBalanceTrace[]);
        static fromObject(data: {
            block_identifier?: ReturnType<typeof BlockBalanceTrace.BlockIdentifier.prototype.toObject>;
            timestamp?: number;
            transaction_balance_trace?: ReturnType<typeof TransactionBalanceTrace.prototype.toObject>[];
        }): BlockBalanceTrace;
        toObject(): {
            block_identifier?: ReturnType<typeof BlockBalanceTrace.BlockIdentifier.prototype.toObject>;
            timestamp?: number;
            transaction_balance_trace?: ReturnType<typeof TransactionBalanceTrace.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockBalanceTrace;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BlockBalanceTrace;
    }
    namespace BlockBalanceTrace {
        class BlockIdentifier extends pb_1.Message {
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
            }): BlockIdentifier;
            toObject(): {
                hash?: Uint8Array;
                number?: number;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BlockIdentifier;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): BlockIdentifier;
        }
    }
    class AccountTrace extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            balance?: number;
            placeholder?: number;
        });
        get balance(): number;
        set balance(value: number);
        get placeholder(): number;
        set placeholder(value: number);
        static fromObject(data: {
            balance?: number;
            placeholder?: number;
        }): AccountTrace;
        toObject(): {
            balance?: number;
            placeholder?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AccountTrace;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AccountTrace;
    }
    class AccountIdentifier extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            address?: Uint8Array;
        });
        get address(): Uint8Array;
        set address(value: Uint8Array);
        static fromObject(data: {
            address?: Uint8Array;
        }): AccountIdentifier;
        toObject(): {
            address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AccountIdentifier;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AccountIdentifier;
    }
    class AccountBalanceRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            account_identifier?: AccountIdentifier;
            block_identifier?: BlockBalanceTrace.BlockIdentifier;
        });
        get account_identifier(): AccountIdentifier;
        set account_identifier(value: AccountIdentifier);
        get has_account_identifier(): boolean;
        get block_identifier(): BlockBalanceTrace.BlockIdentifier;
        set block_identifier(value: BlockBalanceTrace.BlockIdentifier);
        get has_block_identifier(): boolean;
        static fromObject(data: {
            account_identifier?: ReturnType<typeof AccountIdentifier.prototype.toObject>;
            block_identifier?: ReturnType<typeof BlockBalanceTrace.BlockIdentifier.prototype.toObject>;
        }): AccountBalanceRequest;
        toObject(): {
            account_identifier?: ReturnType<typeof AccountIdentifier.prototype.toObject>;
            block_identifier?: ReturnType<typeof BlockBalanceTrace.BlockIdentifier.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AccountBalanceRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AccountBalanceRequest;
    }
    class AccountBalanceResponse extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            balance?: number;
            block_identifier?: BlockBalanceTrace.BlockIdentifier;
        });
        get balance(): number;
        set balance(value: number);
        get block_identifier(): BlockBalanceTrace.BlockIdentifier;
        set block_identifier(value: BlockBalanceTrace.BlockIdentifier);
        get has_block_identifier(): boolean;
        static fromObject(data: {
            balance?: number;
            block_identifier?: ReturnType<typeof BlockBalanceTrace.BlockIdentifier.prototype.toObject>;
        }): AccountBalanceResponse;
        toObject(): {
            balance?: number;
            block_identifier?: ReturnType<typeof BlockBalanceTrace.BlockIdentifier.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AccountBalanceResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AccountBalanceResponse;
    }
    class FreezeBalanceV2Contract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            frozen_balance?: number;
            resource?: dependency_1.protocol.ResourceCode;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get frozen_balance(): number;
        set frozen_balance(value: number);
        get resource(): dependency_1.protocol.ResourceCode;
        set resource(value: dependency_1.protocol.ResourceCode);
        static fromObject(data: {
            owner_address?: Uint8Array;
            frozen_balance?: number;
            resource?: dependency_1.protocol.ResourceCode;
        }): FreezeBalanceV2Contract;
        toObject(): {
            owner_address?: Uint8Array;
            frozen_balance?: number;
            resource?: dependency_1.protocol.ResourceCode;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): FreezeBalanceV2Contract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): FreezeBalanceV2Contract;
    }
    class UnfreezeBalanceV2Contract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            unfreeze_balance?: number;
            resource?: dependency_1.protocol.ResourceCode;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get unfreeze_balance(): number;
        set unfreeze_balance(value: number);
        get resource(): dependency_1.protocol.ResourceCode;
        set resource(value: dependency_1.protocol.ResourceCode);
        static fromObject(data: {
            owner_address?: Uint8Array;
            unfreeze_balance?: number;
            resource?: dependency_1.protocol.ResourceCode;
        }): UnfreezeBalanceV2Contract;
        toObject(): {
            owner_address?: Uint8Array;
            unfreeze_balance?: number;
            resource?: dependency_1.protocol.ResourceCode;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UnfreezeBalanceV2Contract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): UnfreezeBalanceV2Contract;
    }
    class WithdrawExpireUnfreezeContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        static fromObject(data: {
            owner_address?: Uint8Array;
        }): WithdrawExpireUnfreezeContract;
        toObject(): {
            owner_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): WithdrawExpireUnfreezeContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): WithdrawExpireUnfreezeContract;
    }
    class DelegateResourceContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            resource?: dependency_1.protocol.ResourceCode;
            balance?: number;
            receiver_address?: Uint8Array;
            lock?: boolean;
            lock_period?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get resource(): dependency_1.protocol.ResourceCode;
        set resource(value: dependency_1.protocol.ResourceCode);
        get balance(): number;
        set balance(value: number);
        get receiver_address(): Uint8Array;
        set receiver_address(value: Uint8Array);
        get lock(): boolean;
        set lock(value: boolean);
        get lock_period(): number;
        set lock_period(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            resource?: dependency_1.protocol.ResourceCode;
            balance?: number;
            receiver_address?: Uint8Array;
            lock?: boolean;
            lock_period?: number;
        }): DelegateResourceContract;
        toObject(): {
            owner_address?: Uint8Array;
            resource?: dependency_1.protocol.ResourceCode;
            balance?: number;
            receiver_address?: Uint8Array;
            lock?: boolean;
            lock_period?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DelegateResourceContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DelegateResourceContract;
    }
    class UnDelegateResourceContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            resource?: dependency_1.protocol.ResourceCode;
            balance?: number;
            receiver_address?: Uint8Array;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get resource(): dependency_1.protocol.ResourceCode;
        set resource(value: dependency_1.protocol.ResourceCode);
        get balance(): number;
        set balance(value: number);
        get receiver_address(): Uint8Array;
        set receiver_address(value: Uint8Array);
        static fromObject(data: {
            owner_address?: Uint8Array;
            resource?: dependency_1.protocol.ResourceCode;
            balance?: number;
            receiver_address?: Uint8Array;
        }): UnDelegateResourceContract;
        toObject(): {
            owner_address?: Uint8Array;
            resource?: dependency_1.protocol.ResourceCode;
            balance?: number;
            receiver_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UnDelegateResourceContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): UnDelegateResourceContract;
    }
    class CancelAllUnfreezeV2Contract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        static fromObject(data: {
            owner_address?: Uint8Array;
        }): CancelAllUnfreezeV2Contract;
        toObject(): {
            owner_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CancelAllUnfreezeV2Contract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CancelAllUnfreezeV2Contract;
    }
}
