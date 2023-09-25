import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';
@Directive({
  selector: '[appSameValueValidatorDirective]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SameValueValidatorDirective,
      multi: true,
    },
  ],
})
export class SameValueValidatorDirective implements Validator {
  @Input('appSameValueValidatorDirective') controlNames: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    const [firstValueName, secondValueName] = this.controlNames;
    const firstControl = control.get(firstValueName)  ;
    const secondControl = control.get(secondValueName);
    //control.root.get(toControlName); put  [appExperienceRangeValidator]="['add-recruitment-experience-from', 'add-recruitment-experience-to']"  in input
   //control.get(toControlName); put  [appExperienceRangeValidator]="['add-recruitment-experience-from', 'add-recruitment-experience-to']"  in form
    if (!firstControl || !secondControl) {
      return null; // If the controls are not found, return null.
    }
    console.log(firstControl.value);console.log(secondControl.value);
    if (firstControl.value !== null && secondControl.value !== null) {
      if (firstControl.value !== secondControl.value) {return { notEqual: true };   }
    }

    return null; // Validation passes.
  }
}
