import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../notification.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @Input() text: String | any;
  @Input() wordLimit: number | any;

  displayMode: number | any;
  formData: any;
  closeResult: string | any;
  searchText: any;
  constructor(
    private fb: FormBuilder,
    private notifyService: NotificationService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private offcanvasSerivce: NgbOffcanvas,
    private modalService: NgbModal
  ) {}
  productForm: FormGroup | any;
  isSubmitted = false;
  showMore: Boolean | any;
  firstname: any;
  lastname: any;
  email: any;
  city: any;
  address: any;
  p: number = 1;
  currentlySelectedId: number | any;
  EmployeeDetails = [
    {
      firstname: 'Averin',
      lastname: ' Anoop',
      email: 'averin@gmail.com',
      city: 'Kollam',
      address: 'Averin Home,HouseNo:ERRA 24A',
    },
    {
      firstname: 'Jesno',
      lastname: ' Mary',
      email: 'jesno@gmail.com',
      city: 'Ernakulam',
      address: 'Rose villa Near Matha Hotel',
    },
    {
      firstname: 'Praveena',
      lastname: ' M',
      email: 'praveena@gmail.com',
      city: 'Idukki',
      address: 'Dew Drops Idukki ',
    },
  ];

  AddopenEnd(addcontent: TemplateRef<any>) {
    this.offcanvasSerivce.open(addcontent, { position: 'end' });
  }
  openEnds(contents: TemplateRef<any>) {
    this.offcanvasSerivce.open(contents, { position: 'end' });
  }

  ViewopenEndss(Viewcontents: TemplateRef<any>) {
    this.offcanvasSerivce.open(Viewcontents, { position: 'end' });
  }

  ngOnInit(): void {
    this.displayMode = true;
    this.showMore = false;
    this.productForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  get formControls() {
    return this.productForm.controls;
  }

  // add customer form
  addcustomer() {
    this.isSubmitted = true;
    console.log(this.productForm.value);

    if (this.productForm.valid) {
      this.EmployeeDetails.push(this.productForm.value);
      this.notifyService.showSuccess('Success', 'Customer Add Successfully');
    }
  }
  //get customer details
  getemp(Employee: any, i: number) {
    console.log('ppppp', i);
    this.currentlySelectedId = i;

    this.productForm.patchValue({
      firstname: Employee.firstname,
      lastname: Employee.lastname,
      email: Employee.email,
      city: Employee.city,
      address: Employee.address,
    });
  }

  //edit cutomer details
  updateemp() {
    this.EmployeeDetails.splice(
      this.currentlySelectedId,
      1,
      this.productForm.value
    );
    this.notifyService.showSuccess('Success', 'Customer update Successfully');
    console.log('update collection', this.EmployeeDetails);
  }
  //delete customer details
  ondelete(index: number) {
    if (index !== -1) {
      this.EmployeeDetails.splice(index, 1);
      this.notifyService.showSuccess('Success', 'Customer Delete Successfully');
    }
  }

  onDisplayModeChange(mode: Boolean): void {
    this.displayMode = mode;
  }
  logout() {
    this.authService.logout();

    this.router.navigateByUrl('/');
    this.notifyService.showSuccess('Success', 'Logout Successfully');
  }
}
