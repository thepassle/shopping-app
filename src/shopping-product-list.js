import { LitElement, html, css } from 'lit-element';
import './shopping-product-list-item';

class ShoppingProductList extends LitElement {
	static get properties() {
		return {
			products: { type: Array },
			selectedsizes: { type: Object }
		}
	}

	constructor() {
		super();
		this.products = [];
		this.selectedsizes = {};
	}

	/** Tells the parent the price order has changed (asc/desc) */
	_changeOrder() {
		this.dispatchEvent(new CustomEvent('orderbychanged', { detail: (this.shadowRoot.querySelector('select').value === 'true') }));   
	}

	/** Tells the parent a size is selected */
	_selectSize(size) {
		this.dispatchEvent(new CustomEvent('sizeselected', { detail: size }));   
	}

	render() {
		return html`
			<div class="products-items">
				<div class="products-optns">
					${['s','m','l','xl'].map(size => html`
						<button 
							class="products-optns-size ${this.selectedsizes[size] ? 'products-optns-size-selected' : ''}" 
							@click="${() => this._selectSize(size)}">
								${size}
						</button>
					`)}
				</div>

				<div class="products-header">
					<span>${this.products.length} items:</span>
					<div class="products-header-select">
						<label for="ascdesc" class="sr-only">Choose ascending or descending</label>
						<select id="ascdesc" name="select" @change="${this._changeOrder}">
						  <option value="true">ascending</option>
						  <option value="false">descending</option>
						</select>
					</div>
				</div>

				<div class="products-items-grid">
					${this.products.map(product => html`
						<shopping-product-list-item
							.name=${product.name}
							.price=${product.price}
							.size=${product.size}
							.id=${product.id}
							.img=${product.img}>
						</shopping-product-list-item>
					`)}
				</div>
			</div>
		`;
	}

	static get styles() {
		return css`
			:host {
				padding-top: 100px;
				flex: 1;
				display: flex;
				flex-direction: row;
			}

			.sr-only {
				position:absolute;
				left:-10000px;
				top:auto;
				width:1px;
				height:1px;
				overflow:hidden;
			}

			.products-optns {
				display: flex;
				flex-direction: row;
				justify-content: center;
			}

			.products-optns-size {
				width: 50px;
				height: 50px;
				margin: 10px;
				border: none;
				border-radius: 50%;
				cursor: pointer;
				background-color: #ececec;
				text-align: center;
			}

			.products-optns-size:hover {
				border: solid 1px black;
			}

			.products-optns-size-selected {
				border: solid 1px black;
				background-color: #eabf00;
			}

			.products-header {
				display: flex;
				padding: 25px;
			}

			.products-header-select {
				display: flex;
				align-items: center;
			}

			.products-header span {
				flex: 1;
				font-size: 20px;
			}

			.products-items {
				flex: 1;
			}

			.products-items-grid {
				flex: 1;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
			}

			shopping-product-list-item {
				width: calc(25% - 52px);
				padding: 25px;
			    border: 1px solid transparent;
			}

			shopping-product-list-item:hover {
				border: solid 1px black;
			}

			@media only screen and (max-width: 600px) {
				:host {
					flex-direction: column;
				}

				.products-optns {
					width: 100%;
				}

				.products-optns button {
					width: 40px;
					height: 40px;
					border: none;
					border-radius: 50%;
					cursor: pointer;
					text-align: center;
				}

				.products-header {
					flex-direction: column;
				}
			}

			@media only screen and (max-width: 500px) {
				shopping-product-list-item {
					width: calc(33% - 52px);
					padding: 25px;
				    border: 1px solid transparent;
				}
			}

			@media only screen and (max-width: 350px) {
				shopping-product-list-item {
					width: calc(50% - 52px);
					padding: 25px;
				    border: 1px solid transparent;
				}
			}

		`;
	}
}

customElements.define('shopping-product-list', ShoppingProductList);