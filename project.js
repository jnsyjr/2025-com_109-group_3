document.addEventListener("DOMContentLoaded", function() {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (navbarPlaceholder) {
    fetch('../navbar/navbar.html')
      .then(response => response.text())  // return the Promise here
      .then(html => {
        console.log("Navbar loaded:", html);
        navbarPlaceholder.innerHTML = html;
      })
      .catch(error => {
        console.error('Error loading navbar:', error);
      });
  }
});
