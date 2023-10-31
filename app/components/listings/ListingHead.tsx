'use client';

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { JsonValue } from "type-fest";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import React, { useState } from "react";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string[];
  id: string;
  currentUser?: SafeUser | null
}


const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries();
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const location = getByValue(locationValue);
  console.log(imageSrc);

  return ( 
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />     
      <div className="flex gap-5 flex-col">
      <div className="relative w-full h-[60vh]">
        <Image alt="listing" className="object-cover w-full" fill src={imageSrc[currentPhoto]} />
      </div>
      {imageSrc.length > 1 && (
        <ul className="flex gap-5 flex-wrap">
          {imageSrc.map((photo, index) => (
            <li
              key={index}
              className="relative w-48 h-32 cursor-pointer"
              onClick={() => setCurrentPhoto(index)}
            >
              <Image alt={title} fill src={photo} />
            </li>
          ))}
        </ul>
      )}
    </div>
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
    </>
   );
}
 
export default ListingHead;