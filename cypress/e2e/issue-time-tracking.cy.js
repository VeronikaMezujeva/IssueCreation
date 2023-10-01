import { faker } from '@faker-js/faker';
const title = faker.lorem.word();
const description = faker.lorem.words();

describe('Time tracking', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');
        });
    });

    it('assert that issue is created, add time estimation and validate it', () => {
        const getIssueCreateModal = () => cy.get('[data-testid="modal:issue-create"]');
        const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

        //Assert that issue is successfully created
        getIssueDetailsModal().within(() => {
            cy.get('.ql-container').type(description);
            cy.get('input[name="title"]').type(title);
            cy.get('[data-testid="select:type"]').click();
            cy.get('[data-testid="icon:bug"]').trigger('click');
            cy.get('[data-testid="select:userIds"]').click();
            cy.get('[data-testid="select-option:Pickle Rick"]').click();
            cy.get('[data-testid="select:priority"]').click();
            cy.get('[data-testid="select-option:Highest"]').click();
            cy.get('button[type="submit"]').click();
            cy.get('[data-testid="modal:issue-create"]').should('not.exist');
            cy.contains('Issue has been successfully created.').should('be.visible');
            cy.reload();
            cy.contains('Issue has been successfully created.').should('not.exist');
            cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
                cy.get('[data-testid="list-issue"]')
                    .should('have.length', '5')
                    .first()
                    .find('p')
                    .contains(title);
                cy.get('[data-testid="avatar:Pickle Rick"]').eq(0).should('be.visible');
                cy.get('[data-testid="icon:arrow-up"]').eq(0).should('be.visible');
                cy.get('[data-testid="icon:bug"]').eq(0).should('be.visible');
            });      

        //Add time estimation
        cy.get('[data-testid="board-list:backlog').should('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]')
                .should('have.length', '5').first().click();
            cy.contains('No time logged').should('exist');
            cy.get('[placeholder="Number"]').type(10);
            cy.contains('10h estimated');
            cy.get('[data-testid="icon:close"]').first().click();
        });
        //Assert that estimated time is successfully added
        cy.get('[data-testid="modal:issue-details"]').should('not.exist');
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]')
                .should('have.length', '5').first().click();

            cy.get('[placeholder="Number"]').contains(10);
            cy.get('[data-testid="modal:issue-details"]').contains('10h estimated');
            cy.get('[data-testid="icon:close"]').first().click();
        });
        //Edit time estimation
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]')
                .should('have.length', '5').first().click();

            cy.get('[placeholder="Number"]').click().clear();
            cy.get('[placeholder="Number"]').type(20);
            cy.get('[data-testid="modal:issue-details"]').should('contain', '20h estimated');
            cy.get('[data-testid="icon:close"]').first().click();
        });
        //Assert that estimated time is updated
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]')
            cy.should('have.length', '5').first().click();
        });
        cy.get('[data-testid="modal:issue-details"]').should('be.visible').within(() => {
            cy.get('[data-testid="icon:stopwatch"]')
            cy.contains('20h estimated');
            cy.get('[data-testid="icon:close"]').first().click();
        });
        //Remove time estimation
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]')
                .should('have.length', '5').first().click();
        });
        cy.get('[data-testid="modal:issue-details"]').should('be.visible').within(() => {
            cy.get('[placeholder="Number"]').click().clear();
            cy.log
            cy.contains('20h estimated').should('not.exist');
            cy.get('[data-testid="icon:close"]').first().click();
        });
        //Assert that estimated time is removed
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]')
                .should('have.length', '5').first().click();

            cy.get('[data-testid="modal:issue-details"]').should('be.visible');
            cy.get('[placeholder="Number"]').should('have.value', '');
    
        });
    });
