document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) {
      navLinks.classList.remove("active");
    }
  });

  // Update smooth scroll for better navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      // Hide all sections first
      document.querySelectorAll("section").forEach((section) => {
        section.style.display = "none";
        section.style.opacity = "0";
      });

      // Show target section with fade in effect
      if (targetSection) {
        targetSection.style.display = "block";
        setTimeout(() => {
          targetSection.style.opacity = "1";
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    });
  });

  // Login/Signup handling
  const loginModal = document.getElementById("loginModal");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const showSignupLink = document.getElementById("showSignup");
  const showLoginLink = document.getElementById("showLogin");

  // Check if user is logged in
  if (!localStorage.getItem("isLoggedIn")) {
    loginModal.classList.remove("hidden");
  } else {
    loginModal.classList.add("hidden");
  }

  showSignupLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    signupForm.style.display = "flex";
  });

  showLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    signupForm.style.display = "none";
    loginForm.style.display = "flex";
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add your login validation here
    localStorage.setItem("isLoggedIn", "true");
    loginModal.classList.add("hidden");
  });

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add your signup validation here
    localStorage.setItem("isLoggedIn", "true");
    loginModal.classList.add("hidden");
  });

  // Handle protected content clicks
  document.querySelectorAll(".protected-content").forEach((element) => {
    element.addEventListener("click", (e) => {
      if (!localStorage.getItem("isLoggedIn")) {
        e.preventDefault();
        loginModal.classList.add("show");
      }
    });
  });

  // Update form handling
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    loginModal.classList.remove("show");
  });

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    loginModal.classList.remove("show");
  });

  // Toggle between login and signup forms
  showSignupLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    signupForm.style.display = "flex";
  });

  showLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    signupForm.style.display = "none";
    loginForm.style.display = "flex";
  });

  // Contact form handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Add your contact form submission logic here
      alert("Message sent successfully!");
      contactForm.reset();
    });
  }

  // Profile section handling
  const profileSection = document.getElementById("profile");
  const profileLink = document.querySelector('a[href="#profile"]');

  // Hide profile section by default
  profileSection.classList.add("hidden");

  // Profile section handling with smooth transition
  profileLink.addEventListener("click", (e) => {
    e.preventDefault();
    if (profileSection.classList.contains("hidden")) {
      // Fade out other sections
      document.querySelector(".products").style.opacity = "0";
      document.querySelector(".customer-services-section").style.opacity = "0";

      setTimeout(() => {
        document.querySelector(".products").style.display = "none";
        document.querySelector(".customer-services-section").style.display =
          "none";
        profileSection.classList.remove("hidden");
        profileSection.style.opacity = "0";
        profileSection.style.display = "block";

        setTimeout(() => {
          profileSection.style.opacity = "1";
        }, 50);
      }, 300);
    } else {
      profileSection.style.opacity = "0";

      setTimeout(() => {
        profileSection.classList.add("hidden");
        document.querySelector(".products").style.display = "block";
        document.querySelector(".clothes-section").style.display = "block";

        setTimeout(() => {
          document.querySelector(".products").style.opacity = "1";
          document.querySelector(".clothes-section").style.opacity = "1";
        }, 50);
      }, 300);
    }
  });

  // Review handling
  const addReviewBtn = document.getElementById("addReviewBtn");
  if (addReviewBtn) {
    addReviewBtn.addEventListener("click", () => {
      if (!localStorage.getItem("isLoggedIn")) {
        loginModal.classList.add("show");
        return;
      }
      // Add your review form logic here
      const reviewText = prompt("Write your review:");
      if (reviewText) {
        const reviewsGrid = document.querySelector(".reviews-grid");
        const newReview = `
          <div class="review-card">
            <div class="rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p class="review-text">"${reviewText}"</p>
            <p class="reviewer">- ${
              localStorage.getItem("userName") || "Anonymous"
            }</p>
          </div>
        `;
        reviewsGrid.insertAdjacentHTML("afterbegin", newReview);
      }
    });
  }

  // Order tracking handling
  const orderTrackForm = document.getElementById("orderTrackForm");
  if (orderTrackForm) {
    orderTrackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const orderResult = document.getElementById("orderResult");
      orderResult.classList.remove("hidden");
      // Add your order tracking logic here
    });
  }

  // Shopping Cart handling
  const cart = [];
  const cartModal = document.getElementById("cartModal");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.querySelector(".cart-count");

  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  // Add to cart when clicking buy button
  document.querySelectorAll(".buy-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      if (!localStorage.getItem("isLoggedIn")) return;

      const card = e.target.closest(".product-card");
      const product = {
        name: card.querySelector("h3").textContent,
        price: parseFloat(card.querySelector("p").textContent.replace("$", "")),
        quantity: 1,
      };

      addToCart(product);
      cartModal.classList.add("show");
    });
  });

  // Add congratulations modal handling
  const congratsModal = document.getElementById("congratsModal");
  const continueShopping = document.getElementById("continueShopping");
  const viewCart = document.getElementById("viewCart");

  function showCongrats() {
    congratsModal.classList.add("show");
    setTimeout(() => {
      congratsModal.querySelector(".congrats-container").style.opacity = "1";
    }, 100);
  }

  continueShopping.addEventListener("click", () => {
    congratsModal.classList.remove("show");
  });

  viewCart.addEventListener("click", () => {
    congratsModal.classList.remove("show");
    cartModal.classList.add("show");
  });

  // Update addToCart function
  function addToCart(product) {
    const productCard = document.querySelector(`[data-name="${product.name}"]`);
    if (productCard) {
      productCard.classList.add("adding-to-cart");
      setTimeout(() => productCard.classList.remove("adding-to-cart"), 500);
    }

    const existingItem = cart.find((item) => item.name === product.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push(product);
    }

    updateCartDisplay();
    updateCartCount();

    // Show success message
    const message = document.createElement("div");
    message.className = "cart-message";
    message.textContent = "Item added to cart!";
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 2000);
  }

  function updateCartDisplay() {
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <tr>
          <td colspan="5" class="empty-cart">
            <i class="fas fa-shopping-cart"></i>
            <p>Your cart is empty</p>
            <button onclick="closeCart()" class="continue-btn">
              Continue Shopping
            </button>
          </td>
        </tr>`;
      return;
    }

    cartItems.innerHTML = cart
      .map(
        (item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.price} frw</td>
        <td>
          <div class="quantity-controls">
            <button onclick="updateQuantity('${item.name}', ${
          item.quantity - 1
        })">-</button>
            <input type="number" value="${item.quantity}" min="1" 
              onchange="updateQuantity('${item.name}', this.value)">
            <button onclick="updateQuantity('${item.name}', ${
          item.quantity + 1
        })">+</button>
          </div>
        </td>
        <td>${item.price * item.quantity} frw</td>
        <td>
          <button class="remove-btn" onclick="removeFromCart('${item.name}')">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `
      )
      .join("");

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cartTotal.textContent = `${total} frw`;
  }

  window.closeCart = function () {
    cartModal.classList.remove("show");
  };

  window.updateQuantity = function (name, quantity) {
    const item = cart.find((item) => item.name === name);
    if (item) {
      item.quantity = parseInt(quantity) || 1;
      updateCartDisplay();
    }
  };

  window.removeFromCart = function (name) {
    const index = cart.findIndex((item) => item.name === name);
    if (index > -1) {
      cart.splice(index, 1);
      updateCartDisplay();
      updateCartCount();
    }
  };

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    const thankYouModal = document.getElementById("thankYouModal");
    const orderTotal = document.getElementById("orderTotal");
    const orderId = document.getElementById("orderId");

    // Generate random order ID
    const randomId =
      "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Update thank you modal
    orderTotal.textContent = cartTotal.textContent;
    orderId.textContent = randomId;

    // Show thank you modal and hide cart modal
    cartModal.classList.remove("show");
    thankYouModal.classList.add("show");

    // Clear cart
    cart.length = 0;
    updateCartDisplay();
    updateCartCount();
  });

  // Close thank you modal
  document.getElementById("closeThankYou").addEventListener("click", () => {
    document.getElementById("thankYouModal").classList.remove("show");
  });

  // Close cart modal when clicking outside
  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.classList.remove("show");
    }
  });

  // Show cart when clicking cart icon
  document.getElementById("cartIcon").addEventListener("click", (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    cartModal.classList.add("show");
    // Scroll to top of cart
    cartModal.querySelector(".cart-container").scrollTop = 0;
  });

  // Business Contact Form handling
  const businessContactForm = document.getElementById("businessContactForm");
  if (businessContactForm) {
    businessContactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Add your form submission logic here
      alert("Thank you for contacting us! We will respond within 24 hours.");
      businessContactForm.reset();
    });
  }

  // Help menu functionality
  document.querySelectorAll(".help-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const helpType =
        this.closest(".help-item").querySelector("h3").textContent;
      showHelpModal(helpType);
    });
  });

  function showHelpModal(helpType) {
    alert(
      `Support request for: ${helpType}\nA customer service representative will contact you soon.`
    );
  }
}); // End of DOMContentLoaded
