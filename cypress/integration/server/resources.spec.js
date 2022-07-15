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

it('get all resources', () => {
  cy.request({
    url: '/api/resource',
    method: 'GET',
    body: {},
  })
    .then((resp) => {
      assert.isArray(resp.body, "returned resources are in an array");
      assert.isNotNull(resp.body[0], "returned resources are valid");
    })
})

it('invalid resource', () => {
  cy.request({
    url: '/api/resource/adf',
    method: 'GET',
    failOnStatusCode: false,
    body: {},
  })
  .then((resp) => {
    expect(resp.status).to.eq(404);
  })
})

it('create resource', () => {
  cy.request({
    url: '/api/resource',
    method: 'POST',
    body: {
      authoredAt: Date.now(),
      fetchedAt: Date.now(),
      name: 'Sample Resource',
      author: 'Ankit Mehta',
      url: 'https://www.cdc.gov/coronavirus/2019-ncov/variants/about-variants.html',
      type: 'website',
      content:
        'Viruses constantly change through mutation and sometimes these mutations result in a new variant of the virus.',
      imageurl:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wickhosp.com%2Fblog%2Fazdhs-tips-to-celebrate-the-holidays-safely-education-on-omnicron-variant%2F&psig=AOvVaw1MrhlFR3n6fw5knw-VO67x&ust=1652982046437000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNiwvJDM6fcCFQAAAAAdAAAAABAD'
    },
  })
  .then((resp) => {
    assert.isNotNull(resp.body, "resource was created successfully");
  })
})

it('do not create invalid resource', () => {
  cy.request({
    url: '/api/resource',
    method: 'POST',
    failOnStatusCode: false,
    body: {
      authoredAt: Date.now(),
      fetchedAt: Date.now(),
      name: 'Sample Resource',
      author: 'Ankit Mehta',
      type: 'website',
      content:
        'Viruses constantly change through mutation and sometimes these mutations result in a new variant of the virus.',
      imageurl:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wickhosp.com%2Fblog%2Fazdhs-tips-to-celebrate-the-holidays-safely-education-on-omnicron-variant%2F&psig=AOvVaw1MrhlFR3n6fw5knw-VO67x&ust=1652982046437000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNiwvJDM6fcCFQAAAAAdAAAAABAD'
    },
  })
  .then((resp) => {
    expect(resp.status).to.eq(400);
  })
})

it('delete resource', () => {
  cy.request({
    url: '/api/resource',
    method: 'DELETE',
    body: {
      url: 'https://www.cdc.gov/coronavirus/2019-ncov/variants/about-variants.html',
    },
  })
  .then((resp) => {
    assert.notExists(resp.body, "resource was deleted successfully");
  })
})

it('do not delete invalid resource', () => {
  cy.request({
    url: '/api/resource',
    method: 'DELETE',
    failOnStatusCode: false,
    body: {
      url: 'asdf',
    },
  })
  .then((resp) => {
    expect(resp.status).to.eq(404);
  })
})



})