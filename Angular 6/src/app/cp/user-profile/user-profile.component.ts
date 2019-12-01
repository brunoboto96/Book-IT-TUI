import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PostService } from 'src/app/shared/post.service';
import { timer } from 'rxjs';
import { modules } from './modules';
import { ModuleService } from 'src/app/shared/module.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	userDetails;
	showSucessMessage: boolean;
	serverErrorMessages: string;
	modules = modules;
	// uploadForm: FormGroup;
	user;
	addedModules;
	modulesList;

	constructor(private fb: FormBuilder, private http: HttpClient, private postService: PostService, private moduleService: ModuleService, private userService: UserService, private router: Router) {
	}



	onSubmit(form: NgForm) {
		console.log(form.value)
		this.postService.addModule(form.value).toPromise().then(
			res => {
				this.showSucessMessage = true;
				const source = timer(4000);
				source.subscribe(val => {
					this.resetForm(form)
					console.log("module added");
				});
			},
			err => {
				if (err.status === 422) {
					this.serverErrorMessages = err.error.join('<br/>');
				}
				else
					this.serverErrorMessages = 'Something went wrong.Please contact admin.';
			}
		);
	}



	resetForm(form: NgForm) {

		this.showSucessMessage = false;
		form.resetForm();
		this.serverErrorMessages = '';
	}
	ngOnInit() {
		this.user = this.userService.getUserPayload()['_id']
		console.log(this.user)
		this.userService.getUserProfile().subscribe(
			res => {
				this.userDetails = res['user'];
				console.log(this.userDetails)
			},
			err => {
				console.log(err);

			}
		);
		this.moduleService.getAddedModules(this.user).toPromise().then(
			res => {
				this.addedModules = res['modules'];
				this.checkModules(this.addedModules, modules);
				console.log(this.addedModules)
			},
			err => {
				console.log(err);

			}
		);
	}

	checkModules(am, m) {
		var moduleList: any[] = m;
		var idx: number = 0;
		for (let x = 0; x < am.length; x++) {
			for (let y = 0; y < moduleList.length; y++) {
				if (am[x].name == moduleList[y].name) {
					//console.log(am[x].name + " " + moduleList[y].name)
					moduleList.splice(y,1)
				}
			}
		}
		this.modulesList = moduleList;
		//console.log("checked List: ", this.modulesList);
	}


}
