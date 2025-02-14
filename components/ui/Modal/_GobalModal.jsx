

'use client'

import { Fragment, useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Popover,
  Tab,
  
  DialogBackdrop
} from '@headlessui/react'
import { ArrowLeftIcon } from 'lucide-react'
import {getNumberOfExercises, totalExercises} from '@/utils/tracksHelpers'

// import TrackWeekListItem from '@/components/workouts/TrackWeekListItem';
import clsx from 'clsx'


  const GlobalModal = ({open, setOpen, modalTitle, ctaName, modalContent, bg,bgTop, ...props}) =>{
    return <Dialog open={open} onClose={setOpen} className="relative  dark:bg-black !z-50 ">
             <DialogBackdrop  transition className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"  />
                <div className="fixed inset-0 z-40 flex">
                  <DialogPanel transition  className={clsx( bg ? bg :  "bg-white", "relative flex w-full max-w-screen transform flex-col overflow-y-auto  pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full")}>
                     <div className="flex px-4 pb-2 pt-5 bg-black !z-50 grid grid-cols-2 dark:divide-gray-600 dark:divide-gray-500 border-b pb-4 border-gray-900">
                       <div className="left inline-flex text-white hover:!text-orange-500 ">
                         <button  type="button"  onClick={() => setOpen(false)}  className="-m-2 inline-flex items-center justify-center rounded-md p-2" >
                            <span className="sr-only">Close menu</span>
                            <ArrowLeftIcon aria-hidden="true" className="h-8 w-8" /> 
                            <h2 id="modal-cta-heading" className="text-lg font-medium pl-2">
                            {ctaName ?? "Back"}
                         </h2>
                         </button>     
                       
                       </div>
                       <div className="center">
                          <h2 className="trackpage-subtitle text-lg font-medium text-slate-200 dark:text-white">
                          {modalTitle && modalTitle}
                        </h2>
                       </div>
                        
                   </div>
                        <div className={clsx(bgTop && bgTop, bg ? bg : " space-y-6 px-4 dark:bg-black")}>
                          <div aria-labelledby="reviews-heading" className="px-4 sm:mt-16 sm:mt-24 !flex-block">
                        
                            <div className="mt-6 space-y-10 divide-y divide-gray-200  dark:border-gray-400 pb-10">
                            {modalContent({ setOpen })}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
                </div>
            </Dialog>
  
  }

  export default GlobalModal