import IssueModal from "../../pages/IssueModal";

const issueTitle = 'This is an issue of type: Task.';
const amountOfIssuesAfterDeletion = '3';
const amountOfIssuesAfterCancelDeletion = '4';

describe('Issue delete in POM', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      cy.contains(issueTitle).click();
    });
  });

  it('Should delete first issue successfully', () => {
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.ensureIssueIsDeletedFromTheBoard(amountOfIssuesAfterDeletion);
  });

  it('Should cancel deletion process successfully', () => {
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();
    IssueModal.validateAmountOfIssuesAfterCancelation(amountOfIssuesAfterCancelDeletion);
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle) 
  });
});