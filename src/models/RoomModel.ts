import { RoomFeatureModel } from "./RoomFeatureModel";

export interface RoomModel {
    id: string;
    roomStatus?: string;
    roomFeatures?: RoomFeatureModel[];
}