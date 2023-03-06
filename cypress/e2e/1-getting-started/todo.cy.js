/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress
// import ANTDataAtributes from '../../../src/components/AutomaticThoughts'
// had trouble importing this and getting autocomplete
// so duplicated it
// TODO fix the duplicaiton here between this attr here and in component

export const ANTDataAtributes = {
  addAntLabel: "addAntLabel",
  addAntInput: "addAntInput",
  toggleHotAntBtn: "toggleHotAntBtn",
  addAntBtn: "addAntBtn",
  deleteAntBtn: "deleteAntBtn",
};
describe("Login page", () => {
  before(() => {
    cy.log(`Visiting https://company.tld`);
    cy.visit("/");
  });
  it("Login with Google", () => {
    const username = Cypress.env("GOOGLE_USER");
    const password = Cypress.env("GOOGLE_PW");
    const loginUrl = Cypress.env("SITE_NAME");
    const cookieName = Cypress.env("COOKIE_NAME");
    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      headless: true,
      logs: false,
      isPopup: true,

      loginSelector: `a[href="${Cypress.env(
        "SITE_NAME"
      )}/api/auth/signin/google"]`,
      postLoginSelector: "#home-title",
    };
    // TODO ok this login selector times out im not sure how to do this.
    return cy
      .task("GoogleSocialLogin", socialLoginOptions)
      .then(({ cookies }) => {
        cy.clearCookies();

        const cookie = cookies
          .filter((cookie) => cookie.name === cookieName)
          .pop();
        if (cookie) {
          cy.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            expiry: cookie.expires,
            httpOnly: cookie.httpOnly,
            path: cookie.path,
            secure: cookie.secure,
          });

          Cypress.Cookies.defaults({
            preserve: cookieName,
          });

          // remove the two lines below if you need to stay logged in
          // for your remaining tests
          cy.visit("/api/auth/signout");
          cy.get("form").submit();
        }
      });
  });
});
describe("Navigation", () => {
  it("should navigate to the create page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing "about" and click it
    cy.get('[data-testid="create-link"]').click();
    // cy.get('a[href*="create"]').click();

    // The new url should include "/create"
    cy.url().should("include", "/create");

    // The new page should contain an h1 with "About page"
    cy.get("h1").contains("New CBT Journal");
  });
});

describe("MultiStepForm", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-testid="create-link"]').click();
  });

  it("should display the first step of the form", () => {
    cy.get("label").contains("CBT Journal Title").should("exist");
    cy.get("label").contains("Select Your Mood").should("exist");
    cy.get("label").contains("Rate Your Mood Intensity").should("exist");
    cy.get("button").get('[data-testid="next-btn"]').should("exist");
    cy.get("button").get('[data-testid="prev-btn"]').should("be.disabled");
  });

  it("should move to the second step of the form", () => {
    cy.get('input[name="name"]').type("John Doe");
    // cy.get(".css-qbdosj-Input").select("happy");
    // TODO make this work
    //https://stackoverflow.com/questions/55046835/select-react-select-dropdown-list-option-using-cypress
    // The trick was to {enter}

    cy.get("#react-select-3-input").type("happy{enter}");
    cy.get('input[name="moodRating"]').type("22");

    cy.get("button").get('[data-testid="next-btn"]').click();
    cy.get("button").get('[data-testid="prev-btn"]').should("be.enabled");

    cy.get(`[data-testid=${ANTDataAtributes.addAntInput}]`).type(
      "Im having a hot thought bro!"
    );

    cy.get(`[data-testid=${ANTDataAtributes.addAntBtn}]`).click();

    cy.get(`[data-testid=${ANTDataAtributes.toggleHotAntBtn}]`).click();

    cy.get(`[data-testid=${ANTDataAtributes.addAntBtn}]`).click();

    //this is not quite right would have to get length of array somehow
    // cy.get(`[data-testid=${ANTDataAtributes.deleteAntBtn}]`).should('have.length', 1);

    cy.get("label").contains("Automatic Thoughts").should("exist");
    // cy.get("label").contains("Choose The Hot Thought").should("exist");

    // ok missing labels here should check for them perhaps

    cy.get(`[data-testid="${ANTDataAtributes.toggleHotAntBtn}"]`).click();

    cy.get(`[data-testid="${ANTDataAtributes.addAntBtn}"]`).click();

    cy.get("button").get('[data-testid="next-btn"]').click();

    cy.get(`[data-testid=${"evidenceFor"}]`).type("Its pretty hot thats why");
    cy.get("button").get('[data-testid="next-btn"]').click();
    cy.get(`[data-testid=${"evidenceAgainst"}]`).type(
      "Nah Man it is not thats why"
    );

    cy.get("button").get('[data-testid="next-btn"]').click();
    cy.get(`[data-testid=${"newBalancedThoughtInput"}]`).type(
      "Ok maybe its in the middle then not hot not cold"
    );

    cy.get("button").get('[data-testid="next-btn"]').click();

    cy.get(`[data-testid=${"rateBeliefInput"}]`).type(22);
    cy.get(`[data-testid=${"rerateMoodInput"}]`).type(68);

    cy.get("button").get('[data-testid="submit-btn"]').click();
    // For not logged in user attempt...
    // TODO set up test of db and authed userflow
    cy.url().should("include", "/create");

    cy.contains("You must log in to save your journal!").should("exist");

    // TODO continue this process of getting and typing in the inputs
    // until get to end of form then test the submit somehow

    // TODO also see that the highger level of abstraction via an interface can be used to type
    // the strings for both the names for the inputs and the data attrs it could be the same and this will make
    // it easier to handle
    //can see how that would help to have a common interface for all of that
    // Also for testing submit can check taht the react toast displays by looking for the id? maybe.
    // and that in a way tests the db esp if i then check the update page has the correct data
    // that would accomplish a data base check for create and update form is entered
    //  then can repeat for updating some things
    // maybe make some reusable functions for filling out the forms...

    // also tighten this up with better constants and imports
    // add the missing labels also investigate accessibility

    // cy.get("button").contains("Previous").should("exist");
    // cy.get("button").contains("Submit").should("exist");
  });

  // it("should move to the third step of the form", () => {
  //   // step one
  //   cy.get('input[name="name"]').type("John Doe");
  //   cy.get("#react-select-3-input").type("happy{enter}");
  //   cy.get('input[name="moodRating"]').type("22");

  //   cy.get("button").get('[data-testid="next-btn"]').click();

  //   //step two

  //   cy.get("label").contains("Message:").should("exist");
  //   cy.get("button").contains("Previous").should("exist");
  //   cy.get("button").contains("Submit").should("exist");
  // });

  // it("should submit the form data", () => {
  //   cy.get('input[name="name"]').type("Test title");
  //   cy.get('input[name="name"]').type("Test title");

  //   cy.get('textarea[name="message"]').type("This is a test message");
  //   cy.get("button").contains("Submit").click();
  //   cy.contains("Form data submitted!").should("exist");
  // });
});
// Prevent TypeScript from reading file as legacy script
export {};

// describe("example to-do app", () => {
//   beforeEach(() => {
//     // Cypress starts out with a blank slate for each test
//     // so we must tell it to visit our website with the `cy.visit()` command.
//     // Since we want to visit the same URL at the start of all our tests,
//     // we include it in our beforeEach function so that it runs before each test
//     cy.visit("https://example.cypress.io/todo");
//   });

//   it("displays two todo items by default", () => {
//     // We use the `cy.get()` command to get all elements that match the selector.
//     // Then, we use `should` to assert that there are two matched items,
//     // which are the two default items.
//     cy.get(".todo-list li").should("have.length", 2);

//     // We can go even further and check that the default todos each contain
//     // the correct text. We use the `first` and `last` functions
//     // to get just the first and last matched elements individually,
//     // and then perform an assertion with `should`.
//     cy.get(".todo-list li").first().should("have.text", "Pay electric bill");
//     cy.get(".todo-list li").last().should("have.text", "Walk the dog");
//   });

//   it("can add new todo items", () => {
//     // We'll store our item text in a variable so we can reuse it
//     const newItem = "Feed the cat";

//     // Let's get the input element and use the `type` command to
//     // input our new list item. After typing the content of our item,
//     // we need to type the enter key as well in order to submit the input.
//     // This input has a data-test attribute so we'll use that to select the
//     // element in accordance with best practices:
//     // https://on.cypress.io/selecting-elements
//     cy.get("[data-test=new-todo]").type(`${newItem}{enter}`);

//     // Now that we've typed our new item, let's check that it actually was added to the list.
//     // Since it's the newest item, it should exist as the last element in the list.
//     // In addition, with the two default items, we should have a total of 3 elements in the list.
//     // Since assertions yield the element that was asserted on,
//     // we can chain both of these assertions together into a single statement.
//     cy.get(".todo-list li")
//       .should("have.length", 3)
//       .last()
//       .should("have.text", newItem);
//   });

//   it("can check off an item as completed", () => {
//     // In addition to using the `get` command to get an element by selector,
//     // we can also use the `contains` command to get an element by its contents.
//     // However, this will yield the <label>, which is lowest-level element that contains the text.
//     // In order to check the item, we'll find the <input> element for this <label>
//     // by traversing up the dom to the parent element. From there, we can `find`
//     // the child checkbox <input> element and use the `check` command to check it.
//     cy.contains("Pay electric bill")
//       .parent()
//       .find("input[type=checkbox]")
//       .check();

//     // Now that we've checked the button, we can go ahead and make sure
//     // that the list element is now marked as completed.
//     // Again we'll use `contains` to find the <label> element and then use the `parents` command
//     // to traverse multiple levels up the dom until we find the corresponding <li> element.
//     // Once we get that element, we can assert that it has the completed class.
//     cy.contains("Pay electric bill")
//       .parents("li")
//       .should("have.class", "completed");
//   });

//   context("with a checked task", () => {
//     beforeEach(() => {
//       // We'll take the command we used above to check off an element
//       // Since we want to perform multiple tests that start with checking
//       // one element, we put it in the beforeEach hook
//       // so that it runs at the start of every test.
//       cy.contains("Pay electric bill")
//         .parent()
//         .find("input[type=checkbox]")
//         .check();
//     });

//     it("can filter for uncompleted tasks", () => {
//       // We'll click on the "active" button in order to
//       // display only incomplete items
//       cy.contains("Active").click();

//       // After filtering, we can assert that there is only the one
//       // incomplete item in the list.
//       cy.get(".todo-list li")
//         .should("have.length", 1)
//         .first()
//         .should("have.text", "Walk the dog");

//       // For good measure, let's also assert that the task we checked off
//       // does not exist on the page.
//       cy.contains("Pay electric bill").should("not.exist");
//     });

//     it("can filter for completed tasks", () => {
//       // We can perform similar steps as the test above to ensure
//       // that only completed tasks are shown
//       cy.contains("Completed").click();

//       cy.get(".todo-list li")
//         .should("have.length", 1)
//         .first()
//         .should("have.text", "Pay electric bill");

//       cy.contains("Walk the dog").should("not.exist");
//     });

//     it("can delete all completed tasks", () => {
//       // First, let's click the "Clear completed" button
//       // `contains` is actually serving two purposes here.
//       // First, it's ensuring that the button exists within the dom.
//       // This button only appears when at least one task is checked
//       // so this command is implicitly verifying that it does exist.
//       // Second, it selects the button so we can click it.
//       cy.contains("Clear completed").click();

//       // Then we can make sure that there is only one element
//       // in the list and our element does not exist
//       cy.get(".todo-list li")
//         .should("have.length", 1)
//         .should("not.have.text", "Pay electric bill");

//       // Finally, make sure that the clear button no longer exists.
//       cy.contains("Clear completed").should("not.exist");
//     });
//   });
// });
