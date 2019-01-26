import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Period } from './interfaces/period';
import { Subscription } from 'rxjs';
import { DateValidator } from './validators/date.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  periodForm : FormGroup;
  minDate: Date = new Date();
  periods: Period[] = [
    { value: 1, title: "1 year" },
    { value: 2, title: "2 years" },
    { value: 5, title: "5 years" }
  ];

  private subscriptionStartDate: Subscription;
  private subscriptionPeriod: Subscription;

  constructor(){
      this.periodForm = new FormGroup({
          "startDate": new FormControl(null, [Validators.required, DateValidator.moreCurrentDate]),
          "period": new FormControl(null, Validators.required),
          "endDate": new FormControl({value: null, disabled: true}, Validators.required)
      });
  }

  ngOnInit() {
    this.subscribeToChangeFields();
  }

  ngOnDestroy() {
    this.subscriptionStartDate.unsubscribe();
    this.subscriptionPeriod.unsubscribe();
}

  submit(){
    if (this.periodForm.valid) {
      console.log(JSON.stringify(this.periodForm.getRawValue()));
      alert(JSON.stringify(this.periodForm.getRawValue()));
    }
  }

  subscribeToChangeFields(): void {
    this.subscriptionStartDate = this.periodForm.controls.startDate.valueChanges.subscribe(() => {
      this.setEndDate();
    })

    this.subscriptionPeriod = this.periodForm.controls.period.valueChanges.subscribe(() => {
      this.setEndDate();
    })
  }

  setEndDate(): void {
    const startDate = this.periodForm.controls.startDate.value;
    const period = this.periodForm.controls.period.value;
    let endDate = new Date(startDate);

    if (startDate && period) {
      endDate.setFullYear(startDate.getFullYear() + period);
      this.periodForm.controls.endDate.setValue(endDate);
    } else {
      this.periodForm.controls.endDate.setValue(null);
    }
  }
}
