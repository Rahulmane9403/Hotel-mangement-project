import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { guestGuard } from './guard/guest.guard';
import { authGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';
import { ROLES } from './constants/roles.ts';
import { AllUsersComponent } from './component/all-users/all-users.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AmenitiesComponent } from './component/amenities/amenities.component';
import { RoomTypeListComponent } from './component/room-type/room-type-list/room-type-list.component';
import { RoomListComponent } from './component/room/room-list/room-list.component';
import { RoomAmenityComponent } from './component/room-amenity/room-amenity/room-amenity.component';
import { HotelSearchPageComponent } from './component/hotel-search/hotel-search-page/hotel-search-page.component';
import { SearchFiltersComponent } from './component/hotel-search/search-filters/search-filters.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [guestGuard],
        children: [
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
        ],
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                // canActivate: [RoleGuard],
                // data: { roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.GUEST] }
            },
            {
                path: 'all-users',
                component: AllUsersComponent,
                canActivate: [RoleGuard],
                data: { roles: [ROLES.ADMIN, ROLES.GUEST] },
            },
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'amenities',
                component: AmenitiesComponent,
            },
            {
                path: 'room-type-list',
                component: RoomTypeListComponent,
            },
            { path: 'room-list', component: RoomListComponent, },
            {path: 'room-amenity', component:RoomAmenityComponent},
            {path: 'hotel-search-page', component:HotelSearchPageComponent},
            {path: 'search-filters', component: SearchFiltersComponent}
        ],
    },
    { path: '**', redirectTo: '/login' },
];
