import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { tap, mergeMap, map, catchError, take } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
// El of es para crear un observable
import { of } from 'rxjs';


@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) { }

  /**
   * Tenemos que indicar de que acción tiene que estar pendiente el efecto,
   * esto se hace mediante el pipe ofType propio de ngrx effects
   * El mergeMap añade un observable al observable actual mezclandolos
   * Al retorno que se ejecuta cuando se dispara el effect por una acción, le decimos que
   * ejecute el servicio y lo añada (con el mergemap) a la salida del observable que se genera
   * al dispararse esta acción
   * Por ultimo hay que disparar una accion que va a modificar el store.
   */
  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
      // Indicamos la acción sobre la que estamos observando
      ofType(usuariosActions.cargarUsuario),
      // Añadimos una orden a la respuesta del observable
      mergeMap(
        // Recibimos los parametros de entrada de la accion
        (action) => this.usuarioService.getUserById(action.id)
          .pipe(
            // Lanzamos la accion si todo ha ido bien, cuando se han cargado los usuarios
            map(user => usuariosActions.cargarUsuarioSuccess({ usuario: user })),
            // El catch error no devuelve un obsevable, hay que crearlo con el of
            catchError(err => of(usuariosActions.cargarUsuarioError({ payload: err })))// ,
            // take(1)
          )
      )
    )
  );


  // cargarUsuarios$ = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(usuariosActions.cargarUsuarios),
  //     tap(data => console.log('Effect tap ', data)),
  //     mergeMap(
  //       () => this.usuarioService.getUsers().pipe(tap(data => console.log('get Users effect', data)))
  //     )
  //   )
  // );
}
