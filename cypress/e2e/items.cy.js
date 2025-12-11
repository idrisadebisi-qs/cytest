describe('Items Manager Application', () => {
  beforeEach(() => {
    // Wait for backend to be ready
    cy.waitForBackend()
    
    // Visit the application
    cy.visit('/')
  })

  it('should display the application correctly', () => {
    cy.contains('h1', 'Items Manager').should('be.visible')
    cy.contains('h2', 'Add New Item').should('be.visible')
    cy.contains('h2', 'Items List').should('be.visible')
  })

  it('should show backend health status as healthy', () => {
    cy.get('.health-status').should('be.visible')
    cy.get('.status-indicator', { timeout: 10000 }).should('have.class', 'healthy')
    cy.get('.status-text').should('contain', 'Backend Healthy')
  })

  it('should display existing items', () => {
    cy.get('.items-grid').should('be.visible')
    cy.get('.item-card').should('have.length.at.least', 1)
  })

  it('should create a new item', () => {
    const itemName = `Test Item ${Date.now()}`
    const itemDescription = 'This is a test item created by Cypress'

    // Fill out the form
    cy.get('#item-name').type(itemName)
    cy.get('#item-description').type(itemDescription)
    
    // Submit the form
    cy.get('#add-item-form').submit()
    
    // Verify the item appears in the list
    cy.contains('.item-title', itemName).should('be.visible')
    cy.contains('.item-description', itemDescription).should('be.visible')
    
    // Verify form is cleared
    cy.get('#item-name').should('have.value', '')
    cy.get('#item-description').should('have.value', '')
  })

  it('should delete an item', () => {
    // Create a test item first
    const itemName = `Delete Test ${Date.now()}`
    cy.createItem(itemName, 'Will be deleted')
    
    // Reload the page to see the new item
    cy.visit('/')
    
    // Find and delete the item
    cy.contains('.item-card', itemName).within(() => {
      cy.contains('button', 'Delete').click()
    })
    
    // Confirm deletion in the dialog
    cy.on('window:confirm', () => true)
    
    // Verify item is removed
    cy.contains('.item-title', itemName).should('not.exist')
  })

  it('should show item details correctly', () => {
    cy.get('.item-card').first().within(() => {
      // Check that all item details are present
      cy.get('.item-title').should('be.visible')
      cy.get('.item-id').should('be.visible')
      cy.get('.item-description').should('be.visible')
      cy.get('.item-meta').should('contain', 'Created:')
      cy.get('.btn-danger').should('contain', 'Delete')
    })
  })

  it('should require item name when creating', () => {
    // Try to submit without filling the form
    cy.get('#add-item-form').submit()
    
    // HTML5 validation should prevent submission
    cy.get('#item-name:invalid').should('exist')
  })
})
