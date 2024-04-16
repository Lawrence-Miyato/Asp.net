const apiUrl = 'https://localhost:7278/api';

function fetchProducts() {
	fetch(`${apiUrl}/products`)
		.then((response) => response.json())
		.then((data) => {
			const bookList = document.getElementById('productList');
			bookList.innerHTML = '';
			data.forEach((product) => {
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
		.catch((err) => {
			console.log(err);
		});
}

function addProduct() {
	const name = document.getElementById('bookName').value;
	const price = document.getElementById('price').value;
	const description = document.getElementById('description').value;

	const productData = {
		name: name,
		price: price,
		description: description,
	};

	fetch(`${apiUrl}/products`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(productData),
	})
		.then((response) => response.json())
		.then((data) => {
			fetchProducts(); // Refresh the product list
		})
		.catch((err) => {
			console.log('Error adding product:', err);
		});
}
function deleteProduct(event) {
	const productId = event.target.getAttribute('data-id');

	fetch(`${apiUrl}/products/${productId}`, {
		method: 'DELETE',
	})
		.then(() => {
			fetchProducts(); // Refresh the product list
		})
		.catch((err) => {
			console.log('Error deleting product:', err);
		});
}

function editProduct(event) {
	const productId = event.target.getAttribute('data-id');
	const name = document.getElementById('bookName').value;
	const price = document.getElementById('price').value;
	const description = document.getElementById('description').value;

	const productData = {
		id: productId,
		name: name,
		price: price,
		description: description,
	};

	fetch(`${apiUrl}/products/${productId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(productData),
	})
		.then((data) => {
			fetchProducts(); // Refresh the product list
		})
		.catch((err) => {
			console.log('Error update product:', err);
		});
}

function viewDetails(event) {
	const productId = event.target.getAttribute('data-id');
	window.location.href = `product-details.html?id=${productId}`;
}

window.viewDetails = viewDetails;
window.deleteProduct = deleteProduct;
window.editProduct = editProduct;
document.addEventListener('DOMContentLoaded', () => {
	// Fetch products when the page loads
	fetchProducts();

	// Add event listener for the "Thêm Sản Phẩm" button
	document.getElementById('btnAdd').addEventListener('click', addProduct);
});
