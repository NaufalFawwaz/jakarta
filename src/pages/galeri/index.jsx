import React, { useState } from 'react'
import galeriImages from '@/utils/data/galeri'

export default function Galeri() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Galeri</h1>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {galeriImages.map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt={img.alt}
            className="w-full rounded-lg cursor-pointer hover:opacity-90 transition"
            onClick={() => setSelectedImage(img.url)}
          />
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-3xl max-h-[90vh] overflow-auto">
            <img src={selectedImage} alt="Preview" className="rounded-lg shadow-lg" />
          </div>
        </div>
      )}
    </div>
  )
}
