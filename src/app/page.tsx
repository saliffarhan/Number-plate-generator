'use client'
import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'

export default function Home() {
  const [letters, setLetters] = useState('')
  const [digits, setDigits] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [showPlate, setShowPlate] = useState(false)
  const numberPlateRef = useRef(null)

  const handleLettersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '')
    setLetters(value)
  }

  const handleDigitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setDigits(value)
  }

  const downloadPlate = async () => {
    if (numberPlateRef.current) {
      const canvas = await html2canvas(numberPlateRef.current)
      const link = document.createElement('a')
      link.download = 'number-plate.png'
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const handleGenerate = () => {
    if (vehicleType && letters && digits) {
      setShowPlate(true)
    } else {
      alert('Please select any vehicle type')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 gap-6 bg-white">
      <img src="trafic.png" alt="police" className="w-[200px] sm:w-[250px] h-auto" />

      <h1 className="text-2xl sm:text-3xl font-black text-gray-700 text-center">Number Plate Generator</h1>
      <p className="text-sm sm:text-base bg-red-600 px-5 rounded-lg py-1 font-semibold text-center">Fill out your vehicle number</p>

      {/* Input Fields */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="XYZ"
          value={letters}
          onChange={handleLettersChange}
          maxLength={3}
          className="w-full border-[2px] border-blue-950 text-blue-950 px-4 py-2 rounded text-center uppercase"
        />
        <input
          type="text"
          placeholder="000"
          value={digits}
          onChange={handleDigitsChange}
          maxLength={4}
          className="w-full border-[2px] border-blue-950 text-blue-950 px-4 py-2 rounded text-center"
        />
      </div>

      <p className="text-sm sm:text-base bg-red-600 px-5 rounded-lg py-1 font-semibold text-center">Select any vehicle type</p>

      {/* Vehicle Type Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
        <button
          onClick={() => setVehicleType('car')}
          className={`bg-blue-950 text-white font-semibold py-3 md:px-20 rounded hover:rounded-xl hover:duration-200 ${vehicleType === 'car' ? 'ring-2 ring-blue-500' : ''
            }`}
        >
          Car
        </button>
        <button
          onClick={() => setVehicleType('bike')}
          className={`bg-blue-950 text-white font-semibold md:px-20 py-3 rounded hover:rounded-xl hover:duration-200 ${vehicleType === 'bike' ? 'ring-2 ring-green-700' : ''
            }`}
        >
          Bike
        </button>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="hover:border-[2px] hover:border-gray-950 bg-zinc-800 hover:duration-300 text-white hover:text-black hover:bg-white font-semibold px-16 py-3 rounded"
      >
        Generate
      </button>

      {/* Number Plate UI */}
      {showPlate && (
        <div className="flex flex-col items-center w-full">
          <div
            ref={numberPlateRef}
            className={`my-6 rounded-lg bg-white shadow-sm overflow-hidden w-full max-w-[280px] ${vehicleType === 'car'
              ? 'border border-black'
              : 'border-2 border-black'
              }`}
          >
            {vehicleType === 'car' && (
              <>
                <div className="w-full bg-white h-8 bg-[url('/sindh.webp')] bg-cover bg-center" />
                <div className="flex bg-white justify-between items-center w-full py-1 mt-3 px-6 text-3xl sm:text-4xl font-bold text-black">
                  <span>{letters}</span>
                  <div className="w-7 h-9">
                    <img
                      src="/quid.png"
                      alt="emblem"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span>{digits}</span>
                </div>
                <div className="bg-white text-gray-700 text-center text-base sm:text-lg font-semibold tracking-widest py-1">
                  SINDH
                </div>
              </>
            )}
            {vehicleType === 'bike' && (
              <div className="relative w-full max-w-[280px] sm:max-w-[240px] md:max-w-[300px] border overflow-hidden">

                {/* Ajrak + SINDH (top-left corner) */}
                <div className="absolute  flex flex-col items-center z-10">
                  <div className="w-10 h-16 lg:w-10 lg:h-16 sm:w-10 sm:h-11 bg-[url('/sindh.webp')] bg-cover bg-center rounded-md" />
                  <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-black lg:mt-5 mt-3">SINDH</span>
                </div>

                {/* Plate number content */}
                <div className="flex flex-col justify-center items-center py-3 px-4 h-[100px] sm:h-[120px]">
                  <span className="text-3xl sm:text-3xl font-bold text-black tracking-widest">{letters}</span>
                  <span className="text-3xl sm:text-3xl font-bold text-black tracking-widest">{digits}</span>
                </div>
              </div>
            )}




          </div>

          {/* Download Button */}
          <button
            onClick={downloadPlate}
            className="mt-4 bg-blue-950 text-white font-semibold px-10 py-3 rounded hover:rounded-xl hover:duration-200"
          >
            Download
          </button>
        </div>
      )}
    </div>
  )
}
