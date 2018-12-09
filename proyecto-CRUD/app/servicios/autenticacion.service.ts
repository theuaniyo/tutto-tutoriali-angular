import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AutenticacionService {

    constructor(private authFirebase: AngularFireAuth,
                private router: Router) {
    }

    signUp(datosUsuario) {
        return this.authFirebase.auth.createUserWithEmailAndPassword(datosUsuario.email, datosUsuario.password);
    }

    signIpGoogle() {
        return this.authFirebase.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    logout() {
        return this.authFirebase.auth.signOut();
    }

    signIn(datosUsuario) {
        return this.authFirebase.auth.signInWithEmailAndPassword(datosUsuario.email, datosUsuario.password);
    }

    usuarioAutenticado() {
        return this.authFirebase.authState;
    }
}
