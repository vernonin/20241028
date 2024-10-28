'use client'
import Image from "next/image";

export default function Upload({ changeFile }: { changeFile: (file: File) => void }) {
  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const pdfFile = event.target.files?.[0];
    pdfFile && changeFile(pdfFile);
  }

  return (
    <div className="w-72 h-96 border border-dashed relative flex justify-center items-center bg-white">
      <input type="file" className="absolute inset-0 w-full h-full opacity-0" onChange={handleFile} />
      <div className="flex flex-col items-center gap-2">
        <Image width={30} height={30} src="upload.svg" alt="upload"></Image>
        <p className="text-sm text-gray-600">
          Click to upload or drag and drop
        </p>
      </div>
    </div>
  )
}