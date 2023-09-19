import { faker } from '@faker-js/faker';

describe('Deleting an issue', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('Task').click();
    });
  });

  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

  it('Delete first issue from the board', () => {
    getIssueDetailsModal()
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]')
      .contains('button', 'Delete issue')
      .click()
      .should('not.exist');
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '3');
    });
  });

  it('Issue Deletion Cancellation', () => {
    getIssueDetailsModal()
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]')
      .contains('button', 'Cancel')
      .click()
      .should('not.exist');
    cy.get('[data-testid="modal:issue-details"]');
    cy.get('[data-testid="icon:close"]').eq(0).click();
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '4');
    });
  });
});