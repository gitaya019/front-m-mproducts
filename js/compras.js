const apiBaseUrl = "http://m-m-productos.test/api/compras";
const apiProveedoresUrl = "http://m-m-productos.test/api/proveedores";
const apiProductosUrl = "http://m-m-productos.test/api/productos";

const form = document.getElementById('compra-form');
const compraList = document.getElementById('compra-list');
const proveedorsDropdown = document.getElementById('proveedors_id');
const productosDropdown = document.getElementById('productos_id');

// Cargar opciones para los selectores
function fetchDropdownOptions() {
  // Poblar proveedores
  fetch(apiProveedoresUrl)
    .then(response => response.json())
    .then(data => {
      data.forEach(proveedor => {
        const option = document.createElement('option');
        option.value = proveedor.id;
        option.textContent = proveedor.nombre;
        proveedorsDropdown.appendChild(option);
      });
    })
    .catch(error => console.error("Error al cargar proveedores:", error));

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

// Obtener y mostrar las compras
function fetchCompras() {
  fetch(apiBaseUrl)
    .then(response => response.json())
    .then(data => {
      compraList.innerHTML = "";
      data.forEach(compra => {
        const proveedorNombre = compra.proveedors ? compra.proveedors.nombre : "Proveedor desconocido";
        const productoNombre = compra.productos ? compra.productos.nombre : "Producto desconocido";

        const div = document.createElement('div');
        div.classList.add('purchase-item');
        div.innerHTML = `
          <span>Descripción: ${compra.descripcion}</span><br>
          <span>Cantidad: ${compra.cantidad}</span><br>
          <span>Proveedor: ${proveedorNombre}</span><br>
          <span>Producto: ${productoNombre}</span>
          <button onclick="deleteCompra(${compra.id})">Eliminar</button>
        `;
        compraList.appendChild(div);
      });
    })
    .catch(error => console.error("Error al obtener las compras:", error));
}

// Crear una nueva compra
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const descripcion = document.getElementById('descripcion').value;
  const proveedors_id = proveedorsDropdown.value;
  const productos_id = productosDropdown.value;
  const cantidad = document.getElementById('cantidad').value;

  fetch(apiBaseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descripcion, proveedors_id, productos_id, cantidad })
  }).then(response => {
    if (response.ok) {
      form.reset();
      fetchCompras();
    }
  });
});

// Eliminar una compra
function deleteCompra(id) {
  fetch(`${apiBaseUrl}/${id}`, { method: 'DELETE' })
    .then(response => {
      if (response.ok) fetchCompras();
    })
    .catch(error => console.error("Error al eliminar la compra:", error));
}

// Inicializar la página
fetchDropdownOptions();
fetchCompras();
