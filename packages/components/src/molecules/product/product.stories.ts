import { Meta, Story } from "@storybook/web-components";
import { html } from "lit";
import { Product } from "./product";
import "./product";
import { ProductMock } from "./product.mocks";

export default {
  title: "Components/Molecules/Product",
  component: "ov-product",
} as Meta;

const Template: Story<Product> = ({ product, priceLoading }) =>
  html`
    <ov-product .product=${product} ?priceLoading=${priceLoading}>
      <section slot="actions" class="slot">
        <span>&lt;Actions slot&gt;</span>
      </section>
    </ov-product>
  `;

export const Primary = Template.bind({});
Primary.args = {
  product: ProductMock.PRIMARY,
};

export const PriceLoading = Template.bind({});
PriceLoading.args = {
  product: ProductMock.PRIMARY,
  priceLoading: true,
};

export const Min = Template.bind({});
Min.args = {
  product: ProductMock.MIN_CONTENT,
};

export const Max = Template.bind({});
Max.args = {
  product: ProductMock.MAX_CONTENT,
};

export const Landscape = Template.bind({});
Landscape.args = {
  product: ProductMock.LANDSCAPE,
};
