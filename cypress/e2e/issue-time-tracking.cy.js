import { faker } from '@faker-js/faker';

describe('Time tracking', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true')
            inputCreateIssue()
        });
    });


    it('Add, edit and remove time estimation', () => {

        //Add time estimation
        cy.get('[data-testid="board-list:backlog').contains(title).click()
        cy.contains('No time logged').should('exist')
        cy.get('input[placeholder="Number"]').should('be.empty').click().type(estimatedHours)
        cy.contains(`${estimatedHours}h estimated`)
        cy.get('[data-testid="icon:close"]').first().click()

        //Assert that estimated time is added
        cy.get('[data-testid="board-list:backlog').contains(title).click()
        cy.get('input[placeholder="Number"]').should('have.value', estimatedHours)
        cy.get('[data-testid="modal:issue-details"]').contains(`${estimatedHours}h estimated`)
        cy.get('[data-testid="icon:close"]').first().click()

        //Edit time estimation
        cy.get('[data-testid="board-list:backlog').contains(title).click()
        cy.get('input[placeholder="Number"]').should('have.value', estimatedHours).click().clear()
        cy.get('input[placeholder="Number"]').type(updatedEstimatedHours)
        cy.get('[data-testid="modal:issue-details"]').contains(`${updatedEstimatedHours}h estimated`)
        cy.get('[data-testid="icon:close"]').first().click()

        //Assert that estimated time is updated
        cy.get('[data-testid="board-list:backlog').contains(title).click()
        cy.get('input[placeholder="Number"]').should('have.value', updatedEstimatedHours)
        cy.get('[data-testid="modal:issue-details"]').contains
        cy.get('[data-testid="icon:close"]').first().click()

        //Remove time estimation
        cy.get('[data-testid="board-list:backlog').contains(title).click();
        cy.get('[data-testid="modal:issue-details"]').should('be.visible').within(() => {
            cy.get('input[placeholder="Number"]').click().clear()
            cy.log
            cy.contains(`${updatedEstimatedHours}h estimated`).should('not.exist')
            cy.get('[data-testid="icon:close"]').first().click()
        });
        //Assert that estimated time is removed
        cy.get('[data-testid="board-list:backlog').contains(title).click()
        cy.get('[data-testid="modal:issue-details"]').should('be.visible')
        cy.get('input[placeholder="Number"]').should('have.value', '')
        cy.contains('No time logged').should('exist')
        cy.get('[data-testid="icon:close"]').first().click()

    });


    it('Add and remove spent time', () => {

        //Add logged time
        issueAddEstimatedTime()
        cy.get('[data-testid="modal:tracking"]').should('exist').within(() => {
            cy.get('input[placeholder="Number"]').eq(0).should('be.empty').click().type(timeSpent)
            cy.get('input[placeholder="Number"]').eq(1).should('be.empty').click().type(timeRemaining)
            cy.wait(1000)
            cy.contains('button', 'Done')
                .click()
                .should('not.exist')
        });

        //Assert logged time
        cy.get('[data-testid="modal:issue-details"]').contains(`${timeSpent}h logged`)
        cy.get('[data-testid="modal:issue-details"]').contains(`${timeRemaining}h remaining`)
        cy.get('[data-testid="icon:close"]').first().click()

        //Remove logged time
        issueRemoveEstimatedTime()
        cy.get('[data-testid="modal:tracking"]').should('exist').within(() => {
            cy.get('input[placeholder="Number"]').eq(0).click().clear()
            cy.get('input[placeholder="Number"]').eq(1).click().clear()
            cy.wait(1000)
            cy.contains('button', 'Done')
                .click()
                .should('not.exist')
        });

        //Assert logged time
        cy.contains('No time logged').should('exist')
        cy.get('[data-testid="modal:issue-details"]').contains(`${estimatedHours}h estimated`)
        cy.get('[data-testid="icon:close"]').first().click()
    });
});

const title = faker.lorem.words({ min: 2, max: 5 })
const description = faker.lorem.sentence()
const estimatedHours = '10'
const updatedEstimatedHours = '20'
const timeSpent = '2'
const timeRemaining = '5'

function inputCreateIssue() {
    cy.get('.ql-container').type(description)
    cy.get('input[name="title"]').type(title)
    cy.get('[data-testid="select:type"]').click()
    cy.get('[data-testid="icon:bug"]').trigger('click')
    cy.get('[data-testid="select:userIds"]').click()
    cy.get('[data-testid="select-option:Pickle Rick"]').click()
    cy.get('[data-testid="select:priority"]').click()
    cy.get('[data-testid="select-option:Highest"]').click()
    cy.get('button[type="submit"]').click()
    cy.get('[data-testid="modal:issue-create"]').should('not.exist')
    cy.contains('Issue has been successfully created.').should('be.visible')
    cy.reload()
    cy.contains('Issue has been successfully created.').should('not.exist')
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
        cy.get('[data-testid="list-issue"]')
            .should('have.length', '5')
            .first()
            .find('p')
            .contains(title)
    });
};

function issueAddEstimatedTime() {
    cy.visit('/project/board')
    cy.get('[data-testid="list-issue"]')
        .first()
        .find('p')
        .click()
    cy.get('[data-testid="modal:issue-details"]').should('be.visible').within(() => {
        cy.get('[placeholder="Number"]').click().type(estimatedHours)
        cy.contains(`${estimatedHours}h estimated`)
        cy.contains('No time logged').should('exist').click()
    });
};

function issueRemoveEstimatedTime() {
    cy.visit('/project/board')
    cy.get('[data-testid="list-issue"]')
        .first()
        .find('p')
        .click()
    cy.get('[data-testid="modal:issue-details"]').should('be.visible')
    cy.contains(`${timeSpent}h logged`).click()
};