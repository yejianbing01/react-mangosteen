import type { FC, ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { Loading } from './Loading'

let toastWrapper = document.querySelector('#toastWrapper')
let toastRoot: ReactDOM.Root | undefined
if (!toastWrapper) {
  toastWrapper = document.createElement('div')
  toastWrapper.id = 'toastWrapper'
  document.body.appendChild(toastWrapper)
  toastRoot = ReactDOM.createRoot(toastWrapper)
}

type ToastContentProps = {
  children?: ReactNode
}
export const ToastContent: FC<ToastContentProps> = (props) => {
  return (
    <div fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-transparent >
			<div w="50vw" h="50vw" bg-black bg-opacity-70 rounded-8px flex flex-col items-center justify-center text-white >
        {props.children}
			</div>
		</div>
  )
}

export const CustomContent: FC<ToastContentProps> = (props) => {
  return (
    <div fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-30
      onClick={() => Toast.hide()}>
      {/* <div bg-black bg-opacity-80 rounded-8px flex flex-col items-center justify-center text-white
        onClick={e => e.stopPropagation()}> */}
        {props.children}
			{/* </div> */}
		</div>
  )
}

export const Toast = {

  loading: () => toastRoot?.render(<ToastContent><Loading /></ToastContent>),

  info: (title: string | ReactNode, timeout?: number) => {
    toastRoot?.render(<ToastContent>{title}</ToastContent>)
    if (timeout) { setTimeout(() => Toast.hide(), timeout) }
  },

  hide: () => {
    if (toastWrapper) { toastRoot?.render('') }
  },

  custom: (element: ReactNode) => {
    toastRoot?.render(<CustomContent>{element}</CustomContent>)
  }

}
