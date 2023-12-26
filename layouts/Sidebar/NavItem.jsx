import Image from "next/image";
import Link from "next/link";

const NavItem = ({item: { svg, href, name }, open}) => {
  return (
    <Link
      href={href}
      className={`mt-5 flex  font-medium p-2 hover:bg-secondary rounded-xl duration-200`}
    >
      <Image
        className={`flex w-7 h-7 min-h-max mr-2 invert duration-300 ${
          !open && "translate-x-1 sm:translate-x-1.5"
        }`}
        src={svg}
        width={28}
        height={28}
        alt={`${name}-icon.svg`}
      />
      <span
        className={`whitespace-pre duration-300 ${
          !open && "opacity-0 translate-x-16 overflow-hidden"
        }`}
      >
        {name}
      </span>
    </Link>
  );
};

export default NavItem;