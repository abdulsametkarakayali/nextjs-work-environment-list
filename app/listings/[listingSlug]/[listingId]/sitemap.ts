import getAllPosts from "@/app/actions/getListings";
import { createSEOFriendlyURL } from '@/app/utils/seoFriendlyURL';

export default async function sitemap() {
  const baseUrl = "http//localhost";


  // Get All Posts from CMS
  const posts = await getAllPosts({});
  console.log(posts);
  


  const postsUrls =
    posts?.map((post) => {
      const seoFriendlyURL = createSEOFriendlyURL(post.title);
      return {
        url: `${baseUrl}/listings/${seoFriendlyURL}/${post.id}`,
        lastModified: new Date(),
      };
    }) ?? [];


  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postsUrls,
  ];
}