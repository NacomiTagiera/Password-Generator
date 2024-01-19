/* eslint-disable */
/// <reference types="cypress" />

Cypress.Commands.add('checkInputValue', (id: string, value: string | RegExp) => {
  cy.get(`[data-testid=${id}]`)
    .find('input')
    .invoke('val')
    .then((text) => {
      typeof value === 'string' ? expect(text).to.equal(value) : expect(text).to.match(value);
    });
});

declare namespace Cypress {
  interface Chainable {
    checkInputValue(id: string, value: string | RegExp): Chainable<Element>;
  }
}
