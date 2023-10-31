import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  address?: string;
  workingEnvironment?: number;
  roomCount?: number;
  locationValue?: string;
  imageSrc?:string[];
  category?: string;
  drinkPriceStart?: number;
  drinkPriceEnd?: number;
  Internet?: string;
  airConditioning?:boolean;
  bigTable?:boolean;
}
export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId, 
      workingEnvironment, 
      locationValue,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }
    if (workingEnvironment) {
      query.workingEnvironment = {
        gte: +workingEnvironment
      }
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    })); 
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
