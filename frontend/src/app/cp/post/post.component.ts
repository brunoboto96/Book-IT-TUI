import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/shared/post.service';
import { fileURLToPath } from 'url';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';



@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
	showSucessMessage: boolean;
	serverErrorMessages: string;

	uploadForm: FormGroup;

	public uploader: FileUploader = new FileUploader({
		isHTML5: true
	});


	constructor(private fb: FormBuilder, private http: HttpClient, private postService: PostService) {
	}



	onSubmit(form: NgForm) {
		for (let i = 0; i < this.uploader.queue.length; i++) {
			let fileItem = this.uploader.queue[i]._file;
			if (fileItem.size > 30000000) {
				alert("Each File should be less than 30 MB of size.");
				return;
			}
		}
		//upload posts
		this.postService.postPost(form.value).toPromise().then(
			res => {

				//uploadFiles
				for (let j = 0; j < this.uploader.queue.length; j++) {
					let data = new FormData();
					let fileItem = this.uploader.queue[j]._file;
					console.log("Uploaded: " + fileItem.name);
					data.append('file', fileItem);
					data.append('postId', res["_id"]);
					this.postService.uploadFile(data).subscribe(data => {
						this.uploader.progress = 100;
						this.uploader.queue[j].progress = 100;


						this.showSucessMessage = true;
						const source = timer(4000);
						source.subscribe(val => {
							this.resetForm(form, this.uploader)
							console.log("bruh");
						});
					});
				}
			},
			err => {
				if (err.status === 422) {
					this.serverErrorMessages = err.error.join('<br/>');
				}
				else
					this.serverErrorMessages = 'Something went wrong.Please contact admin.';
			}
		);



		//this.uploader.clearQueue();

	}



	resetForm(form: NgForm, uploader: FileUploader) {

		this.uploader.clearQueue();
		this.showSucessMessage = false;
		this.postService.selectedPost = {
			title: '',
			description: ''
		};
		form.resetForm();
		this.serverErrorMessages = '';
	}


	ngOnInit() {
		this.uploadForm = this.fb.group({
			title: [null, Validators.compose([Validators.required])],
			description: [null, Validators.compose([Validators.required])]
		});
	}

}
