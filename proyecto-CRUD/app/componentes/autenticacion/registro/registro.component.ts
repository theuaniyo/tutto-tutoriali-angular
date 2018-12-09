import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AutenticacionService} from '../../../servicios/autenticacion.service';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

    registroForm: FormGroup;
    datosUsuario: any;
    erroresForm = {
        'email': '',
        'contrasena': ''
    };
    mensajesValidacion = {
        'email': {
            'required': 'Email obligatorio',
            'email': 'Correo electrónico incorrecto'
        },
        'contrasena': {
            'required': 'Contraseña obligatoria',
            'pattern': 'La contraseña debe tener al menos una letra y un número ',
            'minlength': 'y más de 6 caracteres'
        }
    };
    registroError = false;

    constructor(private fb: FormBuilder,
                private router: Router,
                private activatedRouter: ActivatedRoute,
                private autenticacion: AutenticacionService) {
    }

    ngOnInit() {
        this.registroForm = this.fb.group({
            'email': ['',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            'contrasena': ['',
                [
                    Validators.required,
                    Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                    Validators.minLength(6)
                ]
            ]
        });
        this.registroForm.valueChanges.subscribe(value => {
            this.onValueChanged();
        });
    }

    onSubmit() {
        this.datosUsuario = this.guardarDatosUsuario();
        this.autenticacion.signUp(this.datosUsuario)
            .then(value => {
                console.log(value);
                this.router.navigate(['/inicio'])
                    .catch(reason => {
                        console.log(reason);
                    });
            })
            .catch(reason => {
                console.log(reason);
                this.registroError = true;
            });
    }

    onGoogleButton() {
        this.autenticacion.signIpGoogle()
            .then(value => {
                console.log(value);
                this.router.navigate(['/inicio'])
                    .catch(reason => {
                        console.log(reason);
                    });
            })
            .catch(reason => {
                console.log(reason);
                this.registroError = true;
            });
    }

    guardarDatosUsuario() {
        return {
            email: this.registroForm.get('email').value,
            password: this.registroForm.get('contrasena').value
        };
    }

    onValueChanged() {
        if (!this.registroForm) {
            return;
        }
        const form = this.registroForm;
        for (const field in this.erroresForm) {
            this.erroresForm[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.mensajesValidacion[field];
                for (const key in control.errors) {
                    this.erroresForm[field] += messages[key] + ' ';

                }

            }
        }
    }
}
