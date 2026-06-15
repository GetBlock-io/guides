import * as pb_1 from "google-protobuf";
export declare namespace protocol {
    class ProposalApproveContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            proposal_id?: number;
            is_add_approval?: boolean;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get proposal_id(): number;
        set proposal_id(value: number);
        get is_add_approval(): boolean;
        set is_add_approval(value: boolean);
        static fromObject(data: {
            owner_address?: Uint8Array;
            proposal_id?: number;
            is_add_approval?: boolean;
        }): ProposalApproveContract;
        toObject(): {
            owner_address?: Uint8Array;
            proposal_id?: number;
            is_add_approval?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ProposalApproveContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ProposalApproveContract;
    }
    class ProposalCreateContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            parameters?: Map<number, number>;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get parameters(): Map<number, number>;
        set parameters(value: Map<number, number>);
        static fromObject(data: {
            owner_address?: Uint8Array;
            parameters?: {
                [key: number]: number;
            };
        }): ProposalCreateContract;
        toObject(): {
            owner_address?: Uint8Array;
            parameters?: {
                [key: number]: number;
            };
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ProposalCreateContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ProposalCreateContract;
    }
    class ProposalDeleteContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            proposal_id?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get proposal_id(): number;
        set proposal_id(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            proposal_id?: number;
        }): ProposalDeleteContract;
        toObject(): {
            owner_address?: Uint8Array;
            proposal_id?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ProposalDeleteContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ProposalDeleteContract;
    }
}
