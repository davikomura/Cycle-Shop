import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart.jsx';
import { formatPrice } from '../../lib/catalog.js';

export const Cart = () => {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-3 max-w-xl text-gray-600">
          Add a few bikes to compare pricing, quantity and total checkout value.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-full bg-gray-800 px-5 py-3 text-white transition-colors hover:bg-[#FF6347]"
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d46847]">
            Checkout review
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Your cart</h1>
          <p className="mt-2 text-gray-600">
            Review quantities before moving to checkout.
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:border-red-300 hover:text-red-600"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="soft-panel flex flex-col gap-4 rounded-[28px] p-5 sm:flex-row sm:items-center"
            >
              <img
                src={item.imagem}
                alt={item.nome}
                className="h-32 w-full rounded-2xl bg-[linear-gradient(180deg,#fff8f1_0%,#ffffff_100%)] object-contain p-4 sm:w-40"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">{item.nome}</h2>
                <p className="mt-2 text-sm text-gray-600">{item.descricao}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <label className="text-sm text-gray-600">
                    Quantity
                    <select
                      value={item.quantity}
                      onChange={(event) =>
                        updateQuantity(item.id, Number(event.target.value))
                      }
                      className="ml-3 rounded-full border border-gray-300 bg-white px-3 py-2"
                    >
                      {[1, 2, 3, 4, 5].map((quantity) => (
                        <option key={quantity} value={quantity}>
                          {quantity}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Unit price</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatPrice(item.preco)}
                </p>
                <p className="mt-3 text-sm text-gray-500">Subtotal</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(item.preco * item.quantity)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <aside className="soft-panel h-fit rounded-[28px] p-6">
          <h2 className="text-xl font-semibold text-gray-900">Order summary</h2>
          <div className="mt-6 space-y-4 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Items</span>
              <span>{items.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Estimated shipping</span>
              <span>Free</span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base font-semibold text-gray-900">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="mt-6 block w-full rounded-full bg-gradient-to-r from-[#e95f3c] to-[#ff8b61] px-4 py-3 text-center font-medium text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:shadow-orange-500/30"
          >
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </section>
  );
};
