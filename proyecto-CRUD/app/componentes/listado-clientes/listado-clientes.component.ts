import {Component, OnInit} from '@angular/core';
import {ClienteFirebaseService} from '../../servicios/clienteFirebase.service';

@Component({
    selector: 'app-listado-clientes',
    templateUrl: './listado-clientes.component.html',
    styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {

    listaClientes: any[];

    constructor(private clienteFirebase: ClienteFirebaseService) {
    }

    ngOnInit() {

        this.obtenerInformacion();
    }

    obtenerInformacion() {
        console.log('obteniendo información');
        this.clienteFirebase.getClientes();
        this.clienteFirebase.listarClientes().subscribe(clientes =>
            this.listaClientes = clientes);
        console.log(this.listaClientes);
    }

    editar(item) {
        console.log('edición de cliente');
    }

    eliminar(item) {
        console.log('eliminar cliente');
        this.clienteFirebase.deleteCliente(item.key);
    }

}
