
import {IdentifiedEntity} from './IdentifiedEntity';


interface Task extends IdentifiedEntity {
    id: string;
    name: string;
    assignedTime: number;
}

export default Task;
