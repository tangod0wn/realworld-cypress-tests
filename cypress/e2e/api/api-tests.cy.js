/// <reference types="cypress" />

const userCredentials = require("../../fixtures/user-credentials.json")

describe("API Tests", () => {

    it("API 1: POST To Verify Login with valid details", () => {
        cy.request({
            method: "POST",
            url: "https://api.realworld.io/api/users/login",
            failOnStatusCode: false,
            form: true,
            body: {  
                user:{
                    email: userCredentials.email,
                    password: userCredentials.password,
                     }
            },
        }).then((res) => {
            console.log(res)
            Cypress.env('access_token', res.body.access_token);
            cy.log(Cypress.env('access_token'));
            expect(res.status).to.eq(200)
        })
    })

    it("API 2: POST To Verify Login without email parameter", () => {
        cy.request({
            method: "POST",
            url: "https://api.realworld.io/api/users/login",
            failOnStatusCode: false,
            form: true,
            body: {
                user:{
                    password: "Password99!",
                     }
            },
        }).then((res) => {
            console.log(res)
            expect(res.status).to.eq(422)
        })
    })
    //NOTE: No api method to delete account exists, adding protected API functionality
    // or a chronjob to delete an existing account(s) that were created by QA would prevent a large number of accounts being created. 
    it("API 3: DELETE To Verify Login", () => {
        cy.request({
            method: "DELETE",
            url: "https://api.realworld.io/api/users",
            failOnStatusCode: false,
            form: true,
            body: {
                user:{
                    email: "nonExistantEmail@no.com",
                    password: "nonExistantPassword!",
                     }
            },
        }).then((res) => {
            expect(res.status).to.eq(404)
        })
    })

    it("API 4: POST To Verify Login with invalid details", () => {
        cy.request({
            method: "POST",
            url: "https://api.realworld.io/api/users/login",
            failOnStatusCode: false,
            form: true,
            body: {
                user: {
                email: "nonExistantEmail@no.com",
                password: "nonExistantPassword!",
                }
            },
        }).then((res) => {
            console.log(res)
            expect(res.status).to.eq(403)
        })
    })

    it("API 5: POST To Create/Register User Account", () => {
        cy.request({
            method: "POST",
            url: "https://api.realworld.io/api/users",
            failOnStatusCode: false,
            form: true,
            body: { 
                user: {
                username: userCredentials.username,
                email: userCredentials.email,
                password: userCredentials.password,
                }
            },
        }).then((res) => {
            expect(res.status).to.eq(201)
        })
    })

    it("API 6: PUT METHOD To Update User Account", () => {
        cy.request({
            method: "PUT",
            url: "https://api.realworld.io/api/users",
            failOnStatusCode: false,
            form: true,
            body: {
                name: "New user",
                email: userCredentials.email,
                password: userCredentials.updatedPassword,
            },
        }).then((res) => {
            console.log(res)
            expect(res.status).to.eq(200)
        })
    })

    it("API 7: POST METHOD To create new article", () => {
        cy.request({
            method: "POST",
            url: "https://api.realworld.io/api/articles",
            failOnStatusCode: false,
            form: true,
            headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNzUzMX0sImlhdCI6MTcxOTU2MzE1NCwiZXhwIjoxNzI0NzQ3MTU0fQ.a0524oqKjkU76_wfDEk6nFBuu9ICzxVSg36y79svGhE',
            },
            body: {
                    "article": {
                        "title": "test title",
                        "description": "test description",
                        "body": "test body content",
                        "tagList": ["SEO"]
                    }
            },
        }).then((res) => {
            console.log(res)
            expect(res.status).to.eq(200)
        })
    })
})
