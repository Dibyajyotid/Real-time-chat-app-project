import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { X, Image, Send } from 'lucide-react'

const MessageInput = () => {

  const [text, setText] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const { sendMessage } = useChatStore()
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if(!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return        
    }

    const reader = new FileReader()
    reader.onloadend = () => {
        setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    if(fileInputRef.current) fileInputRef.current.value = "";
  }

  const handleSendMessage = async(e) => {
    e.preventDefault()
    if(!text.trim() && !imagePreview) return;
    try {
        await sendMessage({
            text: text.trim(),
            image: imagePreview,
        })

        //clear Form
        setText("")
        setImagePreview(null)
        if(fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
        console.error("Failed to send message", error)
    }
  }

  return (
    <div className='p-4 w-full'>
        {imagePreview && (
            <div className='mb-3 flex items-center gap-2'>
                <div className='relative'>
                    <img src={imagePreview} alt='Preview' className='size-20 object-cover rounded-lg border border-zinc-700'/>
                    <button onClick={removeImage} className='absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center' type='button'>
                        <X className='size-3' />
                    </button>
                </div>
            </div>
        )}

        <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
            <div className='flex-1 flex gap-2'>
                <input type='text' className='w-full input input-bordered rounded-lg input-sm sm:input-md' placeholder='Type a Message...' value={text} onChange={(e) => setText(e.target.value)}/>
                <input type='file' accept='image/*' className='hidden' ref={fileInputRef} onChange={handleImageChange}/>
                <button type='button' className={`hidden sm:flex bg-orangy btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`} onClick={() => fileInputRef.current?.click()}>
                    <Image size={20}/>
                </button>
            </div>

            {/* Send button */}
            <button type='submit' className='bg-orangy btn btn-sm btn-circle' disabled={!text.trim() && !imagePreview}>
                <Send className='text-slate-400' size={20}/>
            </button>
        </form>  
    </div>
  )
}

export default MessageInput