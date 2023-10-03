'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { IoLocationSharp } from 'react-icons/io5';
import {FaLaptopCode, FaCoffee, FaDesktop } from 'react-icons/fa';
import {BiWifi} from 'react-icons/bi';
import { TiWeatherSnow} from 'react-icons/ti';
import { createSEOFriendlyURL } from '../../utils/seoFriendlyURL';

import useCountries from "@/app/hooks/useCountries";
import { 
  SafeListing,  
  SafeUser 
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const seoFriendlyURL = createSEOFriendlyURL(data.title);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  return (

    
    <div 
      onClick={() => router.push(`/listings/${seoFriendlyURL}/${data.id}`)} 
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton 
              listingId={data.id} 
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className=" text-md flex flex-row gap-2 items-center">
          <IoLocationSharp className="text-red-600" size={14} /> {data.title}
        </div>
        <div className=" text-md flex flex-row gap-2 items-center">
          <FaLaptopCode className="text-stone-400"/>Çalışma Ortamı:{data.workingEnvironment}/10
        </div>   
        <div className=" text-md flex flex-row gap-2 items-center">
          <FaCoffee className="text-black"/>içecek Ücreti: {data.drinkPriceStart}₺ - {data.drinkPriceEnd}₺
        </div>        
        <div className=" text-md flex flex-row gap-2 items-center">
          <BiWifi className="text-orange-500"/>internet Kalitesi: {data.internet}/10
        </div>   
        <div className=" text-md flex flex-row gap-2 items-center">
          <TiWeatherSnow className="text-sky-400" />Klima:{data.airConditioning?"Var":"Yok"}
        </div>   
        <div className=" text-md flex flex-row gap-2 items-center">
          <FaDesktop className="fill-red"/>Büyük Masa: {data.bigTable?"Var":"Yok"}
        </div>   
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
   );
}
 
export default ListingCard;