"use client"

import type React from "react"

import { useRef, useState } from "react"

interface FileUploadSectionProps {
  includeFile: boolean
  setIncludeFile: (value: boolean) => void
  file: File | null
  setFile: (file: File | null) => void
}
import Image from "next/image"

export default function FileUploadSection({ includeFile, setIncludeFile, file, setFile }: FileUploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFile(selectedFile)
    }
  }

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile)
    setIncludeFile(true)

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreviewUrl(null)
    }
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFile(droppedFile)
    }
  }

  const removeFile = () => {
    setFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="mb-4 overflow-hidden rounded-sm border border-[#E0E0E0] transition-all">
      <div className="bg-white p-2.5 hover:bg-gray-50">
        <label className="flex cursor-pointer items-center gap-2 text-sm ">
          <input
            type="checkbox"
            checked={includeFile}
            onChange={(e) => {
              setIncludeFile(e.target.checked)
              if (!e.target.checked) {
                removeFile()
              }
            }}
            className="size-3 cursor-pointer"
          />
          Upload File
        </label>
      </div>

      {includeFile && (
        <div className="border-t border-[#E0E0E0] p-4">
          {!file ? (
            <div className="mt-3">
              <label
                htmlFor="fileInput"
                className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-8 transition-colors ${
                  isDragging ? "border-[#02C5AF]" : "border-[#E5E5E5]"
                } hover:border-[#02C5AF]`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <svg
                  className="mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="90"
                  height="90"
                  viewBox="0 0 341 246"
                  fill="none"
                >
                  <path
                    d="M155 246H85.25C61.69 246 41.5917 237.954 24.955 221.861C8.31833 205.666 0 185.935 0 162.667C0 142.68 6.045 124.845 18.135 109.163C30.3283 93.48 46.2417 83.4862 65.875 79.1812C72.385 55.6062 85.3017 36.5412 104.625 21.9862C124.052 7.32875 146.01 0 170.5 0C200.777 0 226.403 10.455 247.38 31.365C268.46 52.1725 279 77.5925 279 107.625C296.877 109.675 311.653 117.362 323.33 130.688C335.11 143.808 341 159.183 341 176.812C341 196.082 334.232 212.431 320.695 225.859C307.158 239.286 290.677 246 271.25 246H186V136.069L210.8 159.9L232.5 138.375L170.5 76.875L108.5 138.375L130.2 159.9L155 136.069V246Z"
                    fill="#394253"
                  ></path>
                </svg>
                <span>Choose a file to upload</span>
                <input ref={fileInputRef} type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          ) : (
            <div className="mt-3 rounded-md bg-[#F2F2F2] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold text-[#4F4F4F]">{file.name}</span>
                <button
                  type="button"
                  onClick={removeFile}
                  className="border-none bg-transparent text-sm text-[#4F4F4F] opacity-70 transition-opacity hover:opacity-100"
                >
                  Remove
                </button>
              </div>
              {previewUrl ? (
                <Image
                  width={200}
                  height={200}
                  src={previewUrl || "/placeholder.svg"}
                  alt="File preview"
                  className="max-h-[200px] max-w-full object-contain"
                />
              ) : (
                <div className="text-sm text-[#4F4F4F]">
                  File type: {file.type || "Unknown"}
                  <br />
                  Size: {(file.size / 1024).toFixed(2)} KB
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
