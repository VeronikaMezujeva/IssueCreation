import { faker } from '@faker-js/faker';

const title = faker.lorem.words({ min: 2, max: 5 });
const description = faker.lorem.sentence();
const estimatedHours = '10';
const updatedEstimatedHours = '20';

describe('Time tracking', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');
            inputCreateIssue()
        });
    });
  });

    it('Add, edit and remove time estimation', () => {
        const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

        //Add time estimation
        getIssueDetailsModal().within(() => {
            cy.contains('No time logged').should('exist');
            cy.get('input[placeholder="Number"]').should('be.empty').click().type(estimatedHours);
            cy.contains(`${estimatedHours}h estimated`);
            cy.get('[data-testid="icon:close"]').first().click();

            //Assert that estimated time is successfully added
            cy.get('[data-testid="board-list:backlog').contains(title).click();
            cy.get('input[placeholder="Number"]').should('have.value', estimatedHours);
            cy.get('[data-testid="modal:issue-details"]').contains(`${estimatedHours}h estimated`);
            cy.get('[data-testid="icon:close"]').first().click();

            //Edit time estimation
            cy.get('[data-testid="board-list:backlog').contains(title).click();
            cy.get('input[placeholder="Number"]').should('have.value', estimatedHours).click().clear();
            cy.get('input[placeholder="Number"]').type(updatedEstimatedHours);
            cy.get('[data-testid="modal:issue-details"]').contains(`${updatedEstimatedHours}h estimated`);
            cy.get('[data-testid="icon:close"]').first().click();

            //Assert that estimated time is updated
            cy.get('[data-testid="board-list:backlog').contains(title).click();
            cy.get('input[placeholder="Number"]').should('have.value', updatedEstimatedHours);
            cy.get('[data-testid="modal:issue-details"]').contains;
            cy.get('[data-testid="icon:close"]').first().click();

            //Remove time estimation
            cy.get('[data-testid="board-list:backlog').contains(title).click();
            cy.get('[data-testid="modal:issue-details"]').should('be.visible').within(() => {
                cy.get('input[placeholder="Number"]').click().clear();
                cy.log
                cy.contains(`${updatedEstimatedHours}h estimated`).should('not.exist');
                cy.get('[data-testid="icon:close"]').first().click();
            });
            //Assert that estimated time is removed
            cy.get('[data-testid="board-list:backlog').contains(title).click();
            cy.get('[data-testid="modal:issue-details"]').should('be.visible');
            cy.get('input[placeholder="Number"]').should('have.value', '');
            cy.contains('No time logged').should('exist');
            cy.get('[data-testid="icon:close"]').first().click();
        });
    });

    function inputCreateIssue() {
        cy.get('.ql-container').type(description)
        cy.get('input[name="title"]').type(title)
        cy.get('[data-testid="select:type"]').click();
        cy.get('[data-testid="icon:bug"]').trigger('click')
        cy.get('[data-testid="select:userIds"]').click()
        cy.get('[data-testid="select-option:Pickle Rick"]').click()
        cy.get('[data-testid="select:priority"]').click()
        cy.get('[data-testid="select-option:Highest"]').click()
        cy.get('button[type="submit"]').click()
    };
