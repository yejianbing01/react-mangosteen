import type { FC } from 'react'
import { useState } from 'react'

export const DatePicker: FC = () => {
  const [translateY, setTranslateY] = useState(-1)
  const [startY, setStartY] = useState(-1)

  const onTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    const curY = e.touches[0].clientY
    const dy = curY - startY
    setTranslateY(translateY + dy)
    setStartY(curY)
  }
  const onTouchEnd = () => {
    const remainder = Math.abs(translateY) % 36
    if (translateY > 0) {
      remainder < 18
        ? setTranslateY(translateY - remainder)
        : setTranslateY(translateY - remainder + 36)
    } else {
      remainder < 18
        ? setTranslateY(translateY + remainder)
	      : setTranslateY(translateY + remainder - 36)
    }
  }

  return (
		<div relative h-50vh>
			<div h-36px b-1 b-solid b-red absolute top="50%" translate-y="[-50%]" w-screen />
			<div absolute top="[calc(50%-18px)]" w-screen
				style={{ transform: `translateY(${translateY}px)` }}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
				transition-all duration-100
			>
				<ol text-center children-h-36px children-leading-36px>
					<li>2001</li>
					<li>2002</li>
					<li>2003</li>
					<li>2004</li>
					<li>2005</li>
					<li>2006</li>
					<li>2007</li>
					<li>2008</li>
					<li>2009</li>
					<li>2010</li>
					<li>2011</li>
					<li>2012</li>
					<li>2013</li>
					<li>2014</li>
					<li>2015</li>
					<li>2016</li>
					<li>2017</li>
					<li>2018</li>
					<li>2019</li>
					<li>2020</li>
					<li>2020</li>
					<li>2020</li>
					<li>2020</li>
					<li>2020</li>
					<li>2020</li>
					<li>2020</li>
					<li>2020</li>
					<li>2020</li>
					<li>2020</li>
					<li>2020</li>
				</ol>
			</div>
    </div>
  )
}
