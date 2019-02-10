import { LitElement, html, css } from 'lit-element';

class ShoppingProductListItem extends LitElement {
	static get properties() {
		return {
			name: { type: String },
			price: { type: Number },
			size: { type: String },
			id: { type: String },
			img: { type: String }
		}
	}

	/** Tells the app element a product is selected */
	_addToCart() {
		this.dispatchEvent(new CustomEvent('productselected', { detail: this.id, composed: true, bubbles: true }));
	}

	render() {
		return html`
			<img alt="${this.name}" src="${this.img}"></img>
			<h2>${this.name}</h2>
			<div>Price: € ${this.price}</div>
			<button @click="${this._addToCart}">add to cart</button>
		`;
	}
	
	static get styles() {
		return css`
			:host { 
				display: block; 
				text-align: center;
			}

			img {
				width: 100%;
			}

			h2 {
				text-align: center;
			}

			button {
				width: 100%;
				border: none;
				color: white;
				background-color: black;
				padding: 10px;
				margin: 15px 0px;
			}

			button:hover {
				border: solid 1px black;
				background-color: #eabf00;
				cursor: pointer;
				padding: 9px;
			}
		`;
	}
}

customElements.define('shopping-product-list-item', ShoppingProductListItem);