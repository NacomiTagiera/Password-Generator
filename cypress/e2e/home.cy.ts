/// <reference types="cypress" />

import { DEFAULT_PW_LENGTH } from '../../src/utils/password-utils';

describe('Password generator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders with default settings', () => {
    cy.get('h1').should('be.visible');
    cy.get('[data-testid=password-field]').should('have.value', '');
    cy.get('[data-testid=copy-btn]').should('be.disabled');
    cy.get('[data-testid=length-slider]')
      .children()
      .should('have.attr', 'aria-valuenow', DEFAULT_PW_LENGTH);
    cy.get('[data-testid=length-field]').should('have.value', DEFAULT_PW_LENGTH);
    cy.get('input[type="checkbox"]').each(($el) => {
      cy.wrap($el).should('be.checked');
    });
    cy.get('[data-testid=generate-btn]').should('be.enabled');
    cy.get('[data-testid=notification]').should('not.exist');
  });

  it('generates a password that meets the selected criteria', () => {
    cy.get('[data-testid=length-slider]').invoke('val', 6).trigger('change');
    cy.get('[data-testid=generate-btn]').click();
    cy.get('[data-testid=password-field]')
      .should('have.value', /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.])/)
      .and('have.length', 6);

    cy.get('[data-testid=include-lowercase]').uncheck();
    cy.get('[data-testid=generate-btn]').click();
    cy.get('[data-testid=password-field]').should(
      'have.value',
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.])/,
    );

    cy.get('[data-testid=include-uppercase]').uncheck();
    cy.get('[data-testid=generate-btn]').click();
    cy.get('[data-testid=password-field]').should(
      'have.value',
      /^(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.])/,
    );

    cy.get('[data-testid=include-symbols]').uncheck();
    cy.get('[data-testid=generate-btn]').click();
    cy.get('[data-testid=password-field]').should('have.value', /^(?=.*[0-9])/);
  });

  it('copies the password and renders notification', () => {
    cy.get('[data-testid=generate-btn]').click();
    cy.get('[data-testid=copy-btn]').click();
    cy.get('[data-testid=copy-btn]').should('be.disabled');
    cy.get('[data-testid=notification]').should('be.visible');
    cy.get('[data-testid=password-field]').then(async ($el) => {
      cy.window().then(async (win) => {
        await win.navigator.clipboard.readText().then((text) => {
          expect(text).to.equal($el.val());
        });
      });
    });
  });

  it('disables generate button when all checkboxes are unchecked', () => {
    cy.get('input[type="checkbox"]').each(($el) => {
      cy.wrap($el).uncheck();
    });
    cy.get('[data-testid=generate-btn]').should('be.disabled');
  });

  it('does not generate the same password twice in a row', () => {
    cy.get('[data-testid=length-slider]').invoke('val', 6).trigger('change');
    cy.get('[data-testid=generate-btn]').click();
    cy.get('[data-testid=password-field]').then(($el) => {
      const firstPassword = $el.val();
      cy.get('[data-testid=generate-btn]').click();
      cy.get('[data-testid=password-field]').then(($el) => {
        const secondPassword = $el.val();
        expect(firstPassword).not.to.equal(secondPassword);
      });
    });
  });

  it('hides the notification when a new password is generated', () => {
    cy.get('[data-testid=generate-btn]').click();
    cy.get('[data-testid=copy-btn]').click();
    cy.get('[data-testid=notification]').should('be.visible');
    cy.get('[data-testid=generate-btn]').click();
    cy.get('[data-testid=notification]').should('not.exist');
  });
});
