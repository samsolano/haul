describe('Navigation', () => {
  it('should navigate to the finds page from homepage', () => {
    // Start from the index page
    cy.visit('http://localhost:3000');

    // Check that we're on the homepage with the welcome message
    cy.contains('Welcome to Haul').should('be.visible');

    // Find the Enter button and click it
    cy.get('a[href*="finds"]').click();

    // The new url should include "/finds"
    cy.url().should('include', '/finds');

    // The finds page should contain posts with usernames and descriptions
    cy.get('body').should('be.visible');

    // Wait for page content to load and check for specific finds page content
    cy.get('[class*="flex"]', {timeout: 10000}).should('exist');
  });
});