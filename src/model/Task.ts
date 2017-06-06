
import {IdentifiedEntity} from './IdentifiedEntity';


export interface Task extends IdentifiedEntity {
    id: string;
    name: string;
    assignedTime: number;
}
