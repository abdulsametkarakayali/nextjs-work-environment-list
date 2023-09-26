'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import { IoLocationSharp } from 'react-icons/io5';
import {FaLaptopCode, FaCoffee, FaDesktop } from 'react-icons/fa';
import {BiWifi} from 'react-icons/bi';
import { TiWeatherSnow} from 'react-icons/ti';


import useCountries from "@/app/hooks/useCountries";
import { 
  SafeListing, 
  SafeReservation, 
  SafeUser 
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  return (
    <div 
      onClick={() => router.push(`/listings/${data.id}`)} 
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
          <IoLocationSharp size={14} /> {data.title}
        </div>
        <div className=" text-md flex flex-row gap-2 items-center">
          <FaLaptopCode className="fill-red"/>Çalışma Ortamı: 7/10
        </div>   
        <div className=" text-md flex flex-row gap-2 items-center">
          <FaCoffee />içecek Ücreti: 60₺ - 100₺ Arası
        </div>        
        <div className=" text-md flex flex-row gap-2 items-center">
          <BiWifi className="fill-red"/>internet: 7/10
        </div>   
        <div className=" text-md flex flex-row gap-2 items-center">
          <TiWeatherSnow />Klima:Var
        </div>   
        <div className=" text-md flex flex-row gap-2 items-center">
          <FaDesktop className="fill-red"/>Büyük Masa: Var
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