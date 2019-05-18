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

        cy.containsClick("input", "Entrar");

        cy.get(".alert-messages").should(
            "contain",
            "E-mail ou senha inválidos."
        );
    });

    it("email and invalid passwords", () => {
        cy.login("teste@invalido.com", "123456");

        cy.get(".alert-messages").should(
            "contain",
            "E-mail ou senha inválidos."
        );
    });
});

describe("Create Simulated", () => {
    const number = Math.floor(Math.random() * (500 - 2 + 1) + 3);

    console.log(number);

    beforeEach(() => {
        cy.visit("/teachers/sign_in");
        cy.login("fael1-6@hotmail.com", "321321321");
    });

    it("create new simulete", () => {
        cy.createSimulete(`TESTE QA AUTOMATIZAÇÃO ${number} `);
    });

    it("publish draft", () => {
        cy.publishDummy(`TESTE QA AUTOMATIZAÇÃO ${number}`);
    });

    it("publish draft with error on date", () => {
        cy.publishDummyWithErrorOnDate("TESTE QA AUTOMATIZAÇÃO 01");
    });
});
