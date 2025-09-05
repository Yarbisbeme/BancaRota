import Image from "next/image";
import Link from "next/link";

export const LogoYBank = () => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image
        src="/icons/logoY.svg"
        alt="Logo"
        width={36}
        height={36}
        className="max-lg:w-8 max-lg:h-8"
      />
      <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1 -ml-1">Bank</h1>
    </Link>
  );
};
