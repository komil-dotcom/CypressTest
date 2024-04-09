import { faker } from "@faker-js/faker";
import {
  TopNavigationBar,
  SignupLoginPage,
  AccountCreatedPage,
  ProductsPage,
} from "../pages";

const topNavBar = new TopNavigationBar();
const signupPage = new SignupLoginPage();
const accountCreatedPage = new AccountCreatedPage();
const productsPage = new ProductsPage();

describe("Cypress Take-Home Task", () => {
  let firstName: string;
  let lastName: string;
  let fullName: string;
  let email: string;
  let address: string;
  const womenCategoryProdsList = ["Dress", "Tops", "Saree"];
  const jeansSearchResultNames = [
    "Soft Stretch Jeans",
    "Regular Fit Straight Jeans",
    "Grunt Blue Slim Fit Jeans",
  ];

  beforeEach(() => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    fullName = `${firstName} ${lastName}`;
    email = faker.internet.email({ firstName, lastName });
    address = faker.location.streetAddress();

    cy.visit("/");
  });
  it("Test", () => {
    cy.intercept("GET", "/products?search=jeans").as("searchResults");
    cy.intercept("GET", "/add_to_cart/*").as("addedToCard");
    // 1.Sign up for account
    topNavBar.goToSignupLoginPage();
    signupPage.newUserSignUp(fullName, email);
    signupPage.elements.createAcountBtn.should("be.visible");
    signupPage.elements.nameTxtBox.should("have.value", fullName);
    signupPage.elements.emailTxtBox
      .should("have.value", email)
      .and("be.disabled");
    signupPage.createAccountFor({
      Title: "Mr",
      Password: "Test123",
      dob: new Date("07.07.2005"),
      FirstName: firstName,
      LastName: lastName,
      Address: address,
      Country: "United States",
      State: "NY",
      City: "Brooklyn",
      Zipcode: "11224",
      Mobile: 9294942233,
    });

    cy.url().should("include", "/account_created");
    accountCreatedPage.elements.pageHeader
      .should("be.visible")
      .and("have.text", "Account Created!");
    accountCreatedPage.elements.continueBtn.click();

    // 2.Go To Products
    topNavBar.goToProductsPage();

    // 3.Expand/Collapse category menu and check states
    productsPage.elements.womenCategory
      .click()
      .should("not.have.class", "collapsed");
    productsPage.elements.womenCategoryProducts.each((womenProduct, index) => {
      cy.wrap(womenProduct)
        .should("be.visible")
        .and("include.text", womenCategoryProdsList[index]);
    });
    cy.wait(500);
    productsPage.elements.womenCategory
      .click()
      .should("have.class", "collapsed");

    // 4.Search for "jeans"
    productsPage.searchFor("jeans");

    // 5.Verify results
    cy.wait("@searchResults").its("response.statusCode").should("eq", 200);
    cy.wait(500);
    productsPage.elements.searchResultsSection.within(() => {
      productsPage.elements.searchResultsHeader
        .should("be.visible")
        .and("include.text", "Searched Products");
      productsPage.elements.products
        .should("have.length", 3)
        .each((searchedProduct, index) => {
          cy.wrap(searchedProduct).should(
            "include.text",
            jeansSearchResultNames[index]
          );
        });
    });

    // 6.Add a product to the cart
    productsPage.elements.searchResultsSection.within(() => {
      productsPage.addToCart(jeansSearchResultNames[0]);
    });

    cy.wait("@addedToCard");
    cy.contains("Your product has been added to cart.").should("be.visible");
    cy.findByRole("button", { name: "Continue Shopping" }).click();

    productsPage.elements.searchResultsSection.within(() => {
      productsPage.addToCart(jeansSearchResultNames[1]);
    });

    cy.wait("@addedToCard");
    cy.contains("Your product has been added to cart.").should("be.visible");

    // 7.Verify cart
    cy.findByRole("link", { name: "View Cart" }).click();
    cy.get("table#cart_info_table").within(() => {
      cy.get("tbody > tr")
        .should("have.length", 2)
        .each((cartItem, i) => {
          cy.wrap(cartItem).within(() => {
            cy.findByRole("heading", {
              name: jeansSearchResultNames[i],
              level: 4,
            }).should("be.visible");
          });
        });

      // 8.Remove item from cart and verify
      cy.get("tbody > tr")
        .first()
        .within(() => {
          cy.get("td.cart_delete").within(() => {
            cy.get("a.cart_quantity_delete").click();
          });
        });

      cy.get("tbody > tr")
        .should("have.length", 1)
        .within(() => {
          cy.findByRole("heading", {
            name: jeansSearchResultNames[1],
            level: 4,
          }).should("be.visible");
        });

      // 9.Empty cart
      cy.get("tbody > tr").each((cartItem) => {
        cy.wrap(cartItem).within(() => {
          cy.get("td.cart_delete").within(() => {
            cy.get("a.cart_quantity_delete").click();
          });
        });
      });
    });
    cy.get("#empty_cart")
      .should("be.visible")
      .and("include.text", "Cart is empty!");

    // 10.Update user through the API --- I don't have enough information to perform this aciton

    // 11.Delete account
    topNavBar.elements.deleteAccountBtn.click();
    cy.findByTestId("account-deleted")
      .should("be.visible")
      .and("include.text", "Account Deleted!");
  });
});
