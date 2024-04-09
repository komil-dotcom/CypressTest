export class ProductsPage {
  elements = {
    get addToCartBtn() {
      return cy.get('[class="btn btn-default add-to-cart"]').first();
    },

    get products() {
      return cy.get(".single-products");
    },

    get searchProductInput() {
      return cy.get("#search_product");
    },

    get searchResultsSection() {
      return cy.get(".features_items");
    },

    get searchResultsHeader() {
      return cy.findByRole("heading", { name: /Searched Products/i, level: 2 });
    },

    get submitSearchBtn() {
      return cy.get("#submit_search");
    },

    get womenCategory() {
      return cy.findByRole("link", { name: /women/i });
    },

    get womenCategoryProducts() {
      return cy.get("#Women").within(() => {
        cy.get("ul > li > a");
      });
    },
  };

  addToCart(productName: string) {
    this.elements.products.filter(`:contains("${productName}")`).within(() => {
      this.elements.addToCartBtn.click();
    });
  }

  searchFor(item: string) {
    this.elements.searchProductInput.type(item);
    this.elements.submitSearchBtn.click();
  }
}
