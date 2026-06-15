import * as pb_1 from "google-protobuf";
export declare namespace protocol {
    class AuthenticationPath extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            value?: boolean[];
        });
        get value(): boolean[];
        set value(value: boolean[]);
        static fromObject(data: {
            value?: boolean[];
        }): AuthenticationPath;
        toObject(): {
            value?: boolean[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AuthenticationPath;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AuthenticationPath;
    }
    class MerklePath extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            authentication_paths?: AuthenticationPath[];
            index?: boolean[];
            rt?: Uint8Array;
        });
        get authentication_paths(): AuthenticationPath[];
        set authentication_paths(value: AuthenticationPath[]);
        get index(): boolean[];
        set index(value: boolean[]);
        get rt(): Uint8Array;
        set rt(value: Uint8Array);
        static fromObject(data: {
            authentication_paths?: ReturnType<typeof AuthenticationPath.prototype.toObject>[];
            index?: boolean[];
            rt?: Uint8Array;
        }): MerklePath;
        toObject(): {
            authentication_paths?: ReturnType<typeof AuthenticationPath.prototype.toObject>[];
            index?: boolean[];
            rt?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MerklePath;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MerklePath;
    }
    class OutputPoint extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            hash?: Uint8Array;
            index?: number;
        });
        get hash(): Uint8Array;
        set hash(value: Uint8Array);
        get index(): number;
        set index(value: number);
        static fromObject(data: {
            hash?: Uint8Array;
            index?: number;
        }): OutputPoint;
        toObject(): {
            hash?: Uint8Array;
            index?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): OutputPoint;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): OutputPoint;
    }
    class OutputPointInfo extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            out_points?: OutputPoint[];
            block_num?: number;
        });
        get out_points(): OutputPoint[];
        set out_points(value: OutputPoint[]);
        get block_num(): number;
        set block_num(value: number);
        static fromObject(data: {
            out_points?: ReturnType<typeof OutputPoint.prototype.toObject>[];
            block_num?: number;
        }): OutputPointInfo;
        toObject(): {
            out_points?: ReturnType<typeof OutputPoint.prototype.toObject>[];
            block_num?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): OutputPointInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): OutputPointInfo;
    }
    class PedersenHash extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            content?: Uint8Array;
        });
        get content(): Uint8Array;
        set content(value: Uint8Array);
        static fromObject(data: {
            content?: Uint8Array;
        }): PedersenHash;
        toObject(): {
            content?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PedersenHash;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PedersenHash;
    }
    class IncrementalMerkleTree extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            left?: PedersenHash;
            right?: PedersenHash;
            parents?: PedersenHash[];
        });
        get left(): PedersenHash;
        set left(value: PedersenHash);
        get has_left(): boolean;
        get right(): PedersenHash;
        set right(value: PedersenHash);
        get has_right(): boolean;
        get parents(): PedersenHash[];
        set parents(value: PedersenHash[]);
        static fromObject(data: {
            left?: ReturnType<typeof PedersenHash.prototype.toObject>;
            right?: ReturnType<typeof PedersenHash.prototype.toObject>;
            parents?: ReturnType<typeof PedersenHash.prototype.toObject>[];
        }): IncrementalMerkleTree;
        toObject(): {
            left?: ReturnType<typeof PedersenHash.prototype.toObject>;
            right?: ReturnType<typeof PedersenHash.prototype.toObject>;
            parents?: ReturnType<typeof PedersenHash.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IncrementalMerkleTree;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): IncrementalMerkleTree;
    }
    class IncrementalMerkleVoucher extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            tree?: IncrementalMerkleTree;
            filled?: PedersenHash[];
            cursor?: IncrementalMerkleTree;
            cursor_depth?: number;
            rt?: Uint8Array;
            output_point?: OutputPoint;
        });
        get tree(): IncrementalMerkleTree;
        set tree(value: IncrementalMerkleTree);
        get has_tree(): boolean;
        get filled(): PedersenHash[];
        set filled(value: PedersenHash[]);
        get cursor(): IncrementalMerkleTree;
        set cursor(value: IncrementalMerkleTree);
        get has_cursor(): boolean;
        get cursor_depth(): number;
        set cursor_depth(value: number);
        get rt(): Uint8Array;
        set rt(value: Uint8Array);
        get output_point(): OutputPoint;
        set output_point(value: OutputPoint);
        get has_output_point(): boolean;
        static fromObject(data: {
            tree?: ReturnType<typeof IncrementalMerkleTree.prototype.toObject>;
            filled?: ReturnType<typeof PedersenHash.prototype.toObject>[];
            cursor?: ReturnType<typeof IncrementalMerkleTree.prototype.toObject>;
            cursor_depth?: number;
            rt?: Uint8Array;
            output_point?: ReturnType<typeof OutputPoint.prototype.toObject>;
        }): IncrementalMerkleVoucher;
        toObject(): {
            tree?: ReturnType<typeof IncrementalMerkleTree.prototype.toObject>;
            filled?: ReturnType<typeof PedersenHash.prototype.toObject>[];
            cursor?: ReturnType<typeof IncrementalMerkleTree.prototype.toObject>;
            cursor_depth?: number;
            rt?: Uint8Array;
            output_point?: ReturnType<typeof OutputPoint.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IncrementalMerkleVoucher;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): IncrementalMerkleVoucher;
    }
    class IncrementalMerkleVoucherInfo extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            vouchers?: IncrementalMerkleVoucher[];
            paths?: Uint8Array[];
        });
        get vouchers(): IncrementalMerkleVoucher[];
        set vouchers(value: IncrementalMerkleVoucher[]);
        get paths(): Uint8Array[];
        set paths(value: Uint8Array[]);
        static fromObject(data: {
            vouchers?: ReturnType<typeof IncrementalMerkleVoucher.prototype.toObject>[];
            paths?: Uint8Array[];
        }): IncrementalMerkleVoucherInfo;
        toObject(): {
            vouchers?: ReturnType<typeof IncrementalMerkleVoucher.prototype.toObject>[];
            paths?: Uint8Array[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IncrementalMerkleVoucherInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): IncrementalMerkleVoucherInfo;
    }
    class SpendDescription extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            value_commitment?: Uint8Array;
            anchor?: Uint8Array;
            nullifier?: Uint8Array;
            rk?: Uint8Array;
            zkproof?: Uint8Array;
            spend_authority_signature?: Uint8Array;
        });
        get value_commitment(): Uint8Array;
        set value_commitment(value: Uint8Array);
        get anchor(): Uint8Array;
        set anchor(value: Uint8Array);
        get nullifier(): Uint8Array;
        set nullifier(value: Uint8Array);
        get rk(): Uint8Array;
        set rk(value: Uint8Array);
        get zkproof(): Uint8Array;
        set zkproof(value: Uint8Array);
        get spend_authority_signature(): Uint8Array;
        set spend_authority_signature(value: Uint8Array);
        static fromObject(data: {
            value_commitment?: Uint8Array;
            anchor?: Uint8Array;
            nullifier?: Uint8Array;
            rk?: Uint8Array;
            zkproof?: Uint8Array;
            spend_authority_signature?: Uint8Array;
        }): SpendDescription;
        toObject(): {
            value_commitment?: Uint8Array;
            anchor?: Uint8Array;
            nullifier?: Uint8Array;
            rk?: Uint8Array;
            zkproof?: Uint8Array;
            spend_authority_signature?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SpendDescription;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SpendDescription;
    }
    class ReceiveDescription extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            value_commitment?: Uint8Array;
            note_commitment?: Uint8Array;
            epk?: Uint8Array;
            c_enc?: Uint8Array;
            c_out?: Uint8Array;
            zkproof?: Uint8Array;
        });
        get value_commitment(): Uint8Array;
        set value_commitment(value: Uint8Array);
        get note_commitment(): Uint8Array;
        set note_commitment(value: Uint8Array);
        get epk(): Uint8Array;
        set epk(value: Uint8Array);
        get c_enc(): Uint8Array;
        set c_enc(value: Uint8Array);
        get c_out(): Uint8Array;
        set c_out(value: Uint8Array);
        get zkproof(): Uint8Array;
        set zkproof(value: Uint8Array);
        static fromObject(data: {
            value_commitment?: Uint8Array;
            note_commitment?: Uint8Array;
            epk?: Uint8Array;
            c_enc?: Uint8Array;
            c_out?: Uint8Array;
            zkproof?: Uint8Array;
        }): ReceiveDescription;
        toObject(): {
            value_commitment?: Uint8Array;
            note_commitment?: Uint8Array;
            epk?: Uint8Array;
            c_enc?: Uint8Array;
            c_out?: Uint8Array;
            zkproof?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ReceiveDescription;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ReceiveDescription;
    }
    class ShieldedTransferContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            transparent_from_address?: Uint8Array;
            from_amount?: number;
            spend_description?: SpendDescription[];
            receive_description?: ReceiveDescription[];
            binding_signature?: Uint8Array;
            transparent_to_address?: Uint8Array;
            to_amount?: number;
        });
        get transparent_from_address(): Uint8Array;
        set transparent_from_address(value: Uint8Array);
        get from_amount(): number;
        set from_amount(value: number);
        get spend_description(): SpendDescription[];
        set spend_description(value: SpendDescription[]);
        get receive_description(): ReceiveDescription[];
        set receive_description(value: ReceiveDescription[]);
        get binding_signature(): Uint8Array;
        set binding_signature(value: Uint8Array);
        get transparent_to_address(): Uint8Array;
        set transparent_to_address(value: Uint8Array);
        get to_amount(): number;
        set to_amount(value: number);
        static fromObject(data: {
            transparent_from_address?: Uint8Array;
            from_amount?: number;
            spend_description?: ReturnType<typeof SpendDescription.prototype.toObject>[];
            receive_description?: ReturnType<typeof ReceiveDescription.prototype.toObject>[];
            binding_signature?: Uint8Array;
            transparent_to_address?: Uint8Array;
            to_amount?: number;
        }): ShieldedTransferContract;
        toObject(): {
            transparent_from_address?: Uint8Array;
            from_amount?: number;
            spend_description?: ReturnType<typeof SpendDescription.prototype.toObject>[];
            receive_description?: ReturnType<typeof ReceiveDescription.prototype.toObject>[];
            binding_signature?: Uint8Array;
            transparent_to_address?: Uint8Array;
            to_amount?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ShieldedTransferContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ShieldedTransferContract;
    }
}
