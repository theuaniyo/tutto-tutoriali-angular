import {Component, OnInit} from '@angular/core';
import {AutenticacionService} from '../../servicios/autenticacion.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isAuth$: any;

    constructor(private autenticacion: AutenticacionService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {

        this.isAuth$ = this.autenticacion.usuarioAutenticado();
    }

    cerrarSesion() {
        this.autenticacion.logout()
            .then(value => {
                console.log(value);
                this.router.navigate(['/inicio'])
                    .catch(reason => {
                        console.log(reason);
                    });
            })
            .catch(reason => {
                console.log(reason);
            });
    }

}
