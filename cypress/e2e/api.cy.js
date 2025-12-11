describe('Backend API Tests', () => {
  const API_URL = 'http://localhost:5000'

  before(() => {
    // Wait for backend to be ready
    cy.waitForBackend()
  })

  it('should return healthy status from health endpoint', () => {
    cy.request(`${API_URL}/api/health`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('status', 'healthy')
      expect(response.body).to.have.property('service', 'flask-backend')
      expect(response.body).to.have.property('timestamp')
    })
  })

  it('should get all items', () => {
    cy.request(`${API_URL}/api/items`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
    })
  })

  it('should create a new item', () => {
    const newItem = {
      name: `API Test Item ${Date.now()}`,
      description: 'Created via API test',
    }

    cy.request('POST', `${API_URL}/api/items`, newItem).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('name', newItem.name)
      expect(response.body).to.have.property('description', newItem.description)
      expect(response.body).to.have.property('created_at')
    })
  })

  it('should get a specific item by ID', () => {
    // First create an item
    cy.createItem('Get Test Item').then((createResponse) => {
      const itemId = createResponse.body.id

      // Then get it by ID
      cy.request(`${API_URL}/api/items/${itemId}`).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id', itemId)
        expect(response.body).to.have.property('name', 'Get Test Item')
      })
    })
  })

  it('should delete an item', () => {
    // First create an item
    cy.createItem('Delete Test Item').then((createResponse) => {
      const itemId = createResponse.body.id

      // Delete it
      cy.request('DELETE', `${API_URL}/api/items/${itemId}`).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('message')
      })

      // Verify it's deleted
      cy.request({
        url: `${API_URL}/api/items/${itemId}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404)
      })
    })
  })

  it('should return 404 for non-existent item', () => {
    cy.request({
      url: `${API_URL}/api/items/99999`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.have.property('error')
    })
  })

  it('should return 400 when creating item without name', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/api/items`,
      body: { description: 'No name provided' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('error')
    })
  })
})
