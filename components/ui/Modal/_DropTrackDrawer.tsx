"use client"

import * as React from "react"
// import { toast } from 'sonner';
import { toast } from 'sonner';

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import clsx from "clsx"

import { WarningOutlineIcon } from "@sanity/icons";
import { Input } from "../input";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]
interface DropTrackDrawer {
  modalName: string; // Define this as a string
  title?: string; // Define this as a string
  subtitle?: string; // Define this as an optional string
  CustomClass: string; // Define this as a string
  content: React.ReactNode; // Use ReactNode for content
  fullScreen: boolean; // Define this as a boolean
  midScreen: boolean; // Define this as a boolean
  track:any,
  callback?: (userId: string) => Promise<any>;
  userId: string; // Assuming you need the `userId` passed to the callback
}

export function DropTrackDrawer({ track,userId, title, subtitle, modalName, CustomClass, content, fullScreen,midScreen,  callback }: DropTrackDrawer) {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  const handleDropTrack = async () => {
    if (callback) {
      const result = await callback(userId);
      if (result.type === 'error') {
        // Trigger toast on error
        toast.error("Error: " + result.message)
        // toast.error(result.message, {
        //   position: toast.POSITION.TOP_CENTER,
        // });
      } else {
        toast.success(result.message)
        // Trigger toast on success
        // toast.success('Track dropped successfully!', {
        //   position: toast.POSITION.TOP_CENTER,
        // });
      }
    }
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="themeButton">{modalName ?? "No Title"}</Button>
      </DrawerTrigger>
      <DrawerContent className={clsx(fullScreen && "!bg-black fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background h-[90vh]", midScreen && "!bg-black fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background h-[65vh]" )}>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            {/* <DrawerTitle>{title ?? ""}</DrawerTitle> */}
            {/* <DrawerDescription>{subtitle ?? "Set your daily activity goal."}</DrawerDescription> */}
          </DrawerHeader>
      <div className="move-goal"> 
       <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
             
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter track-title">
                 <span className="text-[var(--fgColor-attention)] pr-2">Droping 
                  </span>{track.title}
                </div>     
                <div className="flex justify-center text-[var(--fgColor-attention)] mt-4 ">  
                  <WarningOutlineIcon className="h-12 w-12 bg-yellow-400/20 rounded-full p-1 justify-center"/> </div>         
               
               <div className="text-[0.99rem] text-gray-300 py-4 text-[var(--fgColor-attention)]">
             This action can not be undone. Youll will also lose stats associated with this track.
                </div>
               {/*   <div className="text-7xl font-bold tracking-tighter track-title">
                 DROP {track.name}
                </div> */}
              </div>
           
            </div>
            <div className="mt-3 h-[120px]">
            <Input
                  type="caption"
                  id="caption"
                  placeholder="Write a caption..."
                  {...field}
                />
              <Input 
                className="relative bg-cover bg-center w-full h-full rounded-lg"
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${urlFor(track.images[0]).url()})`,
                }}
              />
            </div> 
          </div>
              </div> 
        
          <DrawerFooter>
          <Button className="bg-[var(--fgColor-danger)] text-black hover:bg-[var(--label-orange-fgColor-rest)]" onClick={handleDropTrack}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
