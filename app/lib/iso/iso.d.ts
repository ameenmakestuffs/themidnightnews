export const ZS: number

export function render(opts: {
  objects: unknown[]
  theme?: 'dark' | 'light' | Record<string, string>
  pad?: number
  stroke?: number
  zs?: number
  title?: string
  uid?: string
  className?: string
  playOnHover?: boolean
}): string

export function box(opts: Record<string, unknown>): Record<string, unknown>
export function line(opts: Record<string, unknown>): Record<string, unknown>
export function marker(opts: Record<string, unknown>): Record<string, unknown>
export const FRAMES: {
  scan: (n: number) => string[]
  ring: (n: number) => string[]
  fill: (n: number) => string[]
}

