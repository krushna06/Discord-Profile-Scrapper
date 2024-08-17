import Route from 'route-parser';
import { GetApplicationIcon } from './methods/applications';
import { GetUser, GetUserAvatar, GetUserBanner, GetUserProfile } from './methods/users';

import { Health } from './methods/health';

import { RouteDefinition } from './types/Routes';
import { ReadmeGist } from './methods/gist';

export const routes: RouteDefinition[] = [
  { route: new Route('/health'), method: 'GET', handler: Health },
  { route: new Route('/gist'), method: 'GET', handler: ReadmeGist },

  // User profile
  { route: new Route('/users/:id'), method: 'GET', handler: GetUser },
  { route: new Route('/profile/:id'), method: 'GET', handler: GetUserProfile },

  // User avatars
  { route: new Route('/avatars/:id.:ext'), method: 'GET', handler: GetUserAvatar },
  { route: new Route('/avatars/:id'), method: 'GET', handler: GetUserAvatar },

  // User banners
  { route: new Route('/banners/:id.:ext'), method: 'GET', handler: GetUserBanner },
  { route: new Route('/banners/:id'), method: 'GET', handler: GetUserBanner },

  // Applications
  { route: new Route('/app-icons/:id.:ext'), method: 'GET', handler: GetApplicationIcon },
  { route: new Route('/app-icons/:id'), method: 'GET', handler: GetApplicationIcon },
];
