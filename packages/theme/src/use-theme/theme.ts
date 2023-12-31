import type { Scheme } from '@material/material-color-utilities'
import type { States } from '../state/state'
import type { Colors } from '../color/color'
import type { Elevations } from '../elevation/elevation'

export type Palette = Omit<Record<keyof Scheme, string>, 'toJSON'>

export interface ThemeConfig {
  palette: Partial<Palette>
}

export type ThemePaletteColor = 'primary' | 'secondary' | 'tertiary' | 'error'
export type ThemeCallBack = (theme: Theme) => string
export interface ParsedScheme {
  palette: Palette
  styles: Record<string, string>
}

export default interface Theme {
  palette: Palette
  readonly colors: Colors
  readonly states: States
  readonly elevations: Elevations
}
