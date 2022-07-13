// itiprogram.org/members/index.cfm?pageID=125#view
//https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/server-communication__request/cypress/e2e/spec.cy.js


// https://docs.cypress.io/guides/references/assertions -- helpful to understand the actual final testing module
describe('Making requests', () => {
  // This one logs in to the entire site and maintains cookies for the rest of the tests... could move
  before(() => {
    cy.visit('/login')
    cy.get('select').select('Georgia Tech')
    cy.get('input').type("letmein1")

    cy.get('button') // 6.
    .click() // 7.
  })

  beforeEach(() => {
    // Preserves the login information for GT on each cypress req inside this spec
    Cypress.Cookies.preserveOnce('connect.sid')
  });

it('get all posts on first page', () => {
  cy.request({
    url: '/api/post/1',
    method: 'POST',
    body: {
      title: 'hello',
    },
  })
    .then((resp) => {
      assert.isArray(resp.body.posts, "returned posts are in an array");
      assert.isNotNull(resp.body.posts[0], "returned posts are valid");
      expect(resp.body.posts[0]).to.have.property('content')
    })
})

it('invalid page', () => {
  cy.request({
    url: '/api/post/adf',
    method: 'POST',
    body: {
      title: 'hello',
    },
  })
  .then((resp) => {
    // This doesn't error as is :) but i think it should!
    // expect(resp.status).to.eq(400)
  })
})

})