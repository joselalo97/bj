import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private readonly toastrService: ToastrService
  ) { }

  /**
   * @description
   *  Método para mostrar el toastr personalizado de acuerdo a los parámetros recibidos
   * 
   * @param type: string -> success | info | warning | error
   * @param title: string
   * @param message: string
   * @param duration?: number -> min = 1000 max = 5000
   * @param position?: string -> top-left | top-right | top-center | bottom-left | bottom-center | bottom-right
   * @param progress?: boolean
   */
  public toastr(
    type: string,
    title: string,
    message: string,
    duration?: number,
    position?: string,
    progress?: boolean
  ): void {

    typeof duration === 'string'
      && (
        position = JSON.parse( JSON.stringify( position ) ),
        duration = null
      )

    const props: Partial<IndividualConfig> = {
      closeButton: false,
      progressBar: progress !== undefined ? progress : true,
      progressAnimation: 'increasing',
      timeOut: duration || 3000,
      disableTimeOut: false,
      easeTime: 150,
      positionClass: position ? `toast-${position}` : 'toast-top-center'
    }

    switch ( type ) {
      case 'success':
        this.toastrService.success( message, title, props );
        break;
      case 'info':
        this.toastrService.info( message, title, props );
        break;
      case 'warning':
        this.toastrService.warning( message, title, props );
        break;
      case 'error':
        this.toastrService.error( message, title, props );
        break;
    }

  }

}
