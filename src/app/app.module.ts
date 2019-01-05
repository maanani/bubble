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



import { Home3Page } from '../pages/home3/home3';
import { ContentPage } from '../pages/content/content';
import { TabsPage } from '../pages/tabs/tabs';

import { DuaaPage } from '../pages/duaa/duaa';
import { DuaalistPage } from '../pages/duaalist/duaalist';

import { HttpModule } from '@angular/http'; //OK
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { LoginProvider } from '../providers/login/login';
// MM import Firebase
import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';

//MM importation module SQLITE 
import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { IonicStorageModule  } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { TodolistProvider } from '../providers/todolist/todolist';
import { DatabaseProvider } from '../providers/database/database';
import { WpProvider } from '../providers/wp/wp';
import { AgencesDataProvider } from '../providers/agences-data/agences-data';
import { FIREBASE_CONFIG } from './app.firebase.config';

import { QuizPage } from '../pages/quiz/quiz';
import { QuizProvider } from '../providers/quiz/quiz';
import { ResultPage } from '../pages/result/result';
import { CallNumber } from '@ionic-native/call-number';
import {Network} from '@ionic-native/network'
import { ResetpwdPage } from '../pages/resetpwd/resetpwd';
import { NetworkserviceProvider } from '../providers/networkservice/networkservice';
import { SettingPage } from '../pages/setting/setting';
import { UpdatetaskPage } from '../pages/updatetask/updatetask';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { OptionsPage } from '../pages/options/options';
import { ZiyartPage } from '../pages/ziyart/ziyart';
import { OmraPage } from '../pages/omra/omra';
@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    TodolistPage,
    AjoutertaskPage,
    UpdatetaskPage,
    SignupPage,
    ResetpwdPage,
    LogoutPage,
    EditListPage,
    Home3Page,
    AgencesPage,
    ContentPage,
    QuizPage,
    ResultPage,
    OptionsPage,
    DuaaPage,
    DuaalistPage,
    ZiyartPage,
    OmraPage,
    SettingPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG.config),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    ResetpwdPage,
    LogoutPage,
    TodolistPage,
    AjoutertaskPage,
    UpdatetaskPage,
    EditListPage,
    Home3Page,
    ContentPage,
    QuizPage,
    ResultPage,
    AgencesPage,
    OptionsPage,
    DuaaPage,
    ZiyartPage,
    DuaalistPage,
    OmraPage,
    SettingPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    HttpModule,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleAnalytics,
    //LoginProvider,
    SQLitePorter,
    SQLite,
    Toast,
    TodolistProvider,
    DatabaseProvider,
    WpProvider,
    AgencesDataProvider,
    QuizProvider,
    CallNumber,
    Network,
    NetworkserviceProvider
  ]
})
export class AppModule {}
