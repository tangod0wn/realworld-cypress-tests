/// <reference types="cypress" />

require("cypress-downloadfile/lib/downloadFileCommand")

/**
 *
 *  --- UI METHODS ---
 *
 */

/**
 * Fills the login form with provided user credentials.
 * @param {Object} userCredentials - Object containing email and password.
 */

Cypress.Commands.add("fillLoginForm", (userCredentials) => {
    const { email, password } = userCredentials

    cy.get("h1")
        .should("be.visible")
        .and("contain.text", "Sign in")

        cy.get('input[ng-model="$ctrl.formData.email"]').type(email)
        cy.get('input[ng-model="$ctrl.formData.password"]').type(password)
    cy.get('.btn').click()
})

/**
 * Fills the New Article form with provided article details.
 * @param {Object} articleDetails - Object containing email and password.
 */

Cypress.Commands.add("fillNewArticleForm", (articleDetails) => {
    const { title, description, content, tags } = articleDetails

        cy.get('input[name="articleTitle"]').type(title)
        cy.get('input[name="description"]').type(description)
        cy.get('input[name="body"]').type(content)
        cy.get('input[name="tags"]').type(tags)
    cy.get('.btn').click()
})

/**
 * Fills the signup form with provided user credentials.
 * @param {Object} userCredentials - Object containing name and email.
 */

Cypress.Commands.add("fillSignupForm", (userCredentials) => {
    const { username, email, password } = userCredentials

    cy.get("h1")
        .should("be.visible")
        .and("contain.text", "Sign up")

        cy.get('input[ng-model="$ctrl.formData.username"]').type(username)
        cy.get('input[ng-model="$ctrl.formData.email"]').type(email)
        cy.get('input[ng-model="$ctrl.formData.password"]').type(password)
    cy.get('.btn').click()
})

/**
 * Fills the account information form with provided data.
 * @param {Object} userCredentials - Object containing account information.
 */

Cypress.Commands.add("fillAccountInformationForm", (userCredentials) => {
    cy.get("h1").should("be.visible")

    cy.get('input[ng-model="$ctrl.formData.username"]').type(username)
    cy.get('input[ng-model="$ctrl.formData.email"]').type(email)
    cy.get('input[ng-model="$ctrl.formData.password"]').type(password)


    cy.get('.btn').click()
})

/**
 * Signs up a user with provided user credentials.
 * @param {Object} userCredentials - Object containing user credentials.
 */

Cypress.Commands.add("signupUser", (userCredentials) => {
    cy.contains("Sign up").click()
    cy.fillSignupForm(userCredentials)

    cy.get(".nav-link")
        .should("be.visible")
        .and("contain.text", userCredentials.username)
})


/**
 * Adds a product to the cart.
 * @param {number} productNumber - Index of the product to add.
 */


/**
 * Retrieves an element and asserts its text content.
 * @param {string} element - Selector of the element to retrieve.
 * @param {string} text - Expected text content of the element.
 */

Cypress.Commands.add("getElementAndAssertText", (element, text) => {
    cy.get(element).should("be.visible").and("contain.text", text)
})

/**
 *
 *  --- API METHODS ---
 *
 */

/**
 * Retrieves user details by making an API request.
 * @param {string} email - Email of the user.
 * @returns {Object} - Object containing response from the API.
 */


/**
 * Logins a user by making an API request.
 * @param {Object} userCredentials - Object containing user credentials.
 * @returns {Object} - Object containing response from the API.
 */

Cypress.Commands.add("loginUserWithAPI", (userCredentials) => {
    const { email, password } = userCredentials
    return cy.request({
        method: "POST",
        url: `https://api.realworld.io/api/users/login`,
        failOnStatusCode: false,
        form: true,
        body: { email, password },
    })
})

/**
 * Registers a user by making an API request.
 * @param {Object} userCredentials - Object containing user credentials.
 * @returns {Object} - Object containing response from the API.
 */

Cypress.Commands.add("registerUserWithAPI", (userCredentials) => {
    return cy.request({
        method: "POST",
        url: "https://api.realworld.io/api/users",
        failOnStatusCode: false,
        form: true,
        body: {
            username: userCredentials.usernamename,
            email: userCredentials.email,
            password: userCredentials.password,
        },
    })
})

/**
 * Deletes a user account by making an API request.
 * @param {Object} userCredentials - Object containing user credentials.
 * @returns {Object} - Object containing response from the API.
 */

Cypress.Commands.add("deleteUserWithAPI", (userCredentials) => {
    const { email, password } = userCredentials
    return cy.request({
        method: "DELETE",
        url: ``,
        failOnStatusCode: false,
        form: true,
        body: {
            email,
            password,
        },
    })
})
