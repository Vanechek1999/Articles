import { HandySvg } from "handy-svg";

type SvgImageProps = {
  type: string;
  size?: number;
  className?: string;
};

const SvgImage = ({type, size, className}: SvgImageProps) => {
  const cross: string = require("./svgs/cross.svg").default
  const arrow: string = require("./svgs/arrow.svg").default
  const svgTypes = {
    "cross": cross,
    "arrow": arrow,
  }

  return <HandySvg src={svgTypes[type as keyof typeof svgTypes]} className={className} width={size} height={size} />
}

export default SvgImage