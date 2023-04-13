import ReactDOM from 'react-dom'
import { Loading } from './Loading'

let toastWrapper = document.getElementById('toastWrapper')

export const Toast = {

  loading: () => {
    if (!toastWrapper) {
      toastWrapper = document.createElement('div')
      toastWrapper.id = 'toastWrapper'
      document.body.appendChild(toastWrapper)
    }
    ReactDOM.render(
			<div fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-transparent >
				<div w="50vw" h="50vw" bg-black bg-opacity-70 rounded-8px flex items-center justify-center text-white >
					<Loading />
				</div>
			</div>,
			toastWrapper)
  },

  hide: () => {
    if (!toastWrapper) { return }
    ReactDOM.unmountComponentAtNode(toastWrapper)
  }

}
