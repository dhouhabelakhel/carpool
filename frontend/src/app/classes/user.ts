export class User {
    constructor(
        public id: number,
        public name: string,
        public first_name: string,
        public username: string,
        public email: string,
        public password: string,
        public photo: string,
        public birthdate: Date,
        public gender: 'f' | 'm', 
        public phone_number: string,
        public city: string,
        public isSmoker: boolean = false,  
    ) { }
}
