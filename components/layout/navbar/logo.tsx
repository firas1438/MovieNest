import Link from "next/link";
import Image from "next/image";

export const Logo = () => (
  <Link href="/">
    {/* Light mode logo */}
    <Image src="/dark-logo.svg" alt="MovieNest Logo" width={140} height={50} className="block dark:hidden"/>
    {/* Dark mode logo */}
    <Image src="/light-logo.svg" alt="MovieNest Logo" width={140} height={50} className="hidden dark:block"/>
  </Link>
);
