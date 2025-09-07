import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const backEndClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // Set this to false if statically generating pages, using ISR or tag-based revalidation etc
    token: process.env.SANITY_API_TOKEN,
});