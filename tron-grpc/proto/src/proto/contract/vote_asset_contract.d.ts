import * as pb_1 from "google-protobuf";
export declare namespace protocol {
    class VoteAssetContract extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            owner_address?: Uint8Array;
            vote_address?: Uint8Array[];
            support?: boolean;
            count?: number;
        });
        get owner_address(): Uint8Array;
        set owner_address(value: Uint8Array);
        get vote_address(): Uint8Array[];
        set vote_address(value: Uint8Array[]);
        get support(): boolean;
        set support(value: boolean);
        get count(): number;
        set count(value: number);
        static fromObject(data: {
            owner_address?: Uint8Array;
            vote_address?: Uint8Array[];
            support?: boolean;
            count?: number;
        }): VoteAssetContract;
        toObject(): {
            owner_address?: Uint8Array;
            vote_address?: Uint8Array[];
            support?: boolean;
            count?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): VoteAssetContract;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): VoteAssetContract;
    }
}
