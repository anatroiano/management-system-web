import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { cpf, cnpj } from 'cpf-cnpj-validator';

export function documentValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        if (!control.value) {
            return null;
        }

        const value = control.value.replace(/\D/g, '');

        const isCpfValid = cpf.isValid(value);
        const isCnpjValid = cnpj.isValid(value);

        if (isCpfValid || isCnpjValid) {
            return null;
        }

        return {
            invalidDocument: true
        };
    };
}