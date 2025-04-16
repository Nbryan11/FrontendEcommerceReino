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

  const fetchProduct = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.searchProduct.url + query.search)
    const dataResponse = await response.json()
    setLoading(false)
    setData(dataResponse.data)

    // Extraer los brandName únicos
    const uniqueBrands = [...new Set(dataResponse.data.map(item => item.brandName))]
    setBrands(uniqueBrands)
  }

  useEffect(() => {
    fetchProduct()
  }, [query])

  // Filtrar productos por brand seleccionado
  const filteredData = selectedBrand
    ? data.filter(item => item.brandName === selectedBrand)
    : data

  return (
    <div className='container mx-auto p-4'>
      {loading && <p className='text-lg text-center'>Loading.....</p>}

      <p className='text-lg font-semibold my-3'>
        Search Results: {filteredData.length}
      </p>

      {data.length === 0 && !loading && <p>No Data Found....</p>}

      {data.length !== 0 && !loading && (
        <>
          <div className="my-4">
            <label className="mr-2 font-medium text-gray-700">Filtrar por marca:</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="">Todas las marcas</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <VerticalCard data={filteredData} loading={loading} />
        </>
      )}
    </div>
  )
}

export default SearchProduct
