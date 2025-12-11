// ***********************************************
// Custom commands for Cypress tests
// ***********************************************

// Command to wait for backend to be ready
Cypress.Commands.add('waitForBackend', () => {
  cy.request({
    url: 'http://localhost:5000/api/health',
    retryOnStatusCodeFailure: true,
    timeout: 30000,
  }).its('status').should('eq', 200)
})

// Command to create an item via API
Cypress.Commands.add('createItem', (name, description = '') => {
  return cy.request({
    method: 'POST',
    url: 'http://localhost:5000/api/items',
    body: { name, description },
  })
})

// Command to delete all items (for test cleanup)
Cypress.Commands.add('deleteAllItems', () => {
  cy.request('http://localhost:5000/api/items').then((response) => {
    const items = response.body
    items.forEach((item) => {
      cy.request('DELETE', `http://localhost:5000/api/items/${item.id}`)
    })
  })
})
