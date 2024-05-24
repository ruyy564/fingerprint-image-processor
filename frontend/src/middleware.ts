export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/fingerprint-db",
    "/fingerprint-match",
    "/fingerprint-generator-by-params",
    "/fingerprint-generator-by-vae",
    "/fingerprint-fit-vae",
  ],
};
