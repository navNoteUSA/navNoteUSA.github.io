/**
 * navNote SEO Helper Functions
 * This file contains utilities for dynamic structured data generation
 */

/**
 * Generates BreadcrumbList structured data for the current page
 * @param {Array} breadcrumbs - Array of breadcrumb objects with name and url properties
 * @returns {Object} - Structured data object for breadcrumbs
 */
function generateBreadcrumbData(breadcrumbs) {
  const itemListElement = breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };
}

/**
 * Generates Person structured data
 * @param {Object} person - Person details
 * @returns {Object} - Structured data object for person
 */
function generatePersonData(person) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "jobTitle": person.jobTitle,
    "description": person.description,
    "image": person.image,
    "sameAs": person.socialLinks,
    "worksFor": {
      "@type": "Organization",
      "name": "navNote"
    }
  };
}

/**
 * Injects structured data into the page
 * @param {Object} data - Structured data object
 * @param {String} id - Optional ID for the script tag
 */
function injectStructuredData(data, id = null) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  if (id) script.id = id;
  document.head.appendChild(script);
}

/**
 * Updates meta tags dynamically
 * @param {Object} metaTags - Object with meta tag names and their values
 */
function updateMetaTags(metaTags) {
  Object.entries(metaTags).forEach(([name, content]) => {
    // Check if meta tag exists
    let meta = document.querySelector(`meta[name="${name}"]`);
    
    // If not, check if it's an Open Graph tag
    if (!meta) {
      meta = document.querySelector(`meta[property="${name}"]`);
    }
    
    // If meta tag exists, update it
    if (meta) {
      meta.setAttribute('content', content);
    } else {
      // Create new meta tag
      meta = document.createElement('meta');
      if (name.startsWith('og:')) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  });
}

// Export functions if in a module context
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateBreadcrumbData,
    generatePersonData,
    injectStructuredData,
    updateMetaTags
  };
} 