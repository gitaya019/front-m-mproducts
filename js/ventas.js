const apiBaseUrl = "http://m-m-productos.test/api/ventas";
const apiClientesUrl = "http://m-m-productos.test/api/clientes";
const apiProductosUrl = "http://m-m-productos.test/api/productos";

const form = document.getElementById('venta-form');
const ventaList = document.getElementById('venta-list');
const clientesDropdown = document.getElementById('clientes_id');
const productosDropdown = document.getElementById('productos_id');

// Cargar opciones para los selectores
function fetchDropdownOptions() {
  // Poblar clientes
  fetch(apiClientesUrl)
    .then(response => response.json())
    .then(data => {
      data.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = cliente.nombre;
        clientesDropdown.appendChild(option);
      });
    })
    .catch(error => console.error("Error al cargar clientes:", error));

  // Poblar productos
  fetch(apiProductosUrl)
    .then(response => response.json())
    .then(data => {
      data.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = producto.nombre;
        productosDropdown.appendChild(option);
      });
    })
    .catch(error => console.error("Error al cargar productos:", error));
}

// Obtener y mostrar las ventas
function fetchVentas() {
  fetch(apiBaseUrl)
    .then(response => response.json())
    .then(data => {
      ventaList.innerHTML = "";
      data.forEach(venta => {
        const clienteNombre = venta.clientes ? venta.clientes.nombre : "Cliente desconocido";
        const productoNombre = venta.productos ? venta.productos.nombre : "Producto desconocido";

        const div = document.createElement('div');
        div.classList.add('sale-item');
        div.innerHTML = `
          <span>Descripción: ${venta.descripcion}</span><br>
          <span>Cantidad: ${venta.cantidad}</span><br>
          <span>Cliente: ${clienteNombre}</span><br>
          <span>Producto: ${productoNombre}</span>
          <button onclick="deleteVenta(${venta.id})">Eliminar</button>
        `;
        ventaList.appendChild(div);
      });
    })
    .catch(error => console.error("Error al obtener las ventas:", error));
}

// Crear una nueva venta
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const descripcion = document.getElementById('descripcion').value;
  const clientes_id = clientesDropdown.value;
  const productos_id = productosDropdown.value;
  const cantidad = document.getElementById('cantidad').value;

  fetch(apiBaseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descripcion, clientes_id, productos_id, cantidad })
  }).then(response => {
    if (response.ok) {
      form.reset();
      fetchVentas();
    }
  });
});

// Eliminar una venta
function deleteVenta(id) {
  fetch(`${apiBaseUrl}/${id}`, { method: 'DELETE' })
    .then(response => {
      if (response.ok) fetchVentas();
    })
    .catch(error => console.error("Error al eliminar la venta:", error));
}

// Inicializar la página
fetchDropdownOptions();
fetchVentas();
