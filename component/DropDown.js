/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import {
    Fragment, useState,
   } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

export default function MenuDropdown({ 
    filterList, 
    selectedfilter,
    setSelectedFilter 
}) {

     return (
       <div style={{ width: '150%' }} className="ml-1 w-100">
         <Listbox value={selectedfilter} onChange={setSelectedFilter}>
           <div style={{ width: '100%' }} className="relative m-1 z-50">
             <Listbox.Button className="relative w-full py-2 pl-3 m-1 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
               <span className="block truncate">{selectedfilter.split("_")[0]}</span>
               <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                 <SelectorIcon
                   className="w-5 h-5 text-gray-400"
                   aria-hidden="true"
                 />
               </span>
             </Listbox.Button>
             <Transition
               as={Fragment}
               leave="transition ease-in duration-100"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
             >
   
               <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                 { filterList && (
                    filterList.map((filter, personIdx) => (
                     <Listbox.Option
                       key={personIdx}
                       className={({ active }) => `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                             cursor-default select-none relative py-2 pl-10 pr-4`}
                       value={filter}
                     >
                         <>
                             {filter.split("_")[0]}
                         </>
                     </Listbox.Option>
                 ))
                 )}
               </Listbox.Options>
             </Transition>
           </div>
         </Listbox>
       </div>
     );
   }
   