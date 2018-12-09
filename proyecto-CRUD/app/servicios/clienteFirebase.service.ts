import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Cliente} from '../modelo/cliente';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ClienteFirebaseService {

    listaClientes: AngularFireList<any>;
    clienteSeleccionado: Cliente;

    constructor(private firedb: AngularFireDatabase) {
    }

    // Devuelve todos los clientes
    getClientes() {
        return this.listaClientes = this.firedb.list('clientes');
    }

    listarClientes() {
        return this.firedb.list('clientes').snapshotChanges().pipe(map(values => {
            return values.map(value => {
                const $key = value.payload.key;
                const $data = value.payload.val();
                return {key: $key, data: $data};
            });
        }));
    }

    // Agrega un cliente
    addCliente(cliente: Cliente) {
        this.listaClientes.push({
            empresa: cliente.empresa,
            cif: cliente.cif,
            direccion: cliente.direccion,
            cp: cliente.cp,
            localidad: cliente.localidad,
            provincia: cliente.provincia,
            telefono: cliente.telefono,
            email: cliente.email,
            contacto: cliente.contacto
        });
    }

    // Actualiza un cliente
    updateCliente(id: any, cliente: Cliente) {
        this.listaClientes.update(id, {
            empresa: cliente.empresa,
            cif: cliente.cif,
            direccion: cliente.direccion,
            cp: cliente.cp,
            localidad: cliente.localidad,
            provincia: cliente.provincia,
            telefono: cliente.telefono,
            email: cliente.email,
            contacto: cliente.contacto
        });
    }

    // Elimina un cliente
    deleteCliente(id: any) {
        this.listaClientes.remove(id);
    }
}
