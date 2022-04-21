import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import './DropZone.css'

const DropZone = () => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "audio/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map( file => {
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        })
      )
    }
  })


  return (
    <div className="dropZone">
      <div { ...getRootProps() }>
        <input { ...getInputProps() } />
        <p>Drop Files Here</p>
      </div>
      <div>{ songs }</div>
    </div>
  )
}

export default DropZone
