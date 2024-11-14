'use client'
import React, { useState } from "react";
import dynamic from 'next/dynamic';

import { Upload } from ".";

const PdfEdit = dynamic(() => import("./PdfEdit"), { ssr: false});


function PdfEditer() {
  'use client'
  const [file, setFile] = useState<File | null>();
  const [scale, setScale] = useState<number>(0.3);

  const operMap = {
    "+": () => setScale(s => +(s + 0.1).toFixed(1)),
    "-": () => setScale(s => + +(s - 0.1).toFixed(1))
  }

  function onChangeScale(type: "+" | "-") {
    if (operMap[type]) operMap[type]();
  }

  function handleChange(file: File) {
    setFile(file);
  }

  return (
    <div>
      {file
        ? (
          <PdfEdit
            file={file}
            scale={scale}
            changeScale={onChangeScale}
            onRemove={() => setFile(null)}
          />
        )
        : <Upload changeFile={handleChange} /> }
    </div>
  )
}


export default PdfEditer
