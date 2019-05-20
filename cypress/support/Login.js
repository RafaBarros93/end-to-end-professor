/*!
 * @Rafael Lopes Fonseca
 * date 05/16/2019
 * Desafio Técnico - QA Engineer
 */

Cypress.Commands.add("login", (login, password) => {
    if (login) {
        cy.get('input[name="teacher[email]"]', { timeout: 150000 }).type(login);

        if (password) {
            cy.get('input[name="teacher[password]"]', { timeout: 150000 }).type(
                password
            );
        }

        cy.containsClick("input", "Entrar");
    } else {
        cy.containsClick("input", "Entrar");
    }
});
