import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrationComponent } from "./registration/registration.component";
import { FormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import {GrowlModule} from 'primeng/growl';

// Apollo
import { GraphQLModule } from "./graphql.module/graphql.module";

@NgModule({
  declarations: [
    AppComponent,RegistrationComponent,   NavbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,GraphQLModule,FormsModule,NgbModule.forRoot(),AppRoutingModule,GrowlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
