import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate, useOutlet } from 'react-router-dom'

import logo from '../assets/images/logo.svg'
import { useSwipe } from '../hooks/useSwipe'

const linkMap: Record<string, string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/home',
}

export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({})
  const mainRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const nav = useNavigate()
  const animating = useRef(false)

  const outlet = useOutlet()
  map.current[location.pathname] = outlet

  const direction = useSwipe(mainRef, { onTouchStart: e => e.preventDefault() })

  useEffect(() => {
    if (direction === 'left') {
      !animating.current && nav(linkMap[location.pathname])
    }
  }, [direction, animating])

  const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 300 },
    onStart: () => animating.current = true,
    onRest: () => animating.current = false
  })

  const onReadEnd = () => localStorage.setItem('hasReadWelcome', 'yes')

  return (
    <div bg="#5f34bf" h-screen flex flex-col py-18px overflow-hidden >
      <header flex-shrink-0 text-center >
        <img src={logo} alt="山竹记账" w-64px h-69px />
        <h1 text="#D4D4EE" text-32px >山竹记账</h1>
      </header>
      <main ref={mainRef} flex-grow-1 text-center relative>
        {
          transitions((style, pathname) =>
            <animated.div key={pathname} style={style} absolute w="100%" h="100%" p-16px >
              <div bg-white rounded-8px w="100%" h="100%" flex justify-center items-center >
                {map.current[pathname]}
              </div>
            </animated.div>
          )
        }
      </main>
      <footer flex-shrink-0 grid grid-rows-1 grid-cols-3 text-center text-24px >
        <Link
          to={linkMap[location.pathname]}
          onClick={linkMap[location.pathname] === '/home' ? onReadEnd : () => {}}
          style={{ gridArea: '1 / 2 / 2 / 3' }}
          text-white
        >
          下一页
        </Link>
        <Link to={'/home'} onClick={onReadEnd} style={{ gridArea: '1 / 3 / 2 / 4' }} text-white mr-12px >跳过</Link>
      </footer>
    </div>
  )
}
