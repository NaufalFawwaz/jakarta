import React, { useState } from 'react'
import { kalender2025 } from '@/utils/data/kalender'

const bulanList = [
  'Januari', 'Februari', 'Maret', 'April',
  'Mei', 'Juni', 'Juli', 'Agustus',
  'September', 'Oktober', 'November', 'Desember'
]

const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

const kategoriStyle = {
  comedy: "bg-gradient-to-r from-red-500 to-red-400 text-white",
  concert: "bg-gradient-to-r from-blue-500 to-blue-400 text-white",
  theater: "bg-gradient-to-r from-green-500 to-green-400 text-white",
}

export default function Kalender() {
  const [bulanIndex, setBulanIndex] = useState(0)
  const bulanNama = bulanList[bulanIndex]
  const eventBulan = kalender2025[bulanNama] || []
  const jumlahHari = new Date(2025, bulanIndex + 1, 0).getDate()
  const semuaHari = Array.from({ length: jumlahHari }, (_, i) => {
    const tanggal = i + 1
    const hariKe = new Date(2025, bulanIndex, tanggal).getDay()
    const hariNama = hariList[hariKe]

    const events = eventBulan.filter(e => e.tanggal === tanggal)

    return {
      tanggal,
      hari: hariNama,
      events
    }
  })

  const nextBulan = () => {
    if (bulanIndex < bulanList.length - 1) setBulanIndex(bulanIndex + 1)
  }

  const prevBulan = () => {
    if (bulanIndex > 0) setBulanIndex(bulanIndex - 1)
  }

  return (
    <div className="min-h-screen bg-[#eaf7ff] flex flex-col items-center py-12 px-6">
      <div className="text-4xl font-extrabold text-center text-blue-800 mb-10">
        Schedule
      </div>

      <div className="flex items-center justify-between w-full max-w-3xl bg-sky-300 text-black font-bold rounded-sm overflow-hidden border border-blue-400">
        <button onClick={prevBulan} className="w-12 py-2 text-xl hover:bg-sky-400 border-r border-blue-400">&lt;</button>
        <div className="flex-1 text-center py-2 text-lg">{bulanNama} 2025</div>
        <button onClick={nextBulan} className="w-12 py-2 text-xl hover:bg-sky-400 border-l border-blue-400">&gt;</button>
      </div>

      <div className="w-full max-w-3xl border-x border-blue-400">
        {semuaHari.map((item, idx) => (
          <div key={idx} className="flex items-stretch border-t border-b border-black px-4 bg-[#eaf7ff]">
            <div className="w-1/4 font-bold border-r border-blue-300 flex flex-col justify-center items-center">
              <div>{item.tanggal}</div>
              <div className="text-sm">{item.hari}</div>
            </div>
            <div className="w-3/4 flex flex-col py-3 gap-2 pl-2">
              {item.events.length > 0 ? (
                item.events.map((ev, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${kategoriStyle[ev.kategori.toLowerCase()] || "bg-gray-300"}`}>
                      {ev.kategori}
                    </span>
                    <span className="text-pink-500 font-semibold text-sm">
                      {ev.waktu} {ev.nama}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-gray-400 italic text-sm">Tidak ada acara</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
