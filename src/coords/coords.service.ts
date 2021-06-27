import { Injectable } from '@nestjs/common';
import { CoordsInterfaceResponse, CoordsInterfaceResponseArray } from 'src/interfaces/coords';
import { Coords } from './coords.entity';
import { addNewCoordsDto } from './dto/newCoords.dto';



@Injectable()
export class CoordsService {

    async getUserCoordsByHid(userHid : addNewCoordsDto) :Promise<CoordsInterfaceResponseArray>{
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


    async addTableOfCoordsToDB(newTable:addNewCoordsDto[]): Promise<CoordsInterfaceResponse[]>{

            newTable.forEach(async (item: addNewCoordsDto) => {

            const coords = new Coords();

            coords.date = item.date;
            coords.hid = item.hid;
            coords.latitude = item.latitude;
            coords.longitude = item.longitude;

            await coords.save();
        });

        

        return newTable
    }

}


// {	
// 	"hid": "000001",
//   "latitude": "dasdasd",
//   "longitude": "waszggggka",
// 	"date": "2021-12-11 00:00:01"
// }

// [
//     {
//       "hid": "128",
//       "latitude": "52.20899",
//       "longitude": "21.04956",
//       "date": "4-5-2021 16:35:43"
//     },
//     {
//       "hid": "128",
//       "latitude": "52.20888",
//       "longitude": "21.04925",
//       "date": "4-5-2021 16:36:09"
//     },
//     {
//       "hid": "128",
//       "latitude": "52.20887",
//       "longitude": "21.04925",
//       "date": "4-5-2021 16:37:41"
//     },
//     {    
//       "hid": "128",
//       "latitude": "52.20888",
//       "longitude": "21.04934",
//       "date": "4-5-2021 16:36:24"
//     }
//       ]