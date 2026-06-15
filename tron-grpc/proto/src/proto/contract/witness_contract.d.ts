import * as pb_1 from "google-protobuf";
export declare namespace protocol {
    class WitnessCreateContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            url?: Uint8Array;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get url(): Uint8Array;
        set url(value: Uint8Array);
        static fromObject(data: {
            owner_address?: Uint8Array;
            url?: Uint8Array;
        }): WitnessCreateContract;
        toObject(): {
            owner_address?: Uint8Array;
            url?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): WitnessCreateContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): WitnessCreateContract;
    }
    class WitnessUpdateContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            update_url?: Uint8Array;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get update_url(): Uint8Array;
        set update_url(value: Uint8Array);
        static fromObject(data: {
            owner_address?: Uint8Array;
            update_url?: Uint8Array;
        }): WitnessUpdateContract;
        toObject(): {
            owner_address?: Uint8Array;
            update_url?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): WitnessUpdateContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): WitnessUpdateContract;
    }
    class VoteWitnessContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            votes?: VoteWitnessContract.Vote[];
            support?: boolean;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get votes(): VoteWitnessContract.Vote[];
        set votes(value: VoteWitnessContract.Vote[]);
        get support(): boolean;
        set support(value: boolean);
        static fromObject(data: {
            owner_address?: Uint8Array;
            votes?: ReturnType<typeof VoteWitnessContract.Vote.prototype.toObject>[];
            support?: boolean;
        }): VoteWitnessContract;
        toObject(): {
            owner_address?: Uint8Array;
            votes?: ReturnType<typeof VoteWitnessContract.Vote.prototype.toObject>[];
            support?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): VoteWitnessContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): VoteWitnessContract;
    }
    namespace VoteWitnessContract {
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
    }
}
