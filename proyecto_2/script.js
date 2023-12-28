document.addEventListener('DOMContentLoaded', function () {
  const products = [
    {
      name: 'HP Essentials 255 G8 AMD',
      price: 289,
      stars: 4,
      reviews: 250,
      seller: 'PcComponentes',
      image:
        'https://thumb.pccomponentes.com/w-300-300/articles/1005/10057282/1639-hp-essential-255-g8-amd-3020e-8gb-256gb-ssd-156.jpg'
    },
    {
      name: 'Dell Inspiron 15',
      price: 549,
      stars: 4.5,
      reviews: 180,
      seller: 'Amazon',
      image: 'https://placekitten.com/300/300' // Imagen de ejemplo, reutilizando la misma imagen
    },
    {
      name: 'Lenovo Ideapad 3',
      price: 399,
      stars: 4.2,
      reviews: 200,
      seller: 'BestBuy',
      image: 'https://placekitten.com/301/301'
    },
    {
      name: 'Asus VivoBook 14',
      price: 479,
      stars: 4.7,
      reviews: 150,
      seller: 'Newegg',
      image: 'https://placekitten.com/302/302'
    },
    {
      name: 'Acer Swift 3',
      price: 649,
      stars: 4.0,
      reviews: 120,
      seller: 'Walmart',
      image: 'https://placekitten.com/303/303'
    },
    {
      name: 'MSI Modern 14',
      price: 799,
      stars: 4.8,
      reviews: 300,
      seller: 'MicroCenter',
      image: 'https://placekitten.com/304/304'
    },
    {
      name: 'Apple MacBook Air',
      price: 999,
      stars: 4.9,
      reviews: 500,
      seller: 'Apple Store',
      image: 'https://placekitten.com/305/305'
    },
    {
      name: 'Google Pixelbook Go',
      price: 649,
      stars: 4.3,
      reviews: 250,
      seller: 'Google Store',
      image: 'https://placekitten.com/306/306'
    },
    {
      name: 'Samsung Galaxy Book S',
      price: 899,
      stars: 4.6,
      reviews: 180,
      seller: 'Samsung',
      image: 'https://placekitten.com/307/307'
    },
    {
      name: 'Huawei MateBook D 14',
      price: 549,
      stars: 4.2,
      reviews: 150,
      seller: 'Huawei Store',
      image: 'https://placekitten.com/308/308'
    }
  ]
  const sellerFilter = document.getElementById('sellerFilter')
  const priceFilter = document.getElementById('priceFilter')
  const productsContainer = document.querySelector('.products')
  // Función para renderizar los productos
  function renderProducts(productsArray) {
    productsContainer.innerHTML = '' // Limpiar contenedor

    productsArray.forEach((product) => {
      const productCard = document.createElement('div')
      productCard.classList.add('product-card')

      const productImage = document.createElement('img')
      productImage.src = product.image
      productImage.alt = product.name
      productImage.classList.add('product-image')

      const productName = document.createElement('h3')
      productName.textContent = product.name

      const productPrice = document.createElement('p')
      productPrice.textContent = `$${product.price}`

      productCard.appendChild(productImage)
      productCard.appendChild(productName)
      productCard.appendChild(productPrice)

      productsContainer.appendChild(productCard)
    })
  }
  // Función para renderizar opciones de vendedores en el filtro
  function renderSellerOptions() {
    const uniqueSellers = [
      ...new Set(products.map((product) => product.seller))
    ]
    uniqueSellers.unshift('Todos') // Agregar 'Todos' como la primera opción

    uniqueSellers.forEach((seller) => {
      const option = document.createElement('option')
      option.value = seller
      option.textContent = seller
      sellerFilter.appendChild(option)
    })
  }
  // Función para filtrar por vendedor
  function filterBySeller() {
    const selectedSeller = sellerFilter.value

    if (selectedSeller === 'Todos') {
      renderProducts(products)
    } else {
      const filteredProducts = products.filter(
        (product) => product.seller === selectedSeller
      )
      renderProducts(filteredProducts)
    }
  }
  // Función para filtrar por precio
  function filterByPrice() {
    const maxPrice = parseFloat(priceFilter.value)

    if (!isNaN(maxPrice)) {
      const filteredProducts = products.filter(
        (product) => product.price <= maxPrice
      )
      renderProducts(filteredProducts)
    }
  }
  // Event listeners para los filtros
  sellerFilter.addEventListener('change', filterBySeller)
  priceFilter.addEventListener('input', filterByPrice)
  // Inicializar la página
  renderProducts(products)
  renderSellerOptions()
})
// Función para limpiar los filtros
function clearFilters() {
  sellerFilter.value = 'Todos'
  priceFilter.value = ''
  renderProducts(products)
}
