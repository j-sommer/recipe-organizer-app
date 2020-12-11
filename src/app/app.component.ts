import { Component } from '@angular/core';
import { SideMenuItem } from '@core/models/side-menu-item.model';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '@core/models/category/category.model';
import { categoriesList } from '@core/const/categories-list.const';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public readonly menuItems = {
    home: {
      title: 'home',
      url: '/home',
      icon: 'library-outline',
    } as SideMenuItem,
    categories: {
      title: 'categories',
      url: '/categories',
      icon: 'file-tray-full-outline',
    } as SideMenuItem,
    recipeForm: {
      title: 'new-recipe',
      url: '/recipe-form',
      icon: 'add-circle-outline',
    } as SideMenuItem,
    planner: {
      title: 'planner',
      url: '/planner',
      icon: 'calendar-outline',
    },
    settings: {
      title: 'settings',
      url: '/settings',
      icon: 'settings-outline',
    } as SideMenuItem,
  };

  public readonly categories: Category[] = categoriesList;
  public readonly categoryViewBaseRoute = '/category-view';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private androidPermissions: AndroidPermissions,
    private translate: TranslateService
  ) {
    this.initializeApp();

    if (this.platform.is('android')) {
      this.initializeAndroidPermissions();
    }
  }

  private initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#006D77');
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });

    this.translate.setDefaultLang('de');
    this.translate.use(this.translate.defaultLang);
  }

  private initializeAndroidPermissions(): void {
    this.androidPermissions
      .checkPermission(this.androidPermissions.PERMISSION.CAMERA)
      .then(
        (result) => console.log('Has permission?', result.hasPermission),
        (err) =>
          this.androidPermissions.requestPermission(
            this.androidPermissions.PERMISSION.CAMERA
          )
      );

    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.CAMERA,
      this.androidPermissions.PERMISSION.GET_ACCOUNTS,
    ]);
  }
}
