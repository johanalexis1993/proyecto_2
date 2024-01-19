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
    seller: 'PcComponentes',
    image: 'https://placekitten.com/300/300'
  },
  {
    name: 'Lenovo Ideapad 3',
    price: 399,
    stars: 4.2,
    reviews: 200,
    seller: 'PcComponentes',
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
    seller: 'Newegg',
    image: 'https://placekitten.com/303/303'
  },
  {
    name: 'MSI Modern 14',
    price: 799,
    stars: 4.8,
    reviews: 300,
    seller: 'Newegg',
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
    seller: 'Apple Store',
    image: 'https://placekitten.com/306/306'
  },
  {
    name: 'Samsung Galaxy Book S',
    price: 899,
    stars: 4.6,
    reviews: 180,
    seller: 'Apple Store',
    image: 'https://placekitten.com/307/307'
  }
]
// Función para generar las tarjetas de producto
function generateProductCard(product) {
  const card = document.createElement('div')
  card.classList.add('product-card')

  const image = document.createElement('img')
  image.src = product.image
  image.alt = product.name
  image.classList.add('product-image')

  const name = document.createElement('p')
  name.textContent = product.name

  const price = document.createElement('p')
  price.textContent = `$${product.price}`

  card.appendChild(image)
  card.appendChild(name)
  card.appendChild(price)

  return card
}
// Función para mostrar un mensaje cuando no hay productos
function showNoProductsMessage() {
  const noProductsMessage = document.createElement('h2')
  noProductsMessage.textContent = 'No se encontraron productos'

  const productsContainer = document.querySelector('.products')
  productsContainer.innerHTML = ''
  productsContainer.appendChild(noProductsMessage)
}
// Función para ocultar el mensaje de "No se encontraron productos"
function hideNoProductsMessage() {
  const productsContainer = document.querySelector('.products')
  const noProductsMessage = productsContainer.querySelector('h2')
  if (noProductsMessage) {
    productsContainer.removeChild(noProductsMessage)
  }
}
// Función para mostrar los productos en el DOM
function displayProductsBySeller(productsArray) {
  const productsContainerPcComponentes =
    document.getElementById('PcComponentes')
  const productsContainerNewegg = document.getElementById('Newegg')
  const productsContainerAppleStore = document.getElementById('Apple Store')

  productsContainerPcComponentes.innerHTML = ''
  productsContainerNewegg.innerHTML = ''
  productsContainerAppleStore.innerHTML = ''

  if (productsArray.length === 0) {
    showNoProductsMessage()
  } else {
    hideNoProductsMessage()
    productsArray.forEach((product) => {
      const card = generateProductCard(product)

      // Determinar el contenedor de productos según el vendedor
      let targetContainer
      switch (product.seller) {
        case 'PcComponentes':
          targetContainer = productsContainerPcComponentes
          break
        case 'Newegg':
          targetContainer = productsContainerNewegg
          break
        case 'Apple Store':
          targetContainer = productsContainerAppleStore
          break
        default:
          targetContainer = productsContainerPcComponentes // Por defecto, PcComponentes
      }

      targetContainer.appendChild(card)
    })
  }
}
document.addEventListener('DOMContentLoaded', function () {
  displayProductsBySeller(products)
  const sellerFilter = document.getElementById('sellerFilter')
  const uniqueSellers = [...new Set(products.map((product) => product.seller))]
  uniqueSellers.forEach((seller) => {
    const option = document.createElement('option')
    option.value = seller
    option.textContent = seller
    sellerFilter.appendChild(option)
  })
})
// Función para limpiar los filtros
function clearFilters() {
  document.getElementById('sellerFilter').value = ''
  document.getElementById('priceFilter').value = ''
  displayProductsBySeller(products)
}
// Evento de clic en el botón de búsqueda
document.getElementById('searchButton').addEventListener('click', function () {
  // Obtener los valores de los filtros
  const sellerFilterValue = document.getElementById('sellerFilter').value
  const priceFilterValue = parseFloat(
    document.getElementById('priceFilter').value
  )

  // Filtrar productos según los criterios
  const filteredProducts = products.filter((product) => {
    const sellerMatch =
      sellerFilterValue === '' || product.seller === sellerFilterValue
    const priceMatch =
      isNaN(priceFilterValue) || product.price <= priceFilterValue

    return sellerMatch && priceMatch
  })

  // Mostrar productos filtrados o mensaje si no hay productos
  if (filteredProducts.length === 0) {
    showNoProductsMessage()
  } else {
    hideNoProductsMessage()
    displayProducts(filteredProducts)
  }
})
// Evento de clic en el botón de limpiar filtros
document.getElementById('clearButton').addEventListener('click', function () {
  clearFilters()
})
