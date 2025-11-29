import { createAuth0Client, Auth0Client } from "@auth0/auth0-spa-js";

let auth0: Auth0Client | null = null;

export const initAuth0 = async () => {
  auth0 = await createAuth0Client({
    domain: import.meta.env.VITE_AUTH0_DOMAIN!,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID!,
    authorizationParams: {
      redirect_uri: import.meta.env.VITE_REDIRECT_URI || "http://localhost:5173",
      audience: import.meta.env.VITE_AUTH0_AUDIENCE
    },
  });

  // Handle redirect callback (Auth0 → your SPA)
  if (window.location.search.includes("code=")) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  return auth0;
};

export const getAuth0 = () => auth0;
