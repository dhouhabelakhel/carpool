export class RentalOfferClass {
    constructor(
        public id:Number,
        public description:string,
        public rental_date:Date,
        public start_date:Date,
        public duration:string,
        public price:Number,
        public isAvailable:Boolean,
        public vehicle_id:Number
    ){

    }
}
