// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
// ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Show modal when a specific action is performed (e.g., clicking a button)
  document.querySelectorAll('.item-detail-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default behavior of anchor tag
      document.querySelector('#item-detail-modal').style.display = 'flex';
    });
  });

  // Close modal when clicking outside of the modal content
  document.querySelector('#item-detail-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.style.display = 'none';
    }
  });

  // Close modal with close button
  document.querySelector('.close-icon').addEventListener('click', () => {
    document.querySelector('#item-detail-modal').style.display = 'none';
  });
});


//contact
function kirimPesan(event) {
  event.preventDefault();
  const nama = document.getElementById('nama').value;
  const email = document.getElementById('email').value;
  const noHp = document.getElementById('noHp').value;
  const pesan = document.getElementById('pesan').value;
  const url = "https://api.whatsapp.com/send?phone=6281529463925&text=Hallo%20Admin%2C%0ANama%20%3A%20*" + encodeURIComponent(nama) + "*%0AEmail%20%3A%20*" + encodeURIComponent(email) + "*%0ANomer%20%3A%20*" + encodeURIComponent(noHp) + "*%0A%0A*"+ encodeURIComponent(pesan) +"*";
  window.open(url, '_blank');
}

