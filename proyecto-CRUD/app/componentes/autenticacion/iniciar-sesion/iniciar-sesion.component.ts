import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AutenticacionService} from '../../../servicios/autenticacion.service';

@Component({
    selector: 'app-iniciar-sesion',
    templateUrl: './iniciar-sesion.component.html',
    styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {

    inicioSesionForm: FormGroup;
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
    iniciarSesionError = false;

    constructor(private fb: FormBuilder,
                private router: Router,
                private activatedRouter: ActivatedRoute,
                private autenticacion: AutenticacionService) {
    }

    ngOnInit() {
        this.inicioSesionForm = this.fb.group({
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
        this.inicioSesionForm.valueChanges.subscribe(value => {
            this.onValueChanged();
        });
    }

    onSubmit() {
        this.datosUsuario = this.guardarDatosUsuario();
        this.autenticacion.signIn(this.datosUsuario)
            .then(value => {
                console.log(value);
                this.router.navigate(['/inicio'])
                    .catch(reason => {
                        console.log(reason);
                    });
            })
            .catch(reason => {
                console.log(reason);
                this.iniciarSesionError = true;
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
                this.iniciarSesionError = true;
            });
    }

    guardarDatosUsuario() {
        return {
            email: this.inicioSesionForm.get('email').value,
            password: this.inicioSesionForm.get('contrasena').value
        };
    }

    onValueChanged() {
        if (!this.inicioSesionForm) {
            return;
        }
        const form = this.inicioSesionForm;
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
