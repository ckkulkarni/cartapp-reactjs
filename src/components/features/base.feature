Feature: Cart Management

    Scenario: Adding an item to the cart
        Given the user is on the cart page
        When the user clicks the "Add to Cart" button for an item
        Then the total quantity should increase by 1


    Scenario: Deleting an item from the cart
        Given the user is on the cart page
        When the user clicks the "Delete" button for an item
        Then the total quantity should decrease by the quantity of the deleted item

    Scenario: Removing an item from the cart
        Given the user is on the cart page
        When the user clicks the "Remove" button for an item
        Then the total quantity should decrease by 1

    Scenario: Resetting the cart counter
        Given the user is on the cart page
        When the user clicks the "Reset Counter" button
        Then the total quantity should be set to 0

    Scenario: Removing all items from the cart
        Given the user is on the cart page
        When the user clicks the "Remove All Items" button
        Then the cart should be empty

    Scenario: Adding a new item to the cart
        Given the user is on the cart page
        When the user clicks the "Add New Item" button
        Then a new item should be added to the cart