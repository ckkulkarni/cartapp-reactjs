import { defineFeature, loadFeature } from "jest-cucumber";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import Base from "../../Base";
import React from "react";
import "text-encoding";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import cartSlice from "../../redux/reducer/cartSlice";
import { act } from "react-dom/test-utils";
const feature = loadFeature("src/components/features/base.feature");

let store: any;
let screen: any;

defineFeature(feature, (test) => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartSlice,
      },
    });
    screen = render(
      <Provider store={store}>
        <Base />
      </Provider>
    );
  });

  test("Adding a new item to the cart", ({ given, when, then, and }) => {
    given("the user is on the cart page", () => {
      expect(screen).toBeTruthy();
    });
    when('the user clicks the "Add New Item" button', () => {
      const itemQuantity = screen.getByText("5");
      expect(itemQuantity).toBeTruthy();
      const addCart = screen.getByRole("button", { name: "add-to-cart" });
      act(() => {
        fireEvent.click(addCart);
      });
    });
    then("a new item should be added to the cart", async () => {
      await waitFor(() => {
        const itemQuantity = screen.getByText("6");
        expect(itemQuantity).toBeTruthy();
      });
    });
  });
  test("Deleting an item from the cart", ({ given, when, then, and }) => {
    given("the user is on the cart page", () => {
      expect(screen).toBeDefined();
    });
    when('the user clicks the "Delete" button for an item', async () => {
      const itemQuantity = screen.getByText("5");
      expect(itemQuantity).toBeTruthy();
      const removeCart = screen.getAllByRole("button", {
        name: "remove-cart-button",
      });
      act(() => {
        fireEvent.click(removeCart[4]);
      });
    });
    then(
      "the total quantity should decrease by the quantity of the deleted item",
      async () => {
        await waitFor(() => {
          const itemQuantity = screen.getByText("4");
          expect(itemQuantity).toBeTruthy();
        });
      }
    );
  });
  test("Removing an item from the cart", ({ given, when, then, and }) => {
    given("the user is on the cart page", () => {
      expect(screen).toBeDefined();
    });
    when('the user clicks the "Remove" button for an item', async () => {
      const totalItemQuantity = screen.getByText("5");
      const itemQuantity = screen.getAllByText("1");

      expect(totalItemQuantity).toBeTruthy();
      const decreaseQuantity = screen.getAllByRole("button", {
        name: "decrease-item-quantity",
      });
      act(() => {
        fireEvent.click(decreaseQuantity[4]);
      });
    });
    then("the total quantity should decrease by 1", async () => {
      await waitFor(() => {
        const itemQuantity = screen.getByText("Zero");
        expect(itemQuantity).toBeTruthy();
      });
    });
  });
  test("Adding an item to the cart", ({ given, when, then }) => {
    given("the user is on the cart page", () => {
      expect(screen).toBeDefined();
    });
    when('the user clicks the "Add to Cart" button for an item', async () => {
      const totalItemQuantity = screen.getByText("5");
      const itemQuantity = screen.getAllByText("1");

      expect(totalItemQuantity).toBeTruthy();
      expect(itemQuantity[0]).toBeTruthy();
      const increaseQuantity = screen.getAllByRole("button", {
        name: "increase-item-quantity",
      });
      act(() => {
        fireEvent.click(increaseQuantity[0]);
      });
    });
    then("the total quantity should increase by 1", async () => {
      await waitFor(() => {
        const itemQuantity = screen.getByText("2");
        expect(itemQuantity).toBeTruthy();
      });
    });
  });
  test("Resetting the cart counter", ({ given, when, then }) => {
    given("the user is on the cart page", () => {
      expect(screen).toBeDefined();
    });
    when('the user clicks the "Reset Counter" button', async () => {
      const totalItemQuantity = screen.getByText("5");
      const itemQuantity = screen.getAllByText("1");

      expect(totalItemQuantity).toBeTruthy();
      expect(itemQuantity[0]).toBeTruthy();
      const resetQuantity = screen.getByRole("button", {
        name: "reset-button",
      });
      act(() => {
        fireEvent.click(resetQuantity);
      });
    });
    then("the total quantity should be set to 0", async () => {
      await waitFor(() => {
        const itemQuantity = screen.getAllByText("0");
        expect(itemQuantity).toBeTruthy();
      });
    });
  });
  test("Removing all items from the cart", ({ given, when, then }) => {
    given("the user is on the cart page", () => {
      expect(screen).toBeDefined();
    });
    when('the user clicks the "Remove All Items" button', async () => {
      const totalItemQuantity = screen.getByText("5");
      const itemQuantity = screen.getAllByText("1");
      expect(totalItemQuantity).toBeTruthy();
      expect(itemQuantity[0]).toBeTruthy();
      const removeAllButton = screen.getByRole("button", {
        name: "remove-all-button",
      });
      act(() => {
        fireEvent.click(removeAllButton);
      });
    });
    then("the cart should be empty", async () => {
      await waitFor(() => {
        try {
          const itemsContainer = screen.getByTestId("items-container");
          expect(itemsContainer).toBeFalsy();
        } catch (error) {
          expect(error).toBeDefined();
        }
      });
    });
  });
});
