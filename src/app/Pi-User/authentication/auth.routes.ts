import { Route } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { ForgotPasswordComponent } from "app/authentication/forgot-password/forgot-password.component";
import { LockedComponent } from "app/authentication/locked/locked.component";
import { Page404Component } from "app/authentication/page404/page404.component";
import { Page500Component } from "app/authentication/page500/page500.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
export const AUTH_ROUTE: Route[] = [
  {
    path: "",
    redirectTo: "signin",
    pathMatch: "full",
  },
  {
    path: "signin",
    component: SignInComponent,
  },
  {
    path: "signup",
    component:SignUpComponent,
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "locked",
    component: LockedComponent,
  },
  {
    path: "page404",
    component: Page404Component,
  },
  {
    path: "page500",
    component: Page500Component,
  },
];
