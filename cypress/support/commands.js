/*!
 * @Rafael Lopes Fonseca
 * date 05/16/2019
 * Desafio Técnico - QA Engineer
 */

Cypress.Commands.add("containsClick", (type, contains) => {
    cy.get(type)
        .contains(contains)
        .click();
});

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

Cypress.Commands.add("pageCreateSimulete", () => {
    cy.containsClick("span", "Simulados");

    cy.location().should((loc) => {
        expect(loc.href).to.eq(
            "http://professor.processoseletivo.enade.saraivaeducacao.com.br/mocks"
        );

        expect(loc.protocol).to.eq("http:");
        expect(loc.toString()).to.eq(
            "http://professor.processoseletivo.enade.saraivaeducacao.com.br/mocks"
        );
    });

    cy.containsClick("span", "Novo simulado");
});
