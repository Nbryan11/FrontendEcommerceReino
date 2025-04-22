import React from 'react'

function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
          
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
              El Reino de Dios
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/about" className="hover:underline me-4 md:me-6">Sobre Nosotros</a>
            </li>
            <li>
              <a href="/politicas-privacidad" className="hover:underline me-4 md:me-6">Política de Privacidad</a>
            </li>
            <li>
              <a href="/terminos-condiciones" className="hover:underline me-4 md:me-6">Términos y Condiciones</a>
            </li>
            <li>
              <a href="/contacto" className="hover:underline">Contacto</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025 <a href="/" className="hover:underline font-semibold">El Reino de Dios™</a>. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  )
}

export default Footer
