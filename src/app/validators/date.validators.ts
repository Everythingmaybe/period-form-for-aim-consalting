import { FormControl } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class DateValidator {

    public static moreCurrentDate(control: FormControl): ValidationResult {
        const currentDate: Date = new Date();
        const controlDate: Date = control.value;
        const valid = controlDate ? controlDate.getTime() > currentDate.getTime() : false;
        if (!valid) {
            return { moreCurrentDate: true };
        }
        return null;
    }
}