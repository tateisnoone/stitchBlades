import { AUTH_ROUTES } from "./auth";
import { USER_ROUTES } from "./user";
import { STATIC_ROUTES } from "./static";

export const DEFAULT_LAYOUT_ROUTES = [
  ...AUTH_ROUTES,
  ...USER_ROUTES,
  ...STATIC_ROUTES,
];
