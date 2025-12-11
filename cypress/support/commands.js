// ***********************************************
// Custom commands for Cypress tests
// ***********************************************

// Determine API URL based on environment
// In Docker: use container name, Local: use localhost
const API_URL = Cypress.env('API_URL') || 'http://localhost:5000'

// Command to wait for backend to be ready
Cypress.Commands.add('waitForBackend', () => {
  cy.request({
    url: `${API_URL}/api/health`,
    retryOnStatusCodeFailure: true,
    timeout: 30000,
  }).its('status').should('eq', 200)
})

// Command to create an item via API
Cypress.Commands.add('createItem', (name, description = '') => {
  return cy.request({
    method: 'POST',
    url: `${API_URL}/api/items`,
    body: { name, description },
  })
})

// Command to delete all items (for test cleanup)
Cypress.Commands.add('deleteAllItems', () => {
  cy.request(`${API_URL}/api/items`).then((response) => {
    const items = response.body
    items.forEach((item) => {
      cy.request('DELETE', `${API_URL}/api/items/${item.id}`)
    })
  })
})
