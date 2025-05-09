  import React, { useState } from "react";
  import { MdClose } from "react-icons/md";
  import productCategory from "../helpers/productCategory";
  import { FaCloudUploadAlt } from "react-icons/fa";
  import uploadImage from "../helpers/uploadImage";
  import DisplayImage from "./DisplayImage";
  import { MdDelete } from "react-icons/md";
  import SummaryApi from "../common";
  import { toast } from "react-toastify";

  const UploadProduct = ({
    //se traer de la clase padre que lo llama para cerrar la ventana
    onClose,
    fetchData,
  }) => {
    const [data, setData] = useState({
      productName: "",
      brandName: "",
      category: "",
      productImage: [],
      description: "",
      price: "",
      sellingPrice: "",
      licenseIdsInput: "",
      link: "",
      attributes: {},

    });
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [subcategories, setSubcategories] = useState([]);
    const [attributeFields, setAttributeFields] = useState([]);

    const attributesBySubcategory = {
      Celulares: ["RAM", "Almacenamiento", "Batería"],
      Computadoras: ["RAM", "Almacenamiento", "Procesador"],
      Accesorios: ["Compatibilidad"],
    };


    //funcion utilizada para tomar los valores de los inpunt y guardarlos en data mediante setData()
    const handleOnChange = (e) => {
      const { name, value } = e.target;
    
      if (name === "category") {
        const selectedCategory = productCategory.find((cat) => cat.value === value);
        setSubcategories(selectedCategory?.subcategories || []);
        setAttributeFields([]); // Limpiar atributos si cambias de categoría
    
        setData((preve) => ({
          ...preve,
          [name]: value,
          brandName: "",
          attributes: {}, // Resetear atributos
        }));
    
      } else if (name === "brandName") {
        const attributes = attributesBySubcategory[value] || [];
        setAttributeFields(attributes);
    
        setData((preve) => ({
          ...preve,
          [name]: value,
          attributes: {}, // Resetear atributos cuando cambia subcategoría
        }));
    
      } else {
        setData((preve) => ({
          ...preve,
          [name]: value,
        }));
      }
    };
    

    const handleUploadProduct = async (e) => {
      const file = e.target.files[0];

      const uploadImageCloudinary = await uploadImage(file);

      //guardar mas imagenes al array productImage
      setData((preve) => {
        return {
          ...preve,
          productImage: [...preve.productImage, uploadImageCloudinary.url],
        };
      });
    };

    //funcion para eliminar una imagen precargada en el panel de uploadProduct
    const handleDeleteProductImage = async (index) => {
      const newProductImage = [...data.productImage];
      newProductImage.splice(index, 1);

      setData((preve) => {
        return {
          ...preve,
          productImage: [...newProductImage],
        };
      });
    };

    {
      /***submit upload product */
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData?.message);
        onClose();
        fetchData();
      }

      if (responseData.error) {
        toast.error(responseData?.message);
      }
    };
    return (
      <div className="fixed w-full h-full bg-slate-500 bg-opacity-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
          <div className="flex justify-between items-center pb-3">
            <h2 className="font-bold text-lg"></h2>
            upload product
            <div
              className="w-fit ml-auto text-2xl hover:text-blue-600 cursor-pointer"
              onClick={onClose}
            >
              <MdClose />
            </div>
          </div>
          <form
            className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
            onSubmit={handleSubmit}
          >
            <label htmlFor="productName">Product Name: </label>
            <input
              type="text"
              id="productName"
              placeholder="enter product name"
              name="productName"
              required
              value={data.productName}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
            />

            <label htmlFor="category" className="mt-3">
              Category :
            </label>
            <select
              required
              value={data.category}
              name="category"
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
            >
              <option value={""}>Select Category</option>
              {productCategory.map((el, index) => {
                return (
                  <option value={el.value} key={el.value + index}>
                    {el.label}
                  </option>
                );
              })}
            </select>

            <label htmlFor="brandName" className="mt-3">
              Subcategoria:{" "}
            </label>
            <label htmlFor="brandName" className="mt-3">
              Subcategoría:{" "}
            </label>
            <select
              id="brandName"
              required
              name="brandName"
              value={data.brandName}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
            >
              <option value={""}>Select Subcategory</option>
              {subcategories.map((subcat, index) => (
                <option value={subcat} key={subcat + index}>
                  {subcat}
                </option>
              ))}
            </select>

            {attributeFields.length > 0 && (
  <>
    <h3 className="font-bold mt-4">Atributos del Producto:</h3>
    {attributeFields.map((attr, idx) => (
      <div key={idx}>
        <label className="block mt-2">{attr}:</label>
        <input
          type="text"
          className="p-2 bg-slate-100 border rounded w-full"
          placeholder={`Ingrese ${attr}`}
          value={data.attributes[attr] || ""}
          onChange={(e) => {
            const { value } = e.target;
            setData((preve) => ({
              ...preve,
              attributes: {
                ...preve.attributes,
                [attr]: value,
              },
            }));
          }}
        />
      </div>
    ))}
  </>
)}

            <label htmlFor="productImage" className="mt-3">
              Product Image :
            </label>
            <label htmlFor="uploadImageInput">
              <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                  <span className="text-4xl">
                    <FaCloudUploadAlt />
                  </span>
                  <p className="text-sm">Upload Product Image</p>
                  <input
                    type="file"
                    id="uploadImageInput"
                    className="hidden"
                    onChange={handleUploadProduct}
                  />
                </div>
              </div>
            </label>

            <div>
              {data?.productImage[0] ? (
                <div className="flex items-center gap-2">
                  {data.productImage.map((el, index) => {
                    return (
                      <div className="relative group">
                        <img
                          src={el}
                          alt={el}
                          width={80}
                          height={100}
                          className="bg-slate-100 cursor-pointer"
                          onClick={() => {
                            setOpenFullScreenImage(true);
                            setFullScreenImage(el);
                          }}
                        />
                        <div
                          onClick={() => handleDeleteProductImage(index)}
                          className="cursor-pointer absolute bottom-0 right-0 p-1 text-white bg-blue-600 rounded-full hidden group-hover:block   "
                        >
                          <MdDelete />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-blue-600 text-xs">upload product</p>
              )}
            </div>
            <label htmlFor="price">Precio: </label>
            <input
              type="number"
              id="price"
              placeholder="enter product price"
              name="price"
              value={data.price}
              onChange={handleOnChange}
              required
              className="p-2 bg-slate-100 border rounded"
            />

            <label htmlFor="sellingPrice    ">Selling Price: </label>
            <input
              type="number"
              id="sellingPrice"
              placeholder="enter product price"
              name="sellingPrice"
              value={data.sellingPrice}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
            />

            <label htmlFor="description" className="mt-3">
              Description :
            </label>
            <textarea
              className="h-28 bg-slate-100 border resize-none p-1"
              placeholder="enter product description"
              rows={3}
              onChange={handleOnChange}
              name="description"
              value={data.description}
            ></textarea>
            <label htmlFor="licenseIdsInput" className="mt-3">
              License IDs (separated by commas):
            </label>
            <input
              type="text"
              id="licenseIdsInput"
              placeholder="Enter license IDs"
              name="licenseIdsInput"
              value={data.licenseIdsInput}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
            />

            <label htmlFor="link" className="mt-3">
              Link:
            </label>
            <input
              type="text"
              id="link"
              placeholder="Enter link"
              name="link"
              value={data.link}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
            />

            <button className="px-3 py-2 bg-blue-600 text-white mb-10 hover:bg-blue-700">
              Upload Product
            </button>
          </form>
        </div>
        {/**mostrar la imagen completa */}
        {openFullScreenImage && (
          <DisplayImage
            onClose={() => setOpenFullScreenImage(false)}
            imgUrl={fullScreenImage}
          />
        )}
      </div>
    );
  };

  export default UploadProduct;
