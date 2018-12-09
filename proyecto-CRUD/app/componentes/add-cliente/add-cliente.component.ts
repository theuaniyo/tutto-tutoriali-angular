import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ClienteFirebaseService} from '../../servicios/clienteFirebase.service';
import {Cliente} from '../../modelo/cliente';

@Component({
    selector: 'app-add-cliente',
    templateUrl: './add-cliente.component.html',
    styleUrls: ['./add-cliente.component.scss']
})
export class AddClienteComponent implements OnInit {

    cliente: any;
    clienteForm: FormGroup;

    constructor(private fb: FormBuilder,
                private clienteFirebase: ClienteFirebaseService) {
    }

    ngOnInit() {
        this.clienteFirebase.getClientes();
        this.clienteForm = this.fb.group({
            empresa: ['', Validators.required],
            cif: ['', Validators.required],
            direccion: ['', Validators.required],
            cp: ['', Validators.required],
            localidad: ['', Validators.required],
            provincia: ['', Validators.required],
            telefono: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            contacto: ['', Validators.required]
        });
    }

    generarCliente() {
        return {
            empresa: this.clienteForm.get('empresa').value,
            cif: this.clienteForm.get('cif').value,
            direccion: this.clienteForm.get('direccion').value,
            cp: this.clienteForm.get('cp').value,
            localidad: this.clienteForm.get('localidad').value,
            provincia: this.clienteForm.get('provincia').value,
            telefono: this.clienteForm.get('telefono').value,
            email: this.clienteForm.get('email').value,
            contacto: this.clienteForm.get('contacto').value
        };
    }

    onSubmit() {
        console.log('método submit', JSON.stringify(this.clienteForm.value));
        this.cliente = this.generarCliente();

        this.clienteFirebase.addCliente(this.cliente);
    }
}
