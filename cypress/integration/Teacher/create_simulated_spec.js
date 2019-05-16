/*!
 * @Rafael Lopes Fonseca
 * date 05/16/2019
 * Desafio Técnico - QA Engineer
 */

describe("Login", () => {
    beforeEach(() => {
        cy.visit("/teachers/sign_in");
    });

    it("email and password in whitespace", () => {
        cy.login();

        cy.get(".alert-messages").should(
            "contain",
            "E-mail ou senha inválidos."
        );
    });

    it("email completed and blank password", () => {
        cy.login("fael1-6@hotmail.com");

        /* cy.get("input")
            .contains("Entrar")
            .click(); */

        cy.containsClick("input", "Entrar");

        cy.get(".alert-messages").should(
            "contain",
            "E-mail ou senha inválidos."
        );
    });
});

describe("Create Simulated", () => {
    beforeEach(() => {
        cy.visit("/teachers/sign_in");
        cy.login("fael1-6@hotmail.com", "321321321");
    });

    it("create new simulete", () => {
        cy.pageCreateSimulete();
    });
});
