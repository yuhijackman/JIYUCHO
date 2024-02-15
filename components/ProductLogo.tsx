import { cn } from "@/lib/utils";
import { Fredoka } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

interface ProductLogoProps {
  className?: string;
  type: "full" | "short";
}

const font = Fredoka({
  subsets: ["latin"],
  weight: ["600"]
});

const ProductLogo = ({ className, type }: ProductLogoProps) => {
  const text = type === "full" ? "JIYUCHO" : "A";

  return (
    <Link
      href="/"
      className={cn("inline-block flex items-center gap-1.5", className)}
    >
      <Image
        src="/jiyuchologo.png"
        alt=""
        width="50"
        height="50"
        className={type === "short" ? "max-w-10" : ""}
      ></Image>
      {type === "full" && (
        <span
          className={cn(
            "font-semibold text-xl bg-gradient-to-r from-[#faa499] via-[#f7dd85] to-[#ffc55c] text-transparent bg-clip-text tracking-widest",
            font.className
          )}
        >
          JIYUCHO
        </span>
      )}
    </Link>
  );
};

export default ProductLogo;
