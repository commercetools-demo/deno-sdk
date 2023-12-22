import { colors } from "./deps.ts"

// color definitions following commercetools color palette

const turquoisedef = 0x31D3BC
const bluedef      = 0x3EA0EA
const yellowdef    = 0xFFD007
const orangedef    = 0xFF761C
const graydef      = 0xB4B4B4

export const ctcol = {
   gray: (message: string): string =>  colors.rgb24(message, graydef),
   orange: (message: string): string =>  colors.rgb24(message, orangedef),
   blue: (message: string): string =>  colors.rgb24(message, bluedef),
   turquoise: (message: string): string =>  colors.rgb24(message, turquoisedef),
   yellow: (message: string): string =>  colors.rgb24(message, yellowdef),

   bggray: (message: string): string =>  colors.black.bgRgb24(message, graydef),
   bgorange: (message: string): string =>  colors.white.bgRgb24(message, orangedef),
   bgblue: (message: string): string =>  colors.white.bgRgb24(message, bluedef),
   bgturquoise: (message: string): string =>  colors.white.bgRgb24(message, turquoisedef),
   bgyellow: (message: string): string =>  colors.black.bgRgb24(message, yellowdef)
}

export const { gray, orange, blue, turquoise, yellow, bggray, bgorange, bgblue, bgturquoise, bgyellow } = ctcol;
