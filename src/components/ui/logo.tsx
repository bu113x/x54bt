import Link from "next/link";
import { siteConfig } from "@/config/site";
import logo from "@/assets/logo-bullex.svg";
import smallLogo from "@/assets/logo-bullex-small.png";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src={logo} alt={siteConfig.name} width={120} height={60} />
    </Link>
  );
};

const SmallLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src={smallLogo} alt={siteConfig.name} width={44} height={44} />
    </Link>
  );
};

export { SmallLogo };
export default Logo;
