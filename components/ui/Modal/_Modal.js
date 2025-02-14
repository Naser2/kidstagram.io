'use client';

import { urlFor } from '@/sanity/lib/image';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

import { StarIcon } from 'lucide-react';
import clsx from 'clsx';
import { addTrack } from '@/utils/supabase/queries';

// import { useAppContext } from '@/app/context';

export const ModalInstance = ({ open, setOpen, track, user, userDetails, title , subtitle, userSTracks, trackName, trackId, callback})  => {
  console.log("MODAL NESTED MODAL OPENED")
  
  // const {userProfile} = useAppContext()
  console.log("track", track)
    // console.log('TracksModal_usern', user, "subscription", subscription)
  if (!open || !track) return console.log("NEXTED MODAL TrackDetailModal -->No Track Passed to TrackDetailModal");


  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative !z-50 ">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0 overflow-y-auto"
      />

      <div className="fixed inset-0 z-40 flex overflow-y-auto">
        <DialogPanel
          transition
          className="relative flex w-full max-w-screen transform flex-col overflow-y-auto bg-black pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full">
          <div className="absolute top-0 flex px-4 pb-2 pt-5 bg-black !z-50">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <ArrowLeftIcon aria-hidden="true" className="h-8 w-8 pb-2 text-white" />
            </button>
          </div>
      
         
          <section key={track._id} className="relative px-8 dark:border-gray-700 rounded-lg p-4 bg-zink-800 sm:px-12 lg:px-24" >
            
          <div className="h-full flex flex-col flex-1 w-full overflow-y-auto overflow-x-hidden">
    <div
      className="storage-container flex flex-grow"
      data-sentry-component="PageLayout"
      data-sentry-source-file="index.tsx"
    >
      <div
        className="flex h-full w-full items-center justify-center"
        data-sentry-component="ProductEmptyState"
        data-sentry-source-file="ProductEmptyState.tsx"
      >
        <div className="flex space-x-4 rounded border bg-surface-100 p-6 shadow-md">
          <div className="flex flex-col">
            <div className="w-80 space-y-4">
              <h5 className="text-foreground">Storage</h5>
              <div className="flex flex-col space-y-2 text-foreground-light">
                <p className="text-foreground-light text-sm">
                  Create buckets to store and serve any type of digital content.
                </p>
                <p className="text-foreground-light text-sm">
                  Make your buckets private or public depending on your security
                  preference.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  data-size="tiny"
                  type="button"
                  className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-alternative dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px]"
                >
                  <div className="[&_svg]:h-[14px] [&_svg]:w-[14px] text-foreground-lighter">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-external-link"
                    >
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                  </div>{" "}
                  <span className="truncate">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://supabase.com/docs/guides/storage"
                    >
                      About storage
                    </a>
                  </span>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

            <button
              onClick={() => setSelectedTrack(track)}
              className="mt-2 text-indigo-600 hover:underline">
              View More
            </button>
          </section>
         
        </DialogPanel>
      </div>
    </Dialog>
  );
};




