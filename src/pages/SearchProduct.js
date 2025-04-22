import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
  const query = useLocation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState('')
  const [brands, setBrands] = useState([])
  const [selectedPriceRange, setSelectedPriceRange] = useState('')
  const [selectedRam, setSelectedRam] = useState('')
  const [selectedStorage, setSelectedStorage] = useState('')

  const fetchProduct = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.searchProduct.url + query.search)
    const dataResponse = await response.json()
    setLoading(false)
    setData(dataResponse.data)

    // Extraer brandName únicos
    const uniqueBrands = [...new Set(dataResponse.data.map(item => item.brandName))]
    setBrands(uniqueBrands)
  }

  useEffect(() => {
    fetchProduct()
  }, [query])

  const priceRanges = [
    { label: 'Hasta $100.000', min: 0, max: 100000 },
    { label: '$100.000 a $250.000', min: 100000, max: 250000 },
    { label: 'Más de $250.000', min: 250000, max: Infinity },
  ]

  // Filtrar productos por marca, precio, RAM y almacenamiento
  const filteredData = data.filter(item => {
    const matchesBrand = selectedBrand ? item.brandName === selectedBrand : true
    const matchesPrice = selectedPriceRange
      ? (item.price >= selectedPriceRange.min && item.price < selectedPriceRange.max)
      : true
    const matchesRam = selectedBrand === 'Celulares' && selectedRam
      ? item.attributes?.RAM === selectedRam
      : true
    const matchesStorage = selectedBrand === 'Celulares' && selectedStorage
      ? item.attributes?.Almacenamiento === selectedStorage
      : true

    return matchesBrand && matchesPrice && matchesRam && matchesStorage
  })

  return (
    <div className='container mx-auto px-4 overflow-hidden'>
      {loading && <p className='text-lg text-center'>Loading.....</p>}

      {data.length === 0 && !loading && <p>No Data Found....</p>}

      {data.length !== 0 && !loading && (
        <div className="flex gap-6">
          {/* Menú de filtros */}
          <div className="w-64 p-4 border rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Filtros</h2>

            {/* Subcategorías */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Subcategorías</h3>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value)
                  setSelectedRam('')
                  setSelectedStorage('')
                }}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Todas las subcategorías</option>
                {brands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Precio */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Precio</h3>
              <div className="flex flex-col gap-2">
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPriceRange(range)}
                    className={`text-left px-3 py-2 rounded hover:bg-gray-100 ${
                      selectedPriceRange.label === range.label ? 'bg-gray-200 font-semibold' : ''
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedPriceRange('')}
                  className="text-blue-500 text-sm mt-2 hover:underline"
                >
                  Limpiar filtro de precio
                </button>
              </div>
            </div>

            {/* Filtros especiales para Celulares */}
            {selectedBrand === 'Celulares' && (
              <div className="mt-6">
                <h3 className="font-medium mb-2">RAM</h3>
                <select
                  value={selectedRam}
                  onChange={(e) => setSelectedRam(e.target.value)}
                  className="w-full px-3 py-2 border rounded mb-4"
                >
                  <option value="">Todas</option>
                  {[...new Set(data
                    .filter(item => item.brandName === 'Celulares')
                    .map(item => item.attributes?.RAM)
                  )].map((ram, index) => (
                    <option key={index} value={ram}>
                      {ram} GB
                    </option>
                  ))}
                </select>

                <h3 className="font-medium mb-2">Almacenamiento</h3>
                <select
                  value={selectedStorage}
                  onChange={(e) => setSelectedStorage(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Todos</option>
                  {[...new Set(data
                    .filter(item => item.brandName === 'Celulares')
                    .map(item => item.attributes?.Almacenamiento)
                  )].map((storage, index) => (
                    <option key={index} value={storage}>
                      {storage} GB
                    </option>
                  ))}
                </select>

                {/* Botón para limpiar filtros de RAM y Almacenamiento */}
                {(selectedRam || selectedStorage) && (
                  <button
                    onClick={() => {
                      setSelectedRam('')
                      setSelectedStorage('')
                    }}
                    className="text-blue-500 text-sm mt-2 hover:underline"
                  >
                    Limpiar filtros de RAM y Almacenamiento
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Productos */}
          <div className="flex-1">
            <p className='text-lg font-semibold mb-4'>
              Resultados: {filteredData.length}
            </p>

            <VerticalCard data={filteredData} loading={loading} />
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchProduct

