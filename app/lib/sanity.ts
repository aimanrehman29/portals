import { createClient } from "next-sanity";

// src/lib/sanity.ts
export const client = createClient({
  projectId: "bt0l9086",
  dataset: "production",
  apiVersion: "2024-03-20",
  token: "skhwJVeBzyB8cKP67n2WzSzC3uJfzhR4zEoSvIZx9R3AXQHes9IqrVFBYyfG7ZrD9ry7LUpSEwGsy7djhUnUfgAW6GWEBtESEjnd4E7HeReTBSrJxl0zkvbSjHVLyGEVPd6u3XimruIBvwoxW0AqEYL6joYy1LhYl5L4M6m4TcnqgBmxR9hb", // Add this line!
  useCdn: false,
});