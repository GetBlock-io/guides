import * as dependency_1 from "./../Tron";
import * as pb_1 from "google-protobuf";
export declare namespace protocol {
    class AccountCreateContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            account_address?: Uint8Array;
            type?: dependency_1.protocol.AccountType;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get account_address(): Uint8Array;
        set account_address(value: Uint8Array);
        get type(): dependency_1.protocol.AccountType;
        set type(value: dependency_1.protocol.AccountType);
        static fromObject(data: {
            owner_address?: Uint8Array;
            account_address?: Uint8Array;
            type?: dependency_1.protocol.AccountType;
        }): AccountCreateContract;
        toObject(): {
            owner_address?: Uint8Array;
            account_address?: Uint8Array;
            type?: dependency_1.protocol.AccountType;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AccountCreateContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AccountCreateContract;
    }
    class AccountUpdateContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            account_name?: Uint8Array;
            owner_address?: Uint8Array;
        });
        get account_name(): Uint8Array;
        set account_name(value: Uint8Array);
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        static fromObject(data: {
            account_name?: Uint8Array;
            owner_address?: Uint8Array;
        }): AccountUpdateContract;
        toObject(): {
            account_name?: Uint8Array;
            owner_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AccountUpdateContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AccountUpdateContract;
    }
    class SetAccountIdContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            account_id?: Uint8Array;
            owner_address?: Uint8Array;
        });
        get account_id(): Uint8Array;
        set account_id(value: Uint8Array);
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        static fromObject(data: {
            account_id?: Uint8Array;
            owner_address?: Uint8Array;
        }): SetAccountIdContract;
        toObject(): {
            account_id?: Uint8Array;
            owner_address?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SetAccountIdContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SetAccountIdContract;
    }
    class AccountPermissionUpdateContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            owner?: dependency_1.protocol.Permission;
            witness?: dependency_1.protocol.Permission;
            actives?: dependency_1.protocol.Permission[];
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get owner(): dependency_1.protocol.Permission;
        set owner(value: dependency_1.protocol.Permission);
        get has_owner(): boolean;
        get witness(): dependency_1.protocol.Permission;
        set witness(value: dependency_1.protocol.Permission);
        get has_witness(): boolean;
        get actives(): dependency_1.protocol.Permission[];
        set actives(value: dependency_1.protocol.Permission[]);
        static fromObject(data: {
            owner_address?: Uint8Array;
            owner?: ReturnType<typeof dependency_1.protocol.Permission.prototype.toObject>;
            witness?: ReturnType<typeof dependency_1.protocol.Permission.prototype.toObject>;
            actives?: ReturnType<typeof dependency_1.protocol.Permission.prototype.toObject>[];
        }): AccountPermissionUpdateContract;
        toObject(): {
            owner_address?: Uint8Array;
            owner?: ReturnType<typeof dependency_1.protocol.Permission.prototype.toObject>;
            witness?: ReturnType<typeof dependency_1.protocol.Permission.prototype.toObject>;
            actives?: ReturnType<typeof dependency_1.protocol.Permission.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AccountPermissionUpdateContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AccountPermissionUpdateContract;
    }
}
