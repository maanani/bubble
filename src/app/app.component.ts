import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, NavController, Nav ,App, LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { NetworkserviceProvider } from '../providers/networkservice/networkservice';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { Home3Page } from '../pages/home3/home3';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 // @ViewChild(Nav) nav: Nav;

 rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public networkService: NetworkserviceProvider,
    public toast: ToastController, private angufireAuth: AngularFireAuth, public loadingCtrl:LoadingController,public app:App) {

      
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     // let self=this;
    // let loader = this.loadingCtrl.create();
    //  loader.present();
    //  this.listenToUserStatusUpdate(loader);
    //  let fireBaseUser = angufireAuth.auth.currentUser;
    //  console.log('Userfirebase'+fireBaseUser);
    //  this.rootPage = fireBaseUser ? TabsPage:WelcomePage; 
       statusBar.styleDefault();
      this.initializeApp();

      
      //splashScreen.hide();
    });
  }
  initializeApp(): void {

    this.networkService.initializeNetworkEvents();
    this.rootPage = TabsPage;
    // this.angufireAuth.authState
		// 		.subscribe(
		// 			user => {
            
		// 				if (user) {
		// 					this.rootPage = TabsPage;
		// 				} else {
		// 					this.rootPage = WelcomePage;
		// 				}
		// 			},
		// 			() => {
		// 				this.rootPage = WelcomePage;
		// 			}
		// 		);

    this.networkService.getNetworkStatus().subscribe(data => {
      console.log('platform ready', data);
      this.toast.create({
        message: data? 'No connection':' connection ' + this.networkService.getNetworkType(),
        duration: 1000,
      }).present();
    });
  }
 
}
