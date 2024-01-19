/// <reference types="cypress" />

import 'cypress-real-events';

import { DEFAULT_PW_LENGTH, PW_MAX_LENGTH, PW_MIN_LENGTH } from '../../src/utils/password-utils';

describe('Password generator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders with default settings', () => {
    cy.get('h1').should('be.visible');
    cy.checkInputValue('password-field', '');
    cy.get('[data-testid=copy-btn]').should('be.disabled');
    cy.checkInputValue('length-slider', DEFAULT_PW_LENGTH.toString());
    cy.checkInputValue('length-field', DEFAULT_PW_LENGTH.toString());
    cy.get('input[type="checkbox"]').each(($el) => {
      cy.wrap($el).should('be.checked');
    });
    cy.get('[data-testid=generate-btn]').should('be.enabled');
    cy.get('[data-testid=notification]').should('not.exist');
  });

  it('generates a password that meets the selected criteria', () => {
    cy.get('[data-testid=generate-btn]').click();
    cy.checkInputValue(
      'password-field',
      new RegExp(
        `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.]).{${DEFAULT_PW_LENGTH}}$`,
      ),
    );

    cy.get('[data-testid=lowercase-checkbox]').find('input').uncheck();
    cy.get('[data-testid=length-field]').clear();
    cy.get('[data-testid=length-field]').type(PW_MAX_LENGTH.toString());
    cy.get('[data-testid=generate-btn]').click();
    cy.checkInputValue(
      'password-field',
      new RegExp(`^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.]).{${PW_MAX_LENGTH}}$`),
    );

    cy.get('[data-testid=uppercase-checkbox]').find('input').uncheck();
    cy.get('[data-testid=length-field]').clear();
    cy.get('[data-testid=length-field]').type(PW_MIN_LENGTH.toString());
    cy.get('[data-testid=generate-btn]').click();
    cy.checkInputValue(
      'password-field',
      new RegExp(`^(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.]).{${PW_MIN_LENGTH}}$`),
    );

    cy.get('[data-testid=symbols-checkbox]').find('input').uncheck();
    cy.get('[data-testid=length-slider]').find('input').focus();
    cy.get('[data-testid=length-slider]').realType('{rightarrow}');
    cy.get('[data-testid=generate-btn]').click();
    cy.checkInputValue('password-field', new RegExp(`^(?=.*[0-9]).{${PW_MIN_LENGTH + 1}}$`));
  });

  it('copies the password and renders notification', () => {
    cy.get('[data-testid=generate-btn]').click();
    cy.get('[data-testid=copy-btn]').focus();
    cy.get('[data-testid=copy-btn]').realClick();
    cy.get('[data-testid=copy-btn]').should('be.disabled');
    cy.get('[data-testid=notification]').should('be.visible');
    cy.get('[data-testid=password-field]')
      .find('input')
      .invoke('val')
      .then(async (fieldText) => {
        cy.window().then(async (win) => {
          await win.navigator.clipboard.readText().then((text) => {
            expect(text).to.equal(fieldText);
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

  it('enforces a minimum and maximum password length', () => {
    cy.get('[data-testid=length-field]').find('input').clear();
    cy.get('[data-testid=length-field]').type(`${PW_MIN_LENGTH - 1}`);
    cy.get('[data-testid=generate-btn]').realClick();
    cy.checkInputValue('length-field', PW_MIN_LENGTH.toString());
    cy.checkInputValue(
      'password-field',
      new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.]).{${PW_MIN_LENGTH}}$`),
    );

    cy.get('[data-testid=length-field]').clear();
    cy.get('[data-testid=length-field]').type(`${PW_MAX_LENGTH + 1}`);
    cy.get('[data-testid=generate-btn]').realClick();
    cy.checkInputValue('length-field', PW_MAX_LENGTH.toString());
    cy.checkInputValue(
      'password-field',
      new RegExp(`^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*-_=+<>,.]).{${PW_MAX_LENGTH}}$`),
    );
  });

  it('does not generate the same password twice in a row', () => {
    cy.get('[data-testid=generate-btn]').click();
    cy.get('[data-testid=password-field]')
      .find('input')
      .invoke('val')
      .then((firstPassword) => {
        cy.get('[data-testid=generate-btn]').click();
        cy.get('[data-testid=password-field]')
          .find('input')
          .invoke('val')
          .then((secondPassword) => {
            expect(firstPassword).not.to.equal(secondPassword);
          });
      });
  });

  it('hides the notification when a new password is generated', () => {
    cy.get('[data-testid=generate-btn]').click();
    cy.get('[data-testid=copy-btn]').focus();
    cy.get('[data-testid=copy-btn]').realClick();
    cy.get('[data-testid=notification]').should('be.visible');
    cy.get('[data-testid=generate-btn]').click();
    cy.get('[data-testid=notification]').should('not.exist');
  });
});
