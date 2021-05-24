import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { MemeberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemeberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { AuthGuard } from './_guards/auth.guard';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { 
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent},
            { path: 'members/:id', component: MemberDetailComponent,
             resolve: {user: MemeberDetailResolver}},
            { path: 'member/edit', component: MemberEditComponent,
             resolve: {user: MemeberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            { path: 'messages', component: MessagesComponent},
            { path: 'lists', component: ListsComponent}
        ]
    },
        { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

