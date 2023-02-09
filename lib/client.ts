import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "wsqh0qds",
  dataset: "production",
  apiVersion: "2023-01-31",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});
