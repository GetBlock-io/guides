import * as pb_1 from "google-protobuf";
export declare namespace protocol {
    class SmartContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            origin_address?: Uint8Array;
            contract_address?: Uint8Array;
            abi?: SmartContract.ABI;
            bytecode?: Uint8Array;
            call_value?: number;
            consume_user_resource_percent?: number;
            name?: string;
            origin_energy_limit?: number;
            code_hash?: Uint8Array;
            trx_hash?: Uint8Array;
            version?: number;
        });
        get origin_address(): Uint8Array;
        set origin_address(value: Uint8Array);
        get contract_address(): Uint8Array;
        set contract_address(value: Uint8Array);
        get abi(): SmartContract.ABI;
        set abi(value: SmartContract.ABI);
        get has_abi(): boolean;
        get bytecode(): Uint8Array;
        set bytecode(value: Uint8Array);
        get call_value(): number;
        set call_value(value: number);
        get consume_user_resource_percent(): number;
        set consume_user_resource_percent(value: number);
        get name(): string;
        set name(value: string);
        get origin_energy_limit(): number;
        set origin_energy_limit(value: number);
        get code_hash(): Uint8Array;
        set code_hash(value: Uint8Array);
        get trx_hash(): Uint8Array;
        set trx_hash(value: Uint8Array);
        get version(): number;
        set version(value: number);
        static fromObject(data: {
            origin_address?: Uint8Array;
            contract_address?: Uint8Array;
            abi?: ReturnType<typeof SmartContract.ABI.prototype.toObject>;
            bytecode?: Uint8Array;
            call_value?: number;
            consume_user_resource_percent?: number;
            name?: string;
            origin_energy_limit?: number;
            code_hash?: Uint8Array;
            trx_hash?: Uint8Array;
            version?: number;
        }): SmartContract;
        toObject(): {
            origin_address?: Uint8Array;
            contract_address?: Uint8Array;
            abi?: ReturnType<typeof SmartContract.ABI.prototype.toObject>;
            bytecode?: Uint8Array;
            call_value?: number;
            consume_user_resource_percent?: number;
            name?: string;
            origin_energy_limit?: number;
            code_hash?: Uint8Array;
            trx_hash?: Uint8Array;
            version?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SmartContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SmartContract;
    }
    namespace SmartContract {
        class ABI extends pb_1.Message {
            #private;
            constructor(data?: any[] | {
                entrys?: SmartContract.ABI.Entry[];
            });
            get entrys(): SmartContract.ABI.Entry[];
            set entrys(value: SmartContract.ABI.Entry[]);
            static fromObject(data: {
                entrys?: ReturnType<typeof SmartContract.ABI.Entry.prototype.toObject>[];
            }): ABI;
            toObject(): {
                entrys?: ReturnType<typeof SmartContract.ABI.Entry.prototype.toObject>[];
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ABI;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): ABI;
        }
        namespace ABI {
            class Entry extends pb_1.Message {
                #private;
                constructor(data?: any[] | {
                    anonymous?: boolean;
                    constant?: boolean;
                    name?: string;
                    inputs?: SmartContract.ABI.Entry.Param[];
                    outputs?: SmartContract.ABI.Entry.Param[];
                    type?: SmartContract.ABI.Entry.EntryType;
                    payable?: boolean;
                    stateMutability?: SmartContract.ABI.Entry.StateMutabilityType;
                });
                get anonymous(): boolean;
                set anonymous(value: boolean);
                get constant(): boolean;
                set constant(value: boolean);
                get name(): string;
                set name(value: string);
                get inputs(): SmartContract.ABI.Entry.Param[];
                set inputs(value: SmartContract.ABI.Entry.Param[]);
                get outputs(): SmartContract.ABI.Entry.Param[];
                set outputs(value: SmartContract.ABI.Entry.Param[]);
                get type(): SmartContract.ABI.Entry.EntryType;
                set type(value: SmartContract.ABI.Entry.EntryType);
                get payable(): boolean;
                set payable(value: boolean);
                get stateMutability(): SmartContract.ABI.Entry.StateMutabilityType;
                set stateMutability(value: SmartContract.ABI.Entry.StateMutabilityType);
                static fromObject(data: {
                    anonymous?: boolean;
                    constant?: boolean;
                    name?: string;
                    inputs?: ReturnType<typeof SmartContract.ABI.Entry.Param.prototype.toObject>[];
                    outputs?: ReturnType<typeof SmartContract.ABI.Entry.Param.prototype.toObject>[];
                    type?: SmartContract.ABI.Entry.EntryType;
                    payable?: boolean;
                    stateMutability?: SmartContract.ABI.Entry.StateMutabilityType;
                }): Entry;
                toObject(): {
                    anonymous?: boolean;
                    constant?: boolean;
                    name?: string;
                    inputs?: ReturnType<typeof SmartContract.ABI.Entry.Param.prototype.toObject>[];
                    outputs?: ReturnType<typeof SmartContract.ABI.Entry.Param.prototype.toObject>[];
                    type?: SmartContract.ABI.Entry.EntryType;
                    payable?: boolean;
                    stateMutability?: SmartContract.ABI.Entry.StateMutabilityType;
                };
                serialize(): Uint8Array;
                serialize(w: pb_1.BinaryWriter): void;
                static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Entry;
                serializeBinary(): Uint8Array;
                static deserializeBinary(bytes: Uint8Array): Entry;
            }
            namespace Entry {
                enum EntryType {
                    UnknownEntryType = 0,
                    Constructor = 1,
                    Function = 2,
                    Event = 3,
                    Fallback = 4,
                    Receive = 5,
                    Error = 6
                }
                enum StateMutabilityType {
                    UnknownMutabilityType = 0,
                    Pure = 1,
                    View = 2,
                    Nonpayable = 3,
                    Payable = 4
                }
                class Param extends pb_1.Message {
                    #private;
                    constructor(data?: any[] | {
                        indexed?: boolean;
                        name?: string;
                        type?: string;
                    });
                    get indexed(): boolean;
                    set indexed(value: boolean);
                    get name(): string;
                    set name(value: string);
                    get type(): string;
                    set type(value: string);
                    static fromObject(data: {
                        indexed?: boolean;
                        name?: string;
                        type?: string;
                    }): Param;
                    toObject(): {
                        indexed?: boolean;
                        name?: string;
                        type?: string;
                    };
                    serialize(): Uint8Array;
                    serialize(w: pb_1.BinaryWriter): void;
                    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Param;
                    serializeBinary(): Uint8Array;
                    static deserializeBinary(bytes: Uint8Array): Param;
                }
            }
        }
    }
    class ContractState extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            energy_usage?: number;
            energy_factor?: number;
            update_cycle?: number;
        });
        get energy_usage(): number;
        set energy_usage(value: number);
        get energy_factor(): number;
        set energy_factor(value: number);
        get update_cycle(): number;
        set update_cycle(value: number);
        static fromObject(data: {
            energy_usage?: number;
            energy_factor?: number;
            update_cycle?: number;
        }): ContractState;
        toObject(): {
            energy_usage?: number;
            energy_factor?: number;
            update_cycle?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ContractState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ContractState;
    }
    class CreateSmartContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            new_contract?: SmartContract;
            call_token_value?: number;
            token_id?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get new_contract(): SmartContract;
        set new_contract(value: SmartContract);
        get has_new_contract(): boolean;
        get call_token_value(): number;
        set call_token_value(value: number);
        get token_id(): number;
        set token_id(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            new_contract?: ReturnType<typeof SmartContract.prototype.toObject>;
            call_token_value?: number;
            token_id?: number;
        }): CreateSmartContract;
        toObject(): {
            owner_address?: Uint8Array;
            new_contract?: ReturnType<typeof SmartContract.prototype.toObject>;
            call_token_value?: number;
            token_id?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CreateSmartContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CreateSmartContract;
    }
    class TriggerSmartContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            contract_address?: Uint8Array;
            call_value?: number;
            data?: Uint8Array;
            call_token_value?: number;
            token_id?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get contract_address(): Uint8Array;
        set contract_address(value: Uint8Array);
        get call_value(): number;
        set call_value(value: number);
        get data(): Uint8Array;
        set data(value: Uint8Array);
        get call_token_value(): number;
        set call_token_value(value: number);
        get token_id(): number;
        set token_id(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            contract_address?: Uint8Array;
            call_value?: number;
            data?: Uint8Array;
            call_token_value?: number;
            token_id?: number;
        }): TriggerSmartContract;
        toObject(): {
            owner_address?: Uint8Array;
            contract_address?: Uint8Array;
            call_value?: number;
            data?: Uint8Array;
            call_token_value?: number;
            token_id?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TriggerSmartContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TriggerSmartContract;
    }
    class ClearABIContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            contract_address?: Uint8Array;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get contract_address(): Uint8Array;
        set contract_address(value: Uint8Array);
        static fromObject(data: {
            owner_address?: Uint8Array;
            contract_address?: Uint8Array;
        }): ClearABIContract;
        toObject(): {
            owner_address?: Uint8Array;
            contract_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ClearABIContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ClearABIContract;
    }
    class UpdateSettingContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            contract_address?: Uint8Array;
            consume_user_resource_percent?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get contract_address(): Uint8Array;
        set contract_address(value: Uint8Array);
        get consume_user_resource_percent(): number;
        set consume_user_resource_percent(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            contract_address?: Uint8Array;
            consume_user_resource_percent?: number;
        }): UpdateSettingContract;
        toObject(): {
            owner_address?: Uint8Array;
            contract_address?: Uint8Array;
            consume_user_resource_percent?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UpdateSettingContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): UpdateSettingContract;
    }
    class UpdateEnergyLimitContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            contract_address?: Uint8Array;
            origin_energy_limit?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get contract_address(): Uint8Array;
        set contract_address(value: Uint8Array);
        get origin_energy_limit(): number;
        set origin_energy_limit(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            contract_address?: Uint8Array;
            origin_energy_limit?: number;
        }): UpdateEnergyLimitContract;
        toObject(): {
            owner_address?: Uint8Array;
            contract_address?: Uint8Array;
            origin_energy_limit?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UpdateEnergyLimitContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): UpdateEnergyLimitContract;
    }
    class SmartContractDataWrapper extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            smart_contract?: SmartContract;
            runtimecode?: Uint8Array;
            contract_state?: ContractState;
        });
        get smart_contract(): SmartContract;
        set smart_contract(value: SmartContract);
        get has_smart_contract(): boolean;
        get runtimecode(): Uint8Array;
        set runtimecode(value: Uint8Array);
        get contract_state(): ContractState;
        set contract_state(value: ContractState);
        get has_contract_state(): boolean;
        static fromObject(data: {
            smart_contract?: ReturnType<typeof SmartContract.prototype.toObject>;
            runtimecode?: Uint8Array;
            contract_state?: ReturnType<typeof ContractState.prototype.toObject>;
        }): SmartContractDataWrapper;
        toObject(): {
            smart_contract?: ReturnType<typeof SmartContract.prototype.toObject>;
            runtimecode?: Uint8Array;
            contract_state?: ReturnType<typeof ContractState.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SmartContractDataWrapper;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SmartContractDataWrapper;
    }
}
