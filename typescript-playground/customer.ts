export class Customer {
    // Variante 1:
    /*id: number;

    constructor(id: number) { 
        this.id = id;
    }*/


    // Variante 2:
    constructor(public id: number) { }

    fooBar(): string {
        setTimeout(() => console.log('Timer...', this.id), 2000);
        return 'Hallo';
    }
}