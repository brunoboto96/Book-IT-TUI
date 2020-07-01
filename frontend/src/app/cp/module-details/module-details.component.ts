import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from 'src/app/shared/module.service';

@Component({
  selector: 'app-module-details',
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.css']
})
export class ModuleDetailsComponent implements OnInit {

  moduleName;
  moduleList;

  constructor(private route: ActivatedRoute, private moduleService: ModuleService) { }

  ngOnInit() {
    
    this.moduleName = decodeURI(this.route.snapshot.params['name']);
    console.log(this.moduleName)

    this.moduleService.getModuleByName(this.moduleName).toPromise().then(
      res => {
				this.moduleList = res['modules'];
				console.log(this.moduleList)
			},
			err => {
				console.log(err);

			}
    )
       
  }

}
