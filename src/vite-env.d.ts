/// <reference types="vite-plugin-svgr/client" />
declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  import * as React from "react";
  const SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  VITE_FIREBASE_API_KEY: string;
  VITE_FIREBASE_AUTH_DOMAIN: string;
  VITE_FIREBASE_PROJECT_ID: string;
  VITE_FIREBASE_STORAGE_BUCKET: string;
  VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  VITE_FIREBASE_APP_ID: string;
  VITE_FIREBASE_MEASUREMENT_ID: string;
  VITE_FIREBASE_DATABASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
