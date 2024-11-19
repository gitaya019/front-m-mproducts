const apiBaseUrl = "http://m-m-productos.test/api/clientes";

const form = document.getElementById('client-form');
const clientList = document.getElementById('client-list');

// Fetch and display clients
function fetchClients() {
  fetch(apiBaseUrl)
    .then(response => response.json())
    .then(data => {
      clientList.innerHTML = "";
      data.forEach(client => {
        const div = document.createElement('div');
        div.classList.add('client-item');
        div.innerHTML = `
          <span>${client.nombre} (${client.correo || 'Sin correo'})</span>
          <button onclick="deleteClient(${client.id})">Eliminar</button>
        `;
        clientList.appendChild(div);
      });
    });
}

// Add a new client
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;

  fetch(apiBaseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo })
  })
    .then(response => {
      if (response.ok) {
        form.reset();
        fetchClients();
      }
    });
});

// Delete a client
function deleteClient(id) {
  fetch(`${apiBaseUrl}/${id}`, { method: 'DELETE' })
    .then(response => {
      if (response.ok) {
        fetchClients();
      }
    });
}

// Initial load
fetchClients();
