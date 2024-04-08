import Image, { ImageProps } from "next/image"
import { FC } from "react"

type TLogoProps = Omit<ImageProps, "src" | "alt">

export const Logo: FC<TLogoProps> = ({ width, height, ...rest }) => (
  <Image
    src='/logo.png'
    alt='Logo'
    width={width ?? 100}
    height={height ?? 60}
    {...rest}
  />
)
