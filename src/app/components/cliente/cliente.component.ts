import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  listClientes: ClienteModel[] = [];
  formCliente: FormGroup = new FormGroup({});
  isUpdate: boolean = false;
  @ViewChild('closebutton') closebutton: any;

  constructor( private _clienteService: ClienteService) {}

  ngOnInit(): void {
    this.list();
    this.formCliente = new FormGroup({
      id: new FormControl(''),
      tipoId: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      estado: new FormControl(true)
    });
  }

  list() {
    this._clienteService.getAllClientes().subscribe(
      resp => {
        if(resp){
          this.listClientes = resp;
        }
      }
    )
  }

  saveClient() {
    this.formCliente.controls['estado'].setValue(true);
    this._clienteService.saveCliente(this.formCliente.value).subscribe(
      resp => {
        if(resp) {
          this.list();
          this.formCliente.reset();    
          this.closebutton.nativeElement.click();
        }
      }
    );
  }

  updateClient() {
    this._clienteService.editCliente(this.formCliente.value).subscribe(
      resp => {
        if(!resp) {
          this.list();
          this.formCliente.reset();
          this.closebutton.nativeElement.click();
        }
      }
    );
  }

  deleteClient(id: any) {
    this.formCliente.controls['id'].setValue(id);
    this.formCliente.controls['estado'].setValue(false);

    this._clienteService.deleteCliente(this.formCliente.value).subscribe(
      resp => {
        if(!resp) {
          this.list();
        }
      }
    );
  }

  newClient() {
    this.isUpdate = false;
    this.formCliente.reset();
  }

  selectItems(item: any) {
    this.isUpdate = true;
    this.formCliente.controls['id'].setValue(item.id);
    this.formCliente.controls['tipoId'].setValue(item.tipoId);
    this.formCliente.controls['nombre'].setValue(item.nombre);
    this.formCliente.controls['apellido'].setValue(item.apellido);
    this.formCliente.controls['estado'].setValue(item.estado);
  }

}
