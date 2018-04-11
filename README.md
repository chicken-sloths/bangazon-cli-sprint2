# Bangazon
## Contributors
Team lead: [Joe Chesney](https://github.com/joechesney)
[Jordan Castelloe](https://github.com/jordan-castelloe)
[Kenzie Bottoms](https://github.com/kenziebottoms)
[Melissa Bell](https://github.com/melissabell456)
[David Lars Ketch](https://github.com/DavidLarsKetch)

## Context
We were presented with 12 User Stories and selected 7 of them. Those selected User Stories were captured in [Issues 1 - 7](https://github.com/chicken-sloths/bangazon-cli-sprint2/issues?q=is%3Aissue+is%3Aclosed+label%3Afeature). For this sprint, we prioritized:
1. An accurate measurement of our velocity based upon participants' availability
1. TDD (test-driven development), extensive edge-case testing, & in-depth code reviews

The product's feature took a secondary role, as we wanted to focus our attention on the development process & not the code, per se.  Thus, we identified [Issues 1 - 7](https://github.com/chicken-sloths/bangazon-cli-sprint2/issues?q=is%3Aissue+is%3Aclosed+label%3Afeature) as the most integral features of the product and should be prioritized. The measurement of our velocity was a little off, however, in that we were able to complete an additional feature, formalized in [Issue 8](https://github.com/chicken-sloths/bangazon-cli-sprint2/issues/8).

## Tech Stack
- SQLite
- Node.js

## _Original Requirements_

### The Command Line Ordering System

In this group project, you will be allowing a user to interact with a basic product ordering database via a command line interface.

### Ordering System Interface

#### Main Menu

```bash
*********************************************************
**  Welcome to Bangazon! Command Line Ordering System  **
*********************************************************
1. Create a customer account
2. Choose active customer
3. Create a payment option
4. Add product to sell
5. Add product to shopping cart
6. Complete an order
7. Remove customer product
8. Update product information
9. Show stale products
10. Show customer revenue report
11. Show overall product popularity
12. Leave Bangazon!
>
```

### Requirements

You will create a series of prompts that will allow the user to create various types of data in your ordering system.

1. Start with writing unit tests. As a group, determine the core functionality of the application. Define classes, controllers and methods that you think you need to build. Do that before writing the implementation code for core logic. DO NOT WRITE TESTS FOR THE USER INTERFACE (menu and prompts).
1. All classes and methods must be fully documented.
