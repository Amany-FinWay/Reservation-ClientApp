import { RoomModel } from "./RoomModel";

export interface RoomsPerFloorModel {
    floorNumber?: string;
    rooms: RoomModel[];
}