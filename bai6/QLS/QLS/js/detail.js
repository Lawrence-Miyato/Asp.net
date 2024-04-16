const apiUrl = 'https://localhost:7278/api';

function getQueryId() {
	var queryString = window.location.search.substring(1);
	var urlParams = new URLSearchParams(queryString);
	var id = urlParams.get('id');
	return id;
}

const productDetail = document.getElementById('product-detail');

function getProduct(id) {
	return fetch(`${apiUrl}/products/${id}`)
		.then((response) => response.json())
		.then((data) => {
			const product = data;
			console.log(product);
			productDetail.innerHTML = `
					<div>Id: ${product.id}</div>
                    <div>Name: ${product.name}</div>
                    <div>Price: ${product.price}</div>
                    <div>Description: ${product.description}</div>`;
		});
}

const productId = getQueryId();
getProduct(productId);
