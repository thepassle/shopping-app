import { LitElement, html, css } from 'lit-element';
import './shopping-product-list';
import './shopping-cart';

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} Product
 * @property {string} img - Indicates whether the Courage component is present.
 * @property {string} name - Indicates whether the Power component is present.
 * @property {number} price - Indicates whether the Wisdom component is present.
 * @property {string} id - Indicates whether the Wisdom component is present.
 * @property {string} size - Indicates whether the Wisdom component is present.
 * @property {number} [quantity] - Indicates whether the Wisdom component is present.
 */

class ShoppingApp extends LitElement {
	static get properties() {
		return {
			shoppingcart: { type: Array },
			products: { type: Array },
			sizes: { type: Object },
			pricefilter: { type: Boolean }
		};
  }

	constructor() {
		super();
		/** @type {Product[]} */
		this.shoppingcart = [];
		/** @type {boolean} */
		this.pricefilter = true;
		/** @type {Object} */
		this.sizes = {};
		/** @type {Product[]} */
		this.products = [
			{ img: 'img/1.jpg', name: 'tshirt1', price: 1.99, id: "1", size: 'm'},
			{ img: 'img/2.jpg', name: 'sweater2', price: 2.05, id: "2", size: 'l'},
			{ img: 'img/3.jpg', name: 'tshirt3', price: 3.99, id: "3", size: 'm'},
			{ img: 'img/4.jpg', name: 'sweater4', price: 4.05, id: "4", size: 'l'},
			{ img: 'img/5.jpg', name: 'tshirt5', price: 5.99, id: "5", size: 's'},
			{ img: 'img/6.jpg', name: 'tshirt6', price: 6.99, id: "6", size: 'm'},
			{ img: 'img/7.jpg', name: 'sweater7', price: 7.05, id: "7", size: 'l'},
			{ img: 'img/8.jpg', name: 'tshirt8', price: 8.99, id: "8", size: 'm'},
			{ img: 'img/9.jpg', name: 'sweater9', price: 9.05, id: "9", size: 'l'},
			{ img: 'img/10.jpg', name: 'tshirt10', price: 10.99, id: "10", size: 's'},
			{ img: 'img/11.jpg', name: 'sweater11', price: 11.05, id: "11", size: 'l'},
			{ img: 'img/12.jpg', name: 'tshirt12', price: 12.99, id: "12", size: 'm'},
			{ img: 'img/13.jpg', name: 'sweater13', price: 13.05, id: "13", size: 'xl'}
		];
	}

	/**
	* Filters ascending or descending based on `this.pricefilter`,
	* true for ascending, false for descending
	* @param {Product} a
	* @param {Product} b
	* @return {number}
	*/
	_sortAscOrDesc(a, b) {
		if(this.pricefilter) {
			return a.price - b.price;
		}
		return b.price - a.price;
	}

	/**
	* Filters based on the size of the product, if no properties
	* exist on the `this.sizes`, return everything. Also return everything
	* when all properties on `this.sizes` is false.
	*/
	_filterSizes(size) {
		if(Object.entries(this.sizes).length === 0 || Object.entries(this.sizes).every(item => item[1] === false)) return true;
		return this.sizes[size];
	}

	/**
   * Toggles when a size is clicked
	 * @param {Event} e
	 */
	_handleSizes(e) {
    this.sizes[e.detail] = !this.sizes[e.detail];
		this.requestUpdate();
	}

	/**
   * Adds product to the cart, if its already in the cart, update the quantity
   * @param {Event} e
   */
	_addToCart(e) {
		const alreadyInCart = this.shoppingcart.some(product => product.id === e.detail);
		if (alreadyInCart) {
			this.shoppingcart = this.shoppingcart.map(product => {
				if(product.id === e.detail) {
					return {...product, quantity: product.quantity += 1 } // eslint-disable-line
				}
				return product;
			});
		} else {
			this.shoppingcart = this.products.reduce((acc, product) =>  {
				if(product.id === e.detail) {
					return [...acc, { ...product, quantity: 1 }];
				};
				return [...acc];
			}, this.shoppingcart);
		}
	}

	/**
   * Removes product from the cart
   * @param {Event} e
   */
	_removeFromCart(e) {
		this.shoppingcart = this.shoppingcart.filter(product => product.id !== e.detail);
	}

	render() {
    return html`
			<shopping-product-list
        @orderbychanged=${(e) => { this.pricefilter = e.detail }}
				@sizeselected=${this._handleSizes}
				@productselected=${this._addToCart}
				.selectedsizes=${this.sizes}
				.products=${this.products
					.filter(({size}) => this._filterSizes(size))
					.sort((a, b) => this._sortAscOrDesc(a, b))
        }></shopping-product-list>
			<shopping-cart
				.selectedproducts=${this.shoppingcart}
				@productremoved=${this._removeFromCart}>
			</shopping-cart>
		`;
	}

	static get styles() {
		return css`
			:host {
				flex: 1;
				display: flex;
			}
		`;
	}
}

customElements.define('shopping-app', ShoppingApp);
