import { Component } from '@angular/core';
import { SideMenuItem } from '@core/models/side-menu-item.model';
import { RecipeFileHandlerService } from '@core/services/recipe-file-handler.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  sideMenuItems: SideMenuItem[] = [
    {
      title: 'Übersicht',
      url: '/home',
      icon: 'grid',
    },
    {
      title: 'Neues Rezept',
      url: '/new-recipe',
      icon: 'add',
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private recipeFileService: RecipeFileHandlerService
  ) {
    this.initializeApp();
  }

  private initializeApp(): void {
    this.recipeFileService.createRecipeDir();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
