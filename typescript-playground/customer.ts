export class Customer {
    id: number;

    constructor(id: number) {
        this.id = id;
    }

    fooBar(): string {
        setTimeout(() => console.log('Timer...', this.id), 2000);
        return 'Hallo';
    }
}