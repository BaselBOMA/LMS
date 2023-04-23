import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/items',
        name: '::Menu:LibraryItems',
        iconClass: 'fas fa-regular fa-book-open',
        order: 2,
        layout: eLayoutType.application,
        requiredPolicy: 'LMS.LibraryItems',
      },
      {
        path: '/books',
        name: '::Menu:Books',
        iconClass: 'fas fa-book',
        order: 3,
        layout: eLayoutType.application,
        requiredPolicy: 'LMS.LibraryItems',
      },
      {
        path: '/magazines',
        name: '::Menu:Magazines',
        iconClass: 'fas fa-newspaper',
        order: 4,
        layout: eLayoutType.application,
        requiredPolicy: 'LMS.LibraryItems',
      },
      {
        path: '/dvds',
        name: '::Menu:Dvds',
        iconClass: 'fas fa-light fa-compact-disc',
        order: 5,
        layout: eLayoutType.application,
        requiredPolicy: 'LMS.LibraryItems',
      },
    ]);
  };
}
