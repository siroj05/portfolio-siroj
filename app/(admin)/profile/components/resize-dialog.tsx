"use client"

import "react-image-crop/dist/ReactCrop.css"
import ReactCrop, { centerCrop, makeAspectCrop, PixelCrop, type Crop } from 'react-image-crop'
import { useEffect, useRef, useState } from "react";
import { ResizeImgDialog } from "./dialog";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface Props {
    setCropped : (value : File) => void
}

export default function ResizeToolsDialog({setCropped}:Props) {

    const [crop, setCrop] = useState<Crop>({
        unit: "px",
        width: 200,   // fix lebar
        height: 200,  // fix tinggi
        x: 0,
        y: 0
    })

    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [file, setFile] = useState<File>()
    const imgRef = useRef<HTMLImageElement>(null)
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const [error, setError] = useState<string>("")
    const [openDialog, setOpenDialog] = useState(false)

    // render hasil crop ke canvas
    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) return

        const image = imgRef.current
        const canvas = previewCanvasRef.current
        const crop = completedCrop

        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const pixelRatio = window.devicePixelRatio
        canvas.width = crop.width * pixelRatio
        canvas.height = crop.height * pixelRatio

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        ctx.imageSmoothingQuality = "high"

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )
    }, [completedCrop, file])

    const handleCancel = () => {
        setOpenDialog(false)
        setFile(undefined)
        setCrop({
            unit: "px",
            width: 200,
            height: 200,
            x: 0,
            y: 0,
        })
        setCompletedCrop(undefined)
        setError("")
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0]
        if (!selected) return

        const img = new Image()
        img.src = URL.createObjectURL(selected)

        img.onload = () => {
            if (img.naturalWidth < 200 || img.naturalHeight < 200) {
                setError("Min image size 200x200 Pixel")
                setFile(undefined)
            } else {
                setError("")
                setFile(selected)
            }
        }
    }
    const handleSaveCrop = () => {
        if (!previewCanvasRef.current) return
        previewCanvasRef.current.toBlob((blob) => {
            if (!blob) return
            const file = new File([blob], "cropped-image.png", { type: "image/png" })
            setCropped(file)
        }, "image/png")
    }

    return (
        <ResizeImgDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            handleCancel={handleCancel}
            footer={
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={handleCancel} variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleSaveCrop}>Save</Button>
                </DialogFooter>
            }
        >
            <div>
                <div className="flex justify-center">
                    {file &&
                        <ReactCrop crop={crop} onChange={c => setCrop({ ...crop, x: c.x, y: c.y })} onComplete={(c) => setCompletedCrop(c)} locked>
                            <img ref={imgRef} src={URL.createObjectURL(file)} className="w-[200px] h-[230px]"/>
                        </ReactCrop>
                    }
                </div>
                {!file && <div className="w-full">
                    <input
                        type="file"
                        accept="image/*"
                        id="profile"
                        className="hidden"
                        onChange={(e) => handleFileChange(e)}
                    />
                    <label htmlFor="profile" className="flex justify-center items-center h-[300px] border-dashed border-2 hover:bg-zinc-900 cursor-pointer">
                        <Camera />
                    </label>
                    <p className="text-xs text-red-500">{error}</p>
                </div>}
            </div>
            {/* canvas hasil crop (hidden atau bisa ditampilkan untuk debug) */}
            <canvas
                ref={previewCanvasRef}
                className="hidden"
            ></canvas>
        </ResizeImgDialog>
    )
}