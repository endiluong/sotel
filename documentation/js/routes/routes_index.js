var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","loadChildren":"app/modules/content/pages/pages.module#PagesModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/modules/content/pages/pages-routing.module.ts","module":"PagesRoutingModule","children":[{"path":"","component":"PagesComponent","data":{"permissions":{"only":["ADMIN","USER"],"except":["GUEST"],"redirectTo":"/login"}},"children":[{"path":"","loadChildren":"./components/dashboard/dashboard.module#DashboardModule","children":[{"kind":"module","children":[],"module":"DashboardModule"}]},{"path":"builder","loadChildren":"./builder/builder.module#BuilderModule","children":[{"kind":"module","children":[],"module":"BuilderModule"}]},{"path":"header/actions","component":"ActionComponent"},{"path":"profile","component":"ProfileComponent"},{"path":"inner","component":"InnerComponent"}]},{"path":"login","loadChildren":"./auth/auth.module#AuthModule","data":{"permissions":{"except":"ADMIN"}}},{"path":"404","component":"ErrorPageComponent"},{"path":"error/:type","component":"ErrorPageComponent"}],"kind":"module"}],"module":"PagesModule"}]},{"path":"**","redirectTo":"404","pathMatch":"full"}],"kind":"module"}]}