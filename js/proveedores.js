const apiBaseUrl = "http://m-m-productos.test/api/proveedores";

const form = document.getElementById('proveedor-form');
const proveedorList = document.getElementById('proveedor-list');

function fetchProveedores() {
  fetch(apiBaseUrl)
    .then(response => response.json())
    .then(data => {
      proveedorList.innerHTML = "";
      data.forEach(proveedor => {
        const div = document.createElement('div');
        div.classList.add('provider-item');
        div.innerHTML = `
          <span>${proveedor.nombre} - NIT: ${proveedor.nit} (Correo: ${proveedor.correo}, Teléfono: ${proveedor.telefono})</span>
          <button onclick="deleteProveedor(${proveedor.id})">Eliminar</button>
        `;
        proveedorList.appendChild(div);
      });
    });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const nit = document.getElementById('nit').value;
  const correo = document.getElementById('correo').value;
  const telefono = document.getElementById('telefono').value;

  fetch(apiBaseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, nit, correo, telefono })
  }).then(response => {
    if (response.ok) {
      form.reset();
      fetchProveedores();
    }
  });
});

function deleteProveedor(id) {
  fetch(`${apiBaseUrl}/${id}`, { method: 'DELETE' })
    .then(response => {
      if (response.ok) fetchProveedores();
    });
}

fetchProveedores();
