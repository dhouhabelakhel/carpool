export class User {
 
    constructor(
        public id: number,
        public name: string,
        public first_name: string, 
        public username: string,
        public email: string,
        public password: string,
        public birthdate: Date,
        public Gender: 'f' | 'm', 
        public phone_number: string,
        public city: string,
        public createdAt: string,
        public updatedAt: string,
        public isSmoker: boolean = false,  
    ) { }
}

