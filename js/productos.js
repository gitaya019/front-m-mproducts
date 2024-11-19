const apiBaseUrl = "http://m-m-productos.test/api/productos";

const form = document.getElementById('producto-form');
const productoList = document.getElementById('producto-list');

function fetchProductos() {
  fetch(apiBaseUrl)
    .then(response => response.json())
    .then(data => {
      productoList.innerHTML = "";
      data.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('product-item');
        div.innerHTML = `
          <span>${producto.nombre} - ${producto.descripcion} (Precio: ${producto.price}, Stock: ${producto.stock})</span>
          <button onclick="deleteProducto(${producto.id})">Eliminar</button>
        `;
        productoList.appendChild(div);
      });
    });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;
  const price = document.getElementById('price').value;
  const stock = document.getElementById('stock').value;

  fetch(apiBaseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, descripcion, price, stock })
  }).then(response => {
    if (response.ok) {
      form.reset();
      fetchProductos();
    }
  });
});

function deleteProducto(id) {
  fetch(`${apiBaseUrl}/${id}`, { method: 'DELETE' })
    .then(response => {
      if (response.ok) fetchProductos();
    });
}

fetchProductos();
