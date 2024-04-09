export class TopNavigationBar {
  elements = {
    get btnsList() {
      return cy.findAllByRole("list").filter('[class="nav navbar-nav"]');
    },

    get deleteAccountBtn() {
      return cy.findByRole("link", { name: /Delete Account/ });
    },

    get homeBtn() {
      return cy.findByRole("link", { name: /Home/ });
    },

    get productsBtn() {
      return cy.findByRole("link", { name: /Products/ });
    },

    get cartBtn() {
      return cy.findByRole("link", { name: /Cart/ });
    },

    get signupLoginBtn() {
      return cy.findByRole("link", { name: /Signup \/ Login/ });
    },

    get testCasesBtn() {
      return cy.findByRole("link", { name: /Test Cases/ });
    },
  };

  goToSignupLoginPage() {
    this.elements.btnsList.within(() => {
      this.elements.signupLoginBtn.click();
    });
  }

  goToProductsPage() {
    this.elements.btnsList.within(() => {
      this.elements.productsBtn.click();
    });
  }
}
