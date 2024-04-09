export class AccountCreatedPage {
  elements = {
    get continueBtn() {
      return cy.findByTestId("continue-button");
    },

    get pageHeader() {
      return cy.findByTestId("account-created");
    },
  };
}
