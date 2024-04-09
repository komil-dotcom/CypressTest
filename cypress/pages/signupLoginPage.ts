import { UserDetails } from "../types/user";

export class SignupLoginPage {
  elements = {
    get addressTxtBox() {
      return cy.findByTestId("address");
    },

    get cityTxtBox() {
      return cy.findByTestId("city");
    },

    get createAcountBtn() {
      return cy.findByTestId("create-account");
    },

    get firstNameTxtBox() {
      return cy.findByTestId("first_name");
    },

    get emailTxtBox() {
      return cy.findByTestId("email");
    },

    get lastNameTxtBox() {
      return cy.findByTestId("last_name");
    },

    get mobileNumTxtBox() {
      return cy.findByTestId("mobile_number");
    },

    get nameTxtBox() {
      return cy.findByTestId("name");
    },

    get newsletterChkBox() {
      return cy.findByRole("checkbox", { name: "Sign up for our newsletter!" });
    },

    get passwordTxtBox() {
      return cy.findByTestId("password");
    },

    get radioBtnMr() {
      return cy.get("#id_gender1");
    },

    get radioBtnMrs() {
      return cy.get("#id_gender2");
    },

    get selectCountry() {
      return cy.findByTestId("country");
    },

    get selectDay() {
      return cy.findByTestId("days");
    },

    get selectMonth() {
      return cy.findByTestId("months");
    },

    get selectYear() {
      return cy.findByTestId("years");
    },

    get signUpBtn() {
      return cy.findByTestId("signup-button");
    },

    get singUpEmailTxtBox() {
      return cy.findByTestId("signup-email");
    },

    get signUpNameTxtBox() {
      return cy.findByTestId("signup-name");
    },

    get specialOffers() {
      return cy.get("#optin");
    },

    get stateTxtBox() {
      return cy.findByTestId("state");
    },

    get zipCodeTxtBox() {
      return cy.findByTestId("zipcode");
    },
  };

  createAccountFor(newUserDetails: UserDetails) {
    newUserDetails.Title
      ? this.elements.radioBtnMr.click()
      : this.elements.radioBtnMrs.click();
    this.elements.passwordTxtBox.type(newUserDetails.Password);
    this.elements.selectDay.select(newUserDetails.dob.getDate());
    this.elements.selectMonth.select(newUserDetails.dob.getMonth());
    this.elements.selectYear.select(
      newUserDetails.dob.getFullYear().toString()
    );
    if (newUserDetails.Newsletter) this.elements.newsletterChkBox.check();
    if (newUserDetails.SpecialOffers) this.elements.specialOffers.check();
    this.elements.firstNameTxtBox.type(newUserDetails.FirstName);
    this.elements.lastNameTxtBox.type(newUserDetails.LastName);
    this.elements.addressTxtBox.type(newUserDetails.Address);
    this.elements.selectCountry.select(newUserDetails.Country);
    this.elements.stateTxtBox.type(newUserDetails.State);
    this.elements.cityTxtBox.type(newUserDetails.City);
    this.elements.zipCodeTxtBox.type(newUserDetails.Zipcode);
    this.elements.mobileNumTxtBox.type(newUserDetails.Mobile.toString());
    this.elements.createAcountBtn.click();
  }

  newUserSignUp(fullName: string, email: string) {
    this.elements.signUpNameTxtBox.type(fullName);
    this.elements.singUpEmailTxtBox.type(email);
    this.elements.signUpBtn.click();
  }
}
