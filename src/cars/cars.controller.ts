import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dtos';


@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) {}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById( @Param( 'id', new ParseUUIDPipe({ version: '4' }) ) id: string ) {

        const car = this.carsService.findOneById( id );

        return car;
    }

    @Post()
    createCar( @Body() createCardDto: CreateCarDto ) {

        return this.carsService.create( createCardDto );
    }

    @Patch(':id')
    updateCar( @Param('id', ParseUUIDPipe ) id: string, @Body() updateCarDto: UpdateCarDto, ) {

        return this.carsService.update( id, updateCarDto );
    }

    @Delete(':id')
    deleteCar( @Param('id', ParseUUIDPipe ) id: string ) {
        return this.carsService.delete(id);
    }
}
