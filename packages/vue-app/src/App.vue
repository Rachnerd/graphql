<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
import "../../components/dist/templates/main-template/main-template.js";
import "../../components/dist/molecules/card-overview/card-overview";
import "../../components/dist/molecules/cart-product/cart-product";
import "../../components/dist/molecules/product-in-cart/product-in-cart";
import "../../components/dist/molecules/product-in-stock/product-in-stock";
import type { ProductData } from "../../components/dist/_mixins/product";

/**
 * Mock data -> Temporary
 */
const PRODUCT_MOCK: ProductData = {
  id: "1",
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120,
  },
};

/**
 * Static data
 */
const products = [
  PRODUCT_MOCK,
  PRODUCT_MOCK,
  PRODUCT_MOCK,
  PRODUCT_MOCK,
  PRODUCT_MOCK,
].map((product, i) => ({
  ...product,
  /**
   * Make sure each product has a unique ID
   */
  id: i.toString(),
}));
</script>

<template>
  <ov-default-template>
    <section slot="main">
      <ov-card-overview>
        <li v-for="product in products">
          <ov-product-in-stock
            v-bind:product="product"
            amount="1"
          ></ov-product-in-stock>
        </li>
      </ov-card-overview>
    </section>
    <section slot="side">
      <ov-card-overview>
        <li v-for="product in products">
          <ov-cart-product
            v-bind:product="product"
            amount="1"
          ></ov-cart-product>
        </li>
      </ov-card-overview>
    </section>
  </ov-default-template>
</template>

<style scoped></style>
