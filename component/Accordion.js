import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid';

export default function Accordion({open, title, groupElement}) {
    const [isShow, setIsShow] = React.useState(open);
    const handleClick = () => {
        setIsShow(!isShow);
    };
    
    return (
        <>
        <div>
        <button
          className="min-w-max flex justify-between items-center pt-3 shadow uppercase tracking-wider leading-none h-10 py-2 text-m font-medium text-black bg-gray-100 rounded-sm hover:bg-gray-200 focus:outline-none"
          onClick={handleClick}
          style={{width: '95%', margin: '1rem'}}
          type="button"
        >
          <h3 className="h-5 ml-2 w-5 text-primary">{title}</h3>
          <ChevronDownIcon
            className="h-5 m-2 w-5 text-primary"
            aria-hidden="true"
          />
        </button>
        {!isShow
          && (
            <div>
              <div className="m-4">
                <div className="flex gap-4">
                {groupElement}
                </div>
              </div>
            </div>
          )}
      </div>
  </>
)
}
