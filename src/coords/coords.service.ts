import { Injectable } from '@nestjs/common';
import { CoordsInterfaceResponse, CoordsInterfaceResponseArray } from 'src/interfaces/coords';
import { Coords } from './coords.entity';
import { addNewCoordsDto } from './dto/newCoords.dto';


@Injectable()
export class CoordsService {

    async getUserCoords(userHid : addNewCoordsDto) :Promise<CoordsInterfaceResponseArray>{
        return Coords.find(userHid);
    }

    async addCordsToDb(newCoords: addNewCoordsDto): Promise<CoordsInterfaceResponse>{

        const coords = new Coords();

        coords.date = newCoords.date;
        coords.hid = newCoords.hid;
        coords.latitude = newCoords.latitude;
        coords.longitude = newCoords.longitude;

        await coords.save();

        return coords;
    }

}
