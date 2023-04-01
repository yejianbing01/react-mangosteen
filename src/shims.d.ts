import * as React from 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    flex?: boolean
    relative?: boolean
    top?: string
    text?: string
    grid?: boolean
    before?: string
    after?: string
    shadow?: boolean,
    bg?: string
    w?: string,
    h?: string,
    absolute?: boolean,
    rounded?: string,
    fixed?: boolean,
    b?: string,
    z?: string,
    'focus:shadow'?: boolean
  }
}