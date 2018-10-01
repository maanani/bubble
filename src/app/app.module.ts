import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// MM-Pages ajouter  aussi dans la section plus bas declaration et entry compenent
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { LogoutPage } from '../pages/logout/logout';
import { TodolistPage } from '../pages/todolist/todolist';
import { AjoutertaskPage } from '../pages/ajoutertask/ajoutertask';
import { EditListPage } from '../pages/edit-list/edit-list';
import {AgencesPage} from '../pages/agences/agences';

// MM-Pages ajouter  aussi dans la section plus bas declaration et entry compenent
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { Home2Page } from '../pages/home2/home2';
import { Home3Page } from '../pages/home3/home3';
import { ContentPage } from '../pages/content/content';
import { TabsPage } from '../pages/tabs/tabs';
import { TabtestPage } from '../pages/test/tabtest';

import { HttpModule } from '@angular/http'; //OK
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';

//MM importation module SQLITE 
import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { IonicStorageModule  } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { TodolistProvider } from '../providers/todolist/todolist';
import { DatabaseProvider } from '../providers/database/database';
import { WpProvider } from '../providers/wp/wp';
import { AgencesDataProvider } from '../providers/agences-data/agences-data';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    TodolistPage,
    AjoutertaskPage,
    SignupPage,
    LogoutPage,
    AboutPage,
    EditListPage,
    ContactPage,
    HomePage,
    Home2Page,
    Home3Page,
    AgencesPage,
    ContentPage,
    TabtestPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    LogoutPage,
    TodolistPage,
    AjoutertaskPage,
    EditListPage,
    AboutPage,
    ContactPage,
    HomePage,
    Home2Page,
    Home3Page,
    ContentPage,
    AgencesPage,
    TabtestPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    HttpModule,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    SQLitePorter,
    SQLite,
    Toast,
    TodolistProvider,
    DatabaseProvider,
    WpProvider,
    AgencesDataProvider
  ]
})
export class AppModule {}
