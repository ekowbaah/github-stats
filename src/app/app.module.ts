import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EmptyComponent } from './layouts/pages/empty.component';
import { MainContentComponent } from './layouts/pages/main-content.component';
import { NavbarComponent } from './layouts/components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './layouts/pages/page-not-found.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    EmptyComponent,
    NavbarComponent,
    PageNotFoundComponent,
    MainContentComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
