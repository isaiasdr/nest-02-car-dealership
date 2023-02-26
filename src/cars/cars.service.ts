import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateCarDto, UpdateCarDto } from './dtos';
import { Car } from './interfaces/car.interface';


@Injectable()
export class CarsService {
    private cars: Car[] = [
        /* {
            id: uuid(),
            brand: 'toyota',
            model: 'corolla'
        },
        {
            id: uuid(),
            brand: 'honda',
            model: 'civic'
        },
        {
            id: uuid(),
            brand: 'jeep',
            model: 'cherokee'
        }, */
    ];

    findAll() {
        return this.cars;
    }

    findOneById( id: string ) {
        const car = this.cars.find( car => car.id === id );

        if ( !car ) throw new NotFoundException(`Car with id ${ id } not found`);

        return car;
    }

    create( createCarDto: CreateCarDto ) {
        const newCar: Car = {
            id: uuid(),
            ...createCarDto,
        };

        const existingCar = this.cars.find( car => car.brand === newCar.brand && car.model === newCar.model );

        if ( existingCar ) throw new UnprocessableEntityException();

        this.cars.push( newCar );

        return newCar;
    }

    update( id: string, updateCarDto: UpdateCarDto ) {

        let existingCar = this.findOneById(id);

        this.cars = this.cars.map( car => {

            if ( car.id === id ) {

                existingCar = {
                    ...car,
                    ...updateCarDto,
                    id,
                };

                return existingCar;
            }

            return car
        });

        return existingCar;
    }

    delete ( id: string ) {
        this.findOneById(id);

        this.cars = this.cars.filter ( car => car.id !== id );
    }

    fillCarsWithSeedData( cars: Car[] ) {
        this.cars = cars;
    }
}
