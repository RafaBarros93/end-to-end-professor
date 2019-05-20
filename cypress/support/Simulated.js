/*!
 * @Rafael Lopes Fonseca
 * date 05/16/2019
 * Desafio Técnico - QA Engineer
 */

Cypress.Commands.add("containsClick", (type, contains) => {
    cy.get(type)
        .contains(contains)
        .click({ force: true });
});

Cypress.Commands.add("saveAsDraft", () => {
    cy.get("#save_as_draft_button").click();

    cy.testLocation(
        "http://professor.processoseletivo.enade.saraivaeducacao.com.br/mocks"
    );

    cy.get(".toast").should("contain", "Simulado salvo como rascunho!");
});

Cypress.Commands.add(
    "setHoursAndMinutes",
    (start, element, hoursAndMinutes) => {
        cy.get(start).click({ force: true });

        cy.get(element)
            .contains(hoursAndMinutes)
            .click({ force: true });

        cy.get("._hj-f5b2a1eb-9b07_widget_open_close").click({ force: true });
    }
);
Cypress.Commands.add("setHoursSimulate", (hour, minute) => {
    cy.get(":nth-child(1) > .duration-selector__spinner-box > input")
        .type("{backspace}")
        .type(hour);
});

Cypress.Commands.add("setDay", (today, element) => {
    cy.get(element).click();

    cy.get("#end_time__date_table > tbody >")
        .contains(today + 5)
        .click();

    cy.get(
        "#end_time__date_root > .picker__holder > .picker__frame > .picker__wrap > .picker__box > .picker__footer > .picker__close"
    ).click();
});

Cypress.Commands.add("setStartTime", () => {
    let todayHour = Cypress.moment().format("H");

    let today = Cypress.moment().date();

    cy.setHoursAndMinutes("#start_time__time", ".clockpicker-hours", todayHour);

    cy.setHoursAndMinutes("#end_time__time", ".clockpicker-hours", todayHour);

    cy.setDay(today, "#end_time__date");

    cy.setHoursSimulate("04", "00");
});

Cypress.Commands.add("setQuestion", (question) => {
    for (let index = 1; index < question; index++) {
        cy.get(
            `#questions-list > :nth-child(${index}) > :nth-child(${1}) > .question-box > .question-box__actions-wrapper > .add-question`
        ).click({ force: true });
    }

    cy.get("h2").should("contain", "Questões");

    cy.get(".next-action > .waves-effect > .material-icons").click();
});

Cypress.Commands.add("setDiscipline", (type, discipline) => {
    cy.containsClick(type, discipline);

    cy.containsClick("label", "Selecionar todos");

    cy.get("h2").should("contain", "Conteúdo");

    cy.get(".next-action > .waves-effect > .material-icons").click();

    cy.setQuestion(21);
});

Cypress.Commands.add("setNameSimulete", (message) => {
    cy.get('input[name="mock[name]"]', { timeout: 150000 }).type(message);

    cy.containsClick('a[id="wizard-form__submit-button"]', "PRÓXIMO");

    cy.setDiscipline(".subgroup-item", "Arquivologia");
});

Cypress.Commands.add("createSimulete", (name) => {
    cy.containsClick("span", "Simulados");

    cy.testLocation(
        "http://professor.processoseletivo.enade.saraivaeducacao.com.br/mocks"
    );

    cy.containsClick("span", "Novo simulado");

    cy.setNameSimulete(name);
});

Cypress.Commands.add("searchDummy", (numberDummy, name) => {
    console.log(numberDummy, name);

    cy.containsClick("span", "Simulados");

    cy.get("#q_name_cont", { timeout: 150000 }).type(name);

    cy.get(".search").click();

    // cy.get(` [title="${name}"]`).click();

    cy.get(".long-text > .primary-color").click();
});

Cypress.Commands.add("publish", () => {
    cy.get("#publish-button").click();

    cy.containsClick("#publish-modal > .modal-footer", "OK");
});

Cypress.Commands.add("publishDummy", (name) => {
    cy.get("#sidebar-mocks > span").click();

    cy.searchDummy(1, name);

    cy.get("#edit-button").click();

    cy.setStartTime();

    cy.get("#publish_button").click({ force: true });

    cy.get(".toast").should("contain", "Simulado publicado com sucesso.");
});

Cypress.Commands.add("publishDummyWithErrorOnDate", (name) => {
    cy.searchDummy(1, name);

    cy.publish();

    cy.get("#publish-modal > .modal-content").should("contain", "ATENÇÃO!");

    cy.get("#publish-notice__modal > .modal-content").should(
        "contain",
        "Simulado não pode ser publicado:"
    );
});

Cypress.Commands.add("publishDummyWithError", (name) => {
    cy.searchDummy(1, name);

    cy.get("#edit-button").click();

    cy.get("#publish_button").click({ force: true });

    cy.get(":nth-child(1) > .activity-info > .activity-info__content").should(
        "contain",
        "não pode ser menor que a data atual"
    );

    cy.get(
        ":nth-child(2) > .activity-info > .activity-info__content > .datetime-input > .row > .datetime-input__errors > .col"
    ).should(
        "contain",
        "não pode ser menor que a data atual, não pode ser menor que a data de início"
    );

    cy.get(".toast").should(
        "contain",
        "Verifique os pontos abaixo para publicar o simulado."
    );
});

Cypress.Commands.add("testLocation", (location) => {
    cy.location().should((loc) => {
        expect(loc.href).to.eq(location);

        expect(loc.protocol).to.eq("http:");
        expect(loc.toString()).to.eq(location);
    });
});
