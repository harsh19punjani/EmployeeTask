import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../common/employee.service';


declare var $: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  empForm: FormGroup;
  Rating: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};


  dropdownListRating = [];
  selectedItems2 = [];
  dropdownRatingSettings = {};
  error: boolean;
  errorMessage: any = '';
  empList: any = [];
  newresult: any = [];
  constructor(private formBuilder: FormBuilder, private service: EmployeeService) { }

  ngOnInit() {
    this.getallEmp();
    this.empForm = this.formBuilder.group({
      name: ['', Validators.required],
      notes: ['', Validators.required],
      skills: ['', Validators.required],
      rating: ['', Validators.required]
    });

    this.dropdownList = [
      { item_id: 1, item_text: 'java' },
      { item_id: 2, item_text: 'Angular' },
      { item_id: 3, item_text: 'Nodejs' },
      { item_id: 4, item_text: 'ExpressJs' },
      { item_id: 5, item_text: 'PHP' }
    ];

    this.dropdownListRating = [
      { item_id: 1, item_text: '1' },
      { item_id: 2, item_text: '2' },
      { item_id: 3, item_text: '3' },
      { item_id: 4, item_text: '4' },
      { item_id: 5, item_text: '5' }
    ];
    this.Rating = ['1', '2', '3', '4', '5'];


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.dropdownRatingSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


  }

 
  onItemSelect(item: any) {
    this.selectedItems.push(item);
    console.log(item);
  }
  onItemSelect2(item: any) {
    this.selectedItems2.push(item);
    console.log(item);
  }
  onSelectAll2(items: any) {
    console.log(items);
  }
  
  onSelectAll(items: any) {
    console.log(items);
  }
  changeRating() {
  }

  // sbumit form
  empSubmit() {
    if (this.empForm.invalid) {
      return;
    }
    this.service.addEmp(this.empForm.value).subscribe((res: any) => {
      console.log('res from server', res);
      if (res) {
        this.empForm.reset();
        this.empList.push(res.empdetails);
      }
    },
      err => {
        this.error = true;
        this.errorMessage = err.reason;
      });
  }

  getallEmp() {
    this.service.allEmp().subscribe((res: any) => {
      console.log('res from all emp from server', res);
      if (res) {
        this.empList = res;
        console.log(this.empList);
      }
    },
      err => {
        this.error = true;
        this.errorMessage = err.reason;
      });
  }

  empDetails(item) {

    $('#myModal').modal(
      {
        backdrop: 'static',
        keyboard: false
      });
    console.log(item);
    this.newresult.push(item);
    console.log('modal data:', this.newresult);
  }
  hideModal() {
    document.getElementById('close-modal').click();
  }
}
