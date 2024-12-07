import React from 'react'
import { MessageSquare } from 'lucide-react'

const NoChatSelected = () => {
  return (
    <div className='w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50'>
        <div className='max-w-md text-center space-y-6'>
            {/* Icon Display */}
            <div className='flex justify-center gap-4 mb-4'>
                <div className='size-16 rounded-2xl bg-orangy flex items-center justify-center animate-bounce'>
                    <MessageSquare className='size-8 text-white' />
                </div>
            </div>
        </div>

        {/* Welcome Text */}
        <h2 className='text-2xl font-bold'>Welcome...</h2>
        <p className='text-base-content/60'>
            Select a conversation to start chatting
        </p>
    </div>
  )
}

export default NoChatSelected