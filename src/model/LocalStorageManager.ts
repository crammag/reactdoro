
import {IdentifiedEntity} from './IdentifiedEntity';


export default class LocalStorageManager<T extends IdentifiedEntity> {

    private objects: T[];
    private localStorageKey: string;

    public constructor(key: string) {
        this.localStorageKey = key;
        this.objects = this.retrieveFromStorage() || [];
    }

    public getObjects(): T[] {
        return this.objects;
    }

    public addObject(objectToAdd: T): void {
        objectToAdd.id = new Date().toISOString();
        this.objects.push(objectToAdd);
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.objects));
    }

    public removeObject(identifier: string): void {

        for(let i = 0; i < this.objects.length; i++) {
            if(this.objects[i].id === identifier) {
                this.objects.splice(i, 1);
                localStorage.setItem(this.localStorageKey, JSON.stringify(this.objects));
                break;
            }
        }

    }

    private retrieveFromStorage(): T[] {
        return JSON.parse(localStorage.getItem(this.localStorageKey));
    }

}
