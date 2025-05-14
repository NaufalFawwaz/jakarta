import React, { useState } from 'react'
import { kalender2025 } from '@/utils/data/kalender'

const bulanList = [
  'Januari', 'Februari', 'Maret', 'April',
  'Mei', 'Juni', 'Juli', 'Agustus',
  'September', 'Oktober', 'November', 'Desember'
]

const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

const kategoriStyle = {
  COMEDY: "bg-red-500 text-white",
  Concert: "bg-blue-500 text-white",
  Theater: "bg-green-500 text-white",
}

export default function Kalender() {
  const [bulanIndex, setBulanIndex] = useState(4)

  const bulanNama = bulanList[bulanIndex]
  const eventBulan = kalender2025[bulanNama] || []

  const jumlahHari = new Date(2025, bulanIndex + 1, 0).getDate()

  const semuaHari = Array.from({ length: jumlahHari }, (_, i) => {
    const tanggal = i + 1
    const hariKe = new Date(2025, bulanIndex, tanggal).getDay()
    const hariNama = hariList[hariKe]
    const events = eventBulan.filter(e => e.tanggal === tanggal)
    return { tanggal, hari: hariNama, events }
  })

  const nextBulan = () => bulanIndex < 11 && setBulanIndex(bulanIndex + 1)
  const prevBulan = () => bulanIndex > 0 && setBulanIndex(bulanIndex - 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 p-6">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">Schedule</h1>

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={prevBulan}
            className="w-10 h-10 bg-blue-400 cursor-pointer text-white rounded-full text-xl shadow hover:bg-blue-500"
          >
            &lt;
          </button>
          <h2 className="text-xl font-semibold text-blue-900">{bulanNama} 2025</h2>
          <button
            onClick={nextBulan}
            className="w-10 h-10 bg-blue-400 cursor-pointer text-white rounded-full text-xl shadow hover:bg-blue-500"
          >
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
          {semuaHari.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-300 hover:scale-[1.02] transition"
            >
              <div className="mb-2">
                <div className="text-sm text-gray-500">{item.hari}</div>
                <div className="text-lg font-bold text-blue-700">{item.tanggal}</div>
              </div>

              <div className="space-y-1">
                {item.events.length > 0 ? (
                  item.events.map((ev, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${kategoriStyle[ev.kategori] || "bg-gray-300 text-black"}`}
                      >
                        {ev.kategori}
                      </span>
                      <span className="text-sm text-pink-600 font-medium">
                        {ev.waktu} {ev.nama}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-300 italic text-sm">Tidak ada acara</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}