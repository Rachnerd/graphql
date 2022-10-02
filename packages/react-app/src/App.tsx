import "./App.css";
import { OvButton } from "./ui-components/OvButton";
import { OvIcon } from "./ui-components/OvIcon";
import { OvProduct } from "./ui-components/OvProduct";

function App() {
  return (
    <>
      <OvButton>
        <OvIcon icon="cart-plus"></OvIcon>
      </OvButton>

      <OvProduct
        product={{
          id: "1",
          title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          price: 109.95,
          description:
            "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
          subtitle: "men's clothing",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          rating: {
            rate: 3.9,
            count: 120,
          },
        }}
      >
        <section slot="actions">Actions</section>
        <section slot="footer">Footer</section>
      </OvProduct>
    </>
  );
}

export default App;
