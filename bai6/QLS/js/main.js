function fetchProducts() {
	fetch('https://localhost:7290/api/products')
		.then(response => response.json())
		.then(data => {
			const bookList = document.getElementById('productList');
			bookList.innerHTML = '';
			data.forEach(product => {
				bookList.innerHTML += `
			          <tr>
			            <td>${product.id}</td>
			            <td>${product.name}</td>
			            <td>${product.price}</td>
			            <td>${product.description}</td>
			            <td>
			              <button
			                class="btn btn-danger"
			                data-id="${product.id}"
			                onclick="deleteProduct(event)"
			              >
			                Delete
			              </button>
			              <button
			                class="btn btn-warning"
			                data-id="${product.id}"
			                onclick="editProduct(event)"
			              >
			                Edit
			              </button>
			              <button
			                class="btn btn-primary"
			                data-id="${product.id}"
			                onclick="viewDetails(event)"
			              >
			                View
			              </button>
			            </td>
			          </tr>
			        `;
			});
		})
		.catch(err => {
			console.log(err);
		});
}



fetchProducts();
