// API base URL - change this based on environment
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'http://backend:5000';

// DOM Elements
const addItemForm = document.getElementById('add-item-form');
const itemNameInput = document.getElementById('item-name');
const itemDescriptionInput = document.getElementById('item-description');
const itemsContainer = document.getElementById('items-container');
const healthStatusIndicator = document.querySelector('.status-indicator');
const healthStatusText = document.querySelector('.status-text');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    checkHealth();
    loadItems();
    
    // Set up form submission
    addItemForm.addEventListener('submit', handleAddItem);
    
    // Check health every 30 seconds
    setInterval(checkHealth, 30000);
});

// Check backend health
async function checkHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        const data = await response.json();
        
        if (response.ok && data.status === 'healthy') {
            healthStatusIndicator.classList.add('healthy');
            healthStatusIndicator.classList.remove('unhealthy');
            healthStatusText.textContent = 'Backend Healthy';
        } else {
            throw new Error('Backend unhealthy');
        }
    } catch (error) {
        healthStatusIndicator.classList.add('unhealthy');
        healthStatusIndicator.classList.remove('healthy');
        healthStatusText.textContent = 'Backend Offline';
        console.error('Health check failed:', error);
    }
}

// Load all items
async function loadItems() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/items`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        
        const items = await response.json();
        displayItems(items);
    } catch (error) {
        itemsContainer.innerHTML = `
            <div class="error-message">
                Failed to load items. Please make sure the backend is running.
            </div>
        `;
        console.error('Error loading items:', error);
    }
}

// Display items in the UI
function displayItems(items) {
    if (items.length === 0) {
        itemsContainer.innerHTML = '<p class="loading">No items yet. Add one above!</p>';
        return;
    }
    
    itemsContainer.innerHTML = items.map(item => `
        <div class="item-card" data-item-id="${item.id}">
            <div class="item-header">
                <h3 class="item-title">${escapeHtml(item.name)}</h3>
                <span class="item-id">ID: ${item.id}</span>
            </div>
            <p class="item-description">${escapeHtml(item.description || 'No description')}</p>
            <p class="item-meta">Created: ${new Date(item.created_at).toLocaleString()}</p>
            <div class="item-actions">
                <button class="btn btn-danger" onclick="deleteItem(${item.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Handle add item form submission
async function handleAddItem(e) {
    e.preventDefault();
    
    const name = itemNameInput.value.trim();
    const description = itemDescriptionInput.value.trim();
    
    if (!name) {
        alert('Please enter an item name');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to create item');
        }
        
        // Clear form
        itemNameInput.value = '';
        itemDescriptionInput.value = '';
        
        // Reload items
        await loadItems();
    } catch (error) {
        alert('Failed to add item. Please try again.');
        console.error('Error adding item:', error);
    }
}

// Delete an item
async function deleteItem(itemId) {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/items/${itemId}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete item');
        }
        
        // Reload items
        await loadItems();
    } catch (error) {
        alert('Failed to delete item. Please try again.');
        console.error('Error deleting item:', error);
    }
}

// Utility function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
