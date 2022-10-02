import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { ProductInCart } from "./product-in-cart";
import "./product-in-cart";
import { ProductMock } from "src/product/product.mocks";

export default {
  title: "Components/Molecules/Product in cart",
  component: "ov-product-in-cart",
  parameters: {
    actions: {
      handles: ["go-to-cart"],
    },
  },
} as Meta;

const Template: Story<ProductInCart> = ({ product, amount }) => {
  return html`
    <ov-product-in-cart
      .product=${product}
      amount=${amount}
    ></ov-product-in-cart>
  `;
};

export const Primary = Template.bind({});
Primary.args = {
  product: ProductMock.PRIMARY,
  amount: 2,
};

export const Min = Template.bind({});
Min.args = {
  product: ProductMock.MIN_CONTENT,
  amount: 1,
};

export const Max = Template.bind({});
Max.args = {
  product: ProductMock.MAX_CONTENT,
  amount: 99,
};
