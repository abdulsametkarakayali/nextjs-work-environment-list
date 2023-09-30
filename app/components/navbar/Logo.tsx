'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    <div className="flex flex-row items-center gap-2 text-center">
    <Image
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer" 
      src="/images/logo.png" 
      height="48" 
      width="48" 
      alt="Logo" 
    />
      <h1 className="text-center text-lg font-bold text-black">
    Çalışma Ortamım
  </h1>
    </div>
   );
}
 
export default Logo;
