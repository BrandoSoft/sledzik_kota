import { type } from "os";


export interface CoordsInterfaceResponse {
  id: string;
  hid: string;
  date: Date;
  latitude: string;
  longitude: string;
}

export type CoordsInterfaceResponseArray = CoordsInterfaceResponse[];