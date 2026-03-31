import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false, // Set to false to use the token for real-time updates
  apiVersion: "2024-03-31",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN, // This allows writing/reading private data
});
