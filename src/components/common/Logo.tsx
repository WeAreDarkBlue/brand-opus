import LogoSVG from "@/lib/icons/logo.svg";
import FullLogoSVG from "@/lib/icons/full-logo.svg";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "primary" | "logoOnly" | "full";
  fill?: string;
  className?: string;
}

const Logo = ({
  variant = "primary",
  fill = "white",
  className,
}: LogoProps) => {
  const vectorClasses = cn("h-auto", className);

  if (variant === "logoOnly") {
    return (
      <LogoSVG
        className={vectorClasses}
        width="48"
        height="56"
        style={{ fill }}
      />
    );
  }

  if (variant === "full") {
    return (
      <FullLogoSVG
        className={vectorClasses}
        width="160"
        height="56"
        style={{ fill }}
      />
    );
  }

  // default fallback
  return (
    <LogoSVG
      className={vectorClasses}
      width="48"
      height="56"
      style={{ fill }}
    />
  );
};

export default Logo;
