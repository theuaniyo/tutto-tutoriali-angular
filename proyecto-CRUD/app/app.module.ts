import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import {AppComponent} from './app.component';
import {InicioComponent} from './componentes/inicio/inicio.component';
import {Routes, RouterModule} from '@angular/router';
import {HeaderComponent} from './componentes/header/header.component';
import {AddClienteComponent} from './componentes/add-cliente/add-cliente.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistroComponent} from './componentes/autenticacion/registro/registro.component';
import {AutenticacionService} from './servicios/autenticacion.service';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {ClienteFirebaseService} from './servicios/clienteFirebase.service';
import {ListadoClientesComponent} from './componentes/listado-clientes/listado-clientes.component';
import {AngularFireAuth} from '@angular/fire/auth';
import { IniciarSesionComponent } from './componentes/autenticacion/iniciar-sesion/iniciar-sesion.component';

const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'add-cliente', component: AddClienteComponent},
    {path: 'listado-clientes', component: ListadoClientesComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'iniciar-sesion', component: IniciarSesionComponent},
    {path: '**', component: InicioComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        InicioComponent,
        HeaderComponent,
        AddClienteComponent,
        RegistroComponent,
        ListadoClientesComponent,
        IniciarSesionComponent
    ],
    imports: [
        BrowserModule,
        MDBBootstrapModule.forRoot(),
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase)
    ],
    providers: [
        AutenticacionService,
        ClienteFirebaseService,
        AngularFireAuth
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
