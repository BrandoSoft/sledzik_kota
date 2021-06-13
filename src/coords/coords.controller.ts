import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CoordsInterfaceResponse, CoordsInterfaceResponseArray } from 'src/interfaces/coords';
import { Coords } from './coords.entity';
import { CoordsService } from './coords.service';
import { addNewCoordsDto } from './dto/newCoords.dto';

@Controller('coords')
export class CoordsController {

  constructor(
    @Inject(CoordsService) private coordsService: CoordsService,
  ){
  }


  @Get('/:hid')
  getCoordsByHid(
    @Param() hid :addNewCoordsDto,
  ): Promise<CoordsInterfaceResponseArray>
  {
      return this.coordsService.getUserCoords(hid)
  }


  @Post('/')
  addCordsToDatabase(
    @Body() newCoords: addNewCoordsDto,
    ): Promise<CoordsInterfaceResponse> {
   return this.coordsService.addCordsToDb(newCoords)
  }

  @Post ('/table')
  addTableOfCoordsToDatabase(
    @Body() newTable: addNewCoordsDto[],
  ): Promise<addNewCoordsDto[]>{
    return this.coordsService.addTableOfCoordsToDB(newTable)
  }
  
}
