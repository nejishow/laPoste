import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientsService } from "src/app/services/clients.service";
import { OperationService } from "src/app/services/operation.service";
import { PaymentsService } from "src/app/services/payments.service";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-forfaits",
  templateUrl: "./forfaits.component.html",
  styleUrls: ["./forfaits.component.css"],
})
export class ForfaitsComponent {
  idUser;
  fatimes = faTimes;
  isdeleting = false;
  idNewOperation;
  isPaid = false;
  client: any;
  clientBoite: any = [];
  forfaits: any = []; // tous les forfaits
  forfaitClient = []; // les forfaits approprié ce type de client
  choosenForfait = []; // les forfaits qu'il a choisit
  myForfaits = []; // ses forfaits
  myoperations: Array<any> = [];
  newOperation = {
    idClient: "",
    clientName: "",
    operations: [],
    idBoite: "",
    boiteNumber: "",
    idStaff: "",
    staffName: "",
    total: 0,
  };
  deletingForfait = "";
  commentaires = "";
  deletionObject = {
    idClient:"",
    clientName: "",
    idOperation: "",
    price: "",
    name: "",
    comments: "",
    idBoite: "",
    boiteNumber: "",
    idStaff: "",
    staffName: "",
  };

  constructor(
    private aR: ActivatedRoute,
    private router: Router,
    private clientS: ClientsService,
    private payS: PaymentsService,
    private operationS: OperationService
  ) {
    this.aR.params.subscribe(async (params) => {
      this.idUser = params.id;
      await this.clientS
        .getClientBoite(params.id)
        .subscribe(async (data: any) => {
          this.clientBoite = data;
          this.newOperation.idClient = this.idUser;
          this.newOperation.clientName = this.clientBoite.clientName;
          this.newOperation.idBoite = this.clientBoite.idBoite;
          this.newOperation.boiteNumber = this.clientBoite.boiteNumber;
          this.newOperation.idStaff = localStorage.getItem("id");
          this.newOperation.staffName = localStorage.getItem("name");
          this.deletionObject.idClient = this.idUser
          this.deletionObject.clientName = this.clientBoite.clientName
          this.deletionObject.idBoite = this.clientBoite.idBoite
          this.deletionObject.boiteNumber = this.clientBoite.boiteNumber
          this.deletionObject.idStaff = localStorage.getItem("id");
          this.deletionObject.staffName = localStorage.getItem("name");
        });
      await this.clientS.getClient(params.id).subscribe(async (data: any) => {
        this.client = data;
      });
      await this.payS.getForfaits().subscribe(async (data: any) => {
        this.forfaits = data;
        await this.clientS.getClientType().subscribe(async (ct: any) => {
          const clientType = ct.filter(
            (c) => c._id === this.client.idClientType
          );
          this.forfaitClient = clientType[0].forfaits;
        });
        await this.payS
          .getClientForfait(params.id)
          .subscribe(async (_data: any) => {
            return _data.forEach((element) => {
              this.forfaits.forEach((c) => {
                if (element.idForfait === c._id) {
                  this.myForfaits.push(c);
                  this.choosenForfait.push({ idForfait: c._id });
                }
              });
            });
          });
      });
    });
  }
  newForfait(event) {
    if (event.target.checked) {
      this.forfaits.forEach(async (element) => {
        if (event.target.value === element._id) {
          await this.choosenForfait.push({ idForfait: event.target.value });
        }
      });
      this.forfaitClient.forEach(async (element) => {
        if (event.target.value === element.idForfait) {
          this.newOperation.total += element.price;
          await this.newOperation.operations.push({
            idOperation: event.target.value,
            name: element.name,
            price: element.price,
          });
        }
      });
    } else {
      this.choosenForfait = this.choosenForfait.filter(
        (element) => element.idForfait !== event.target.value
      );
      this.newOperation.total = 0;
      this.newOperation.operations = this.newOperation.operations.filter(
        (element) => element.idOperation !== event.target.value
      );
      this.newOperation.operations.forEach((element) => {
        this.newOperation.total += element.price;
      });
      console.log(this.choosenForfait);
    }
  }

  encaisser() {
    this.payS
      .postClientForfait(this.choosenForfait, this.idUser)
      .subscribe((data: any) => {
        this.operationS.postOperation(this.newOperation).subscribe((data: any) => {
          this.idNewOperation = data._id;
          this.isPaid = true
        })
      });
  }
  deleteForfait(id) {
    // this.choosenForfait = this.choosenForfait.filter(
    //   (element) => element.idForfait !== id
    // );
    this.choosenForfait = [];

    this.myForfaits = this.myForfaits.filter((element) => element._id !== id);
    this.payS
    .postClientForfait(this.choosenForfait, this.idUser)
    .subscribe((data: any) => {
           data.forfaits.forEach((element) => {
        this.forfaits.forEach((c) => {
          if (element.idForfait === c._id) {
            this.myForfaits.push(c);
            this.choosenForfait.push({ idForfait: c._id });
          }
        });
      });

        this.operationS.postDeletion(this.deletionObject).subscribe(()=>{
          this.isdeleting = false;
        })
    });


  }
  delete(id, name, price) {
    this.isdeleting = true;
    this.deletingForfait = id;
    this.deletionObject.idOperation =id
    this.deletionObject.price =price
    this.deletionObject.name =name

  }
}
