/// <reference types="cypress" />

const articleDetails = require("../fixtures/user-credentials.json")
const userCredentials = require("../fixtures/user-credentials.json")

describe("Automation Exercises", () => {
    context("1.", () => {
        cy.visit("https://demo.realworld.io/#/")
        cy.get("body").should("be.visible")

        it("Test Case 1: Register User", () => {
            cy.signupUser(userCredentials)

            cy.contains(`Logged in as ${userCredentials.name}`)

            cy.get('[data-qa="continue-button"]').click()
        })
    })

        it("Test Case 1: Logout User", () => {
            cy.contains("Sign up").click()

            cy.fillLoginForm(userCredentials)

            cy.get('.btn').click()

            cy.contains(`${userCredentials.name}`)

            cy.contains("Settings").click()

            cy.contains("Or click here to logout.").click()

            cy.url().should("eq", "https://conduit.realworld.how/")
        })

        it("Test Case 2: Register User with existing email", () => {
            cy.visit("https://demo.realworld.io/#/")

            cy.contains("Sign up").click()

            cy.fillSignupForm(userCredentials)

            cy.contains("Email Address already exist!")
        })   

        it("Test Case 3: Login User with incorrect email and password", () => {
            cy.contains("Sign up").click()
            cy.fillLoginForm({
                email: "invalidEmail@gmail.com",
                password: userCredentials.password,
            })

            cy.contains("email or password is invalid")
        })


        it("Test Case 4: Create new article as Logged in User", () => {
            cy.fillLoginForm(userCredentials)

            cy.get('.btn').click()

            cy.contains("New Article").click()

            cy.get('input[name="articleTitle"]').type(articleDetails.title)
            cy.get('input[name="description"]').type(articleDetails.description)
            cy.get('textarea[name="body"]').type(articleDetails.body)
            cy.get('input[name="tags"]').type(articleDetails.tags)

            cy.get('.btn').click()

            cy.getElementAndAssertText("h2", articleDetails.title)
            cy.getElementAndAssertText("p", articleDetails.description)
        })

        it("Test Case 5: Verify home Page", () => {
            cy.contains("Home").click()
            
            cy.get("body").should("be.visible")
            cy.url().should("eq", "https://demo.realworld.io/#/s")
            cy.getElementAndAssertText("p", "A place to share your knowledge.")
        })
    })
      
        it("Test Case 6: Verify Scroll Up without 'Arrow' button and Scroll Down functionality", () => {
            // Scroll to the bottom of the page
            cy.window().then((win) => {
                win.scrollTo(0, win.document.body.scrollHeight)
            })

            cy.getElementAndAssertText("p", "Popular Tags")

            // Scroll to the top of the page
            cy.window().then((win) => {
                win.scrollTo(0, 0)
            })

            cy.getElementAndAssertText(
                ".logo-font",
                "conduit",
            )
        })
