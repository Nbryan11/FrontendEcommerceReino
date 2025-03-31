
const backendDomain = "https://reino-dios-back.vercel.app/"
const SummaryApi = {
    SignUp  : {
        url : `${backendDomain}/api/sign-up`,
        method : "post"
    },

    SignIn: {
        url: `${backendDomain}/api/sign-in`,
        method : "post"
    },
    
    current_user:{
        url: `${backendDomain}/api/user-datails`,
        method: "get"
    },

    logOut:{
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUser : {
        url: `${backendDomain}/api/all-user`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    updateUserProfile: {
        url: `${backendDomain}/api/update-user-profile`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: "get"
    },
    demo:{
        url : `${backendDomain}/api/demo`,
        method: "get"
    }, 
    demoPost:{
        url: `${backendDomain}/api/demo-post`,
        method: "post"
    },
    categoryWiseProduct:{
        url: `${backendDomain}/api/category-product`,
        method: "post"
    },
    productDetails:{
        url: `${backendDomain}/api/product-details`,
        method: "post"
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: "post"

    },
    addToCartProductCount: {
        url: `${backendDomain}/api/countAddToCartProduct`,
        method: "get"
    },
    addToCartProductView: {
        url: `${backendDomain}/api/view-card-product`,
        method: "get"

    },
    updateCartProduct : {
        url : `${backendDomain}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        method : 'post'
    },
    shoppingHistory: {
        url: `${backendDomain}/api/payment`,
        method: 'post'
    },
    getHistoryShopping: {
        url: `${backendDomain}/api/shopping-history`,
        method: "get"
    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: "get"
    },
    reportMonthly: {
        url: `${backendDomain}/api/sales-report/monthly`,
        method: "get"
    },
    reportProducts: {
        url: `${backendDomain}/api/sales-report/products`,
        method: "get"
    },
    mantenimientoPreventivo:{
        url: `${backendDomain}/api/mantenimiento-preventivo`,
        method: 'post'
    },
    tareasTecnico: {
        url: `${backendDomain}/api/tareas-tecnico`,
        method: 'get'
    },
    deleteUser: {
        url: `${backendDomain}/api/delete-user`,
        method: 'delete'
    },
    allSupport: {
        url: `${backendDomain}/api/get-support`,
        method: 'get'
    },

    uploadComputer: {
        url: `${backendDomain}/api/upload-computer`,
        method: 'post' 
    },
    getComputer: {
        url: `${backendDomain}/api/get-computer`,
        method: 'get'
    },
    actualizarTarea: {
        url: `${backendDomain}/api/actualizarTarea`, // La URL base sin el parámetro `:id`
        method: 'put'
    },
     tareasCorrectivo: {
        url: `${backendDomain}/api/tareas-correctivo`,
        method: 'get'
     },
     filterProduct : {
        url : `${backendDomain}/api/filter-product`,
        method : 'post'
    }





}

export default SummaryApi