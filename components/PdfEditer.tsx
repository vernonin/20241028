'use client'
import React, { useState } from "react";

import Image from "next/image";
import { pdfjs, Document, Page } from 'react-pdf';
import { Upload } from ".";
import type { PDFDocumentProxy } from 'pdfjs-dist';
type PdfEditProps = {
  file: File;
  onRemove: () => void;
}
type PdfPageProps = {
  pageNum: number;
  scale?: number;
  rotate?: number;
  onRotate: (pageNum: number) => void;
}
interface IPages {
  pageNum: number;
  rotate: number;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const sMap = {
  "1": "80px",
  "2": "150px",
  "3": "200px",
  "4": "260px",
  "5": "340px",
  "6": "400px",
  "7": "460px",
}

const rotateMap = {
  "0": "rotate-0 transition-all",
  "90": "rotate-[90deg] transition-all ",
  "180": "rotate-[180deg] transition-all ",
  "270": "rotate-[270deg] transition-all ",
  "360": "rotate-[360deg] transition-all ",
}


function PdfPage({ pageNum, scale = 0.3, rotate = 0, onRotate }: PdfPageProps) {
  return (
    <div
      // @ts-ignore
      style={{maxWidth: sMap[(scale * 10)], flex: "0 0 200px"}}
      className="m-3 bg-white px-2 pt-2 pb-10 relative cursor-pointer"
      onClick={() => onRotate(pageNum)}
    >
      <div className="w-full h-full overflow-hidden">
        <Page
          // @ts-ignore
          className={"w-full " + rotateMap[''+rotate]}
          scale={scale}
          loading="加载中"
          renderAnnotationLayer={false}
          renderTextLayer={false}
          pageNumber={pageNum}
        />
        <div className="absolute right-[4px] top-[4px] p-1 rounded-full hover:scale-105 bg-[#ff612f]">
          <svg className="w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"></path></svg>
        </div>
        <p className="absolute inset-x-0 bottom-0 h-10 leading-10 text-center text-xs italic">
          {pageNum}
        </p>
      </div>
    </div>
  )
}

function PdfEdit({file, onRemove }: PdfEditProps) {
  const [pages, setPages] = useState<IPages[]>([]);
  const [scale, setScale] = useState<number>(0.3);
  const [scaleMin, scaleMax] = [0.1, 0.7];

  function docLoadSuccess({ numPages }: PDFDocumentProxy) {
    const pageList = Array.from({length: numPages}, (_, i) => ({
      pageNum: i + 1,
      rotate: 0,
    }))

    setPages(pageList);
  }

  function _rotate(deg: number) {
    if (deg > 360) {
      return 90;
    }
    return deg + 90;
  }

  function onRotate(pageNum: number) {
    setPages(pages => pages.map(v => ({...v, rotate: pageNum === v.pageNum ? _rotate(v.rotate) : v.rotate})))
  }

  function onRotateAll() {
    setPages(pages => pages.map(v => ({...v, rotate: _rotate(v.rotate)})))
  }

  function onAmplify() {
    setScale(s => +Math.min(s + 0.1, scaleMax).toFixed(1));
  }

  function onReduce() {
    setScale(s => +Math.max(s - 0.1, scaleMin).toFixed(1));
  }

  return (
    <div className="">
      <div className="flex justify-center mb-6 space-x-4">
        <button
          className="px-4 py-2 rounded text-white bg-[rgb(255,97,47)]"
          onClick={onRotateAll}
        >
          Rotate all
        </button>
        <button
          className="px-4 py-2 rounded text-white bg-[rgb(10,10,20)]"
          onClick={onRemove}
        >
          Remove PDF
        </button>
        <button
          className="p-2 flex justify-center items-center rounded-full shadow-md bg-white disabled:bg-gray-50"
          onClick={onAmplify}
          disabled={scale >= scaleMax}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"></path></svg>
        </button>
        <button
          className="p-2 flex justify-center items-center rounded-full shadow-md bg-white disabled:bg-gray-50"
          onClick={onReduce}
          disabled={scale <= scaleMin}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"></path></svg>
        </button>
      </div>
      <Document file={file} onLoadSuccess={docLoadSuccess}>
        <div className="w-[80vw] flex flex-wrap justify-center">
          {pages.map(page => <PdfPage key={page.pageNum} {...page} scale={scale} onRotate={onRotate} />)}
        </div>
      </Document>
    </div>
  )
}

export default function PdfEditer() {
  'use client'
  const [file, setFile] = useState<File | null>();

  function handleChange(file: File) {
    setFile(file);
  }
  return (
    <div>
      {file
        ? <PdfEdit file={file} onRemove={() => setFile(null)} />
        : <Upload changeFile={handleChange} /> }
    </div>
  )
}

