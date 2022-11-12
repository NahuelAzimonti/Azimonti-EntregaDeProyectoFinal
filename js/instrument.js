
/* Me pinta las tarjetas en el html directamente del data*/
const contenedor = document.querySelector(".flex_container"),
bitton = document.querySelector(".botonPrinci")
const renderServicios = (arr) => {
  /* let html; */
  for (const item of arr) {
    const { id, nombre, img, precio } = item;
    html = `
    <div class="card"  style="width: 18rem;">
    <img src="${img}" class="card-img-top paquete-image">
    <div class="card-body">
      <h5 class="card-title paquete-title text-center">${nombre}</h5>
      <p class="card-text paquete-precio text-dark h5 text-center">${precio}</p>
      <a  id="${id}" class="carlos btn btn-secondary botonPrinci text-center añadirCarrito paquete ">Comprar</a>
    </div>
  </div>
     `

    contenedor.innerHTML += html;
  }
};

async function servicio() {
  const response = await fetch('../data/data.json')
  const datos = await response.json()
  console.log(datos);
  renderServicios(datos)
}

servicio()

/* Comprar productos */
 
const añadirCarritoBotones = document.querySelectorAll('.añadirCarrito')
añadirCarritoBotones.forEach(añadirCarritoBtn => {
  añadirCarritoBtn.addEventListener('click', añadirCarritoClick)
})

const carritoPaquetes = document.querySelector('.carritoPaquetes')

function añadirCarritoClick(event) {
  const button = event.target
  const paquete = button.closest('.carlos')
  const paqueteTitulo = paquete.querySelector('.paquete-title ').textContent
  const paquetePrecio = paquete.querySelector('.paquete-precio').textContent
  const paqueteImage = paquete.querySelector('.paquete-image').src
  button .addEventListener('click', () => {
    Toastify({
      text: `Ha sido añadido al carrito el instrumento ${paqueteTitulo}`,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
      style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () { }
  }).showToast();
  })
  añadirPaqueteCarrito(paqueteTitulo, paquetePrecio, paqueteImage)

}

function añadirPaqueteCarrito(paqueteTitulo, paquetePrecio, paqueteImage){

  const carritoLista = document.createElement('div')
  const carritoData = `
  <div class="row carritoPaquete">
      <div class="col-6">
          <div class="d-flex align-items-center h-100 border-bottom pb-2 pt-3>
              <img src=${paqueteImage}>
              <h6 class="carritoPaqueteTitulo ml-3 mb-0">${paqueteTitulo}</h6>
          </div>
      </div>
      <div class="col-2">
          <div class="d-flex align-items-center h-100 border-bottom pb-2 pt-3">
              <p class="mb-0 carritoPaquetePrecio">${paquetePrecio}</p>
          </div>
      </div>
      <div class="col-4">
          <div class="d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
              <input type="number" class="carritoPaqueteCantidad"  value="1">
              <button class="btn btn-danger btnEliminar" type="button">Eliminar</button>
          </div>
      </div>
  </div>`

  carritoLista.innerHTML = carritoData
  carritoPaquetes.append(carritoLista)

  carritoLista.querySelector('.btnEliminar').addEventListener('click', eliminarPaqueteCarrito)
  carritoLista.querySelector('.carritoPaqueteCantidad').addEventListener('change', carritoCantidadCambio)
  carritoTotalCambio()
}

function carritoTotalCambio() {
  let total = 0


  const carritoTotal = document.querySelector('.carritoTotal')

  const carritoPaqs = document.querySelectorAll('.carritoPaquetes')

  carritoPaqs.forEach(carritoPaquete => {
      const carritoPaquetePrecioElemento = carritoPaquete.querySelector('.carritoPaquetePrecio')
      const carritoPaquetePrecio = parseFloat(carritoPaquetePrecioElemento.textContent.replace('U$S', ''))
      const carritoPaqueteCantidadElemento = carritoPaquete.querySelector('.carritoPaqueteCantidad')
      const carritoPaqueteCantidad = parseFloat(carritoPaqueteCantidadElemento.value)
      total = total + carritoPaquetePrecio * carritoPaqueteCantidad

      
  })
  carritoTotal.innerHTML = `U$S ${total}`
  let str = JSON.stringify(total)
  localStorage.setItem("total", str)
}


function eliminarPaqueteCarrito(event) {
  const botonRemover = event.target 
  botonRemover.closest('.carritoPaquete').remove()
  carritoTotalCambio()

}

function carritoCantidadCambio(event) {
  const cantidad = event.target
  cantidad.value <= 0 ? (cantidad.value = 1 ) : null
  carritoTotalCambio()
}
