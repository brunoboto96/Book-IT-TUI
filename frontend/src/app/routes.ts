import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './cp/user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { PostComponent } from './cp/post/post.component';
import { CpComponent } from './cp/cp.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { PostsListComponent } from './cp/posts-list/posts-list.component';
import { PostEditComponent } from './cp/post-edit/post-edit.component';
import { ModuleDetailsComponent } from './cp/module-details/module-details.component';
import { InfoComponent } from './info/info.component';

export const appRoutes: Routes = [
    /*{
        path: 'admin/signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'admin/login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'admin/cp/userprofile', component: CpComponent,canActivate:[AuthGuard],
        children: [{ path: '', component: UserProfileComponent }]
    },
    {
        path: 'admin/cp/post', component: CpComponent,canActivate:[AuthGuard],
        children: [{ path: '', component: PostComponent }]
    },
    {
        path: 'admin/cp/posts/manage', component: CpComponent,canActivate:[AuthGuard],
        children: [{ path: '', component: PostsListComponent }]
    },
    {
        path: 'admin/cp/posts/edit/:postId', component: CpComponent,canActivate:[AuthGuard],
        children: [{ path: '', component: PostEditComponent }]
    },
    {
        path: 'admin/cp', redirectTo: 'admin/cp/userprofile', pathMatch: 'full'
    },
    /*{
        path: '', redirectTo: 'admin/login', pathMatch: 'full'
    },*/

    {
        path: '', component: ProjectListComponent
    },
    {
        path: 'info', component: InfoComponent
    },
    {
        path: 'session', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: CpComponent,canActivate:[AuthGuard],
        children: [{ path: '', component: UserProfileComponent }]
    },
    {
        path: 'module/:name', component: CpComponent,canActivate:[AuthGuard],
        children: [{ path: '', component: ModuleDetailsComponent}]
    },
];