import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule} from '@angular/fire/compat'
/* import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; */
import { environment } from 'src/environments/environment.development';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {provideFirestore,getFirestore} from '@angular/fire/firestore'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirestore(()=>getFirestore())

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
