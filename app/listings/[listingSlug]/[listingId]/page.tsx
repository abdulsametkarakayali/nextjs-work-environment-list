
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import { NextSeo } from 'next-seo';
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";
import { log } from "console";

interface IParams {
  listingId?: string;
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  try {
    console.log(params);
    
    const post = await getListingById(params);

    if (!post)
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      };
    return {
      title: post.title,
      description: post.description,
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}


const ListingPage = async ({ params }: { params: IParams }) => {

  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }



  return (
    
  <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ListingPage;