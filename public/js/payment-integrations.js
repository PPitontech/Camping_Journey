/**
 * Camping Journey Payment Integrations
 * Handles Stripe, PayPal, and Mercado Pago integrations
 */

// Initialize payment methods when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the checkout page
  if (document.querySelector('.checkout-container')) {
    initStripe();
    initPayPal();
    initMercadoPago();
  }
});

/**
 * Stripe Integration
 */
function initStripe() {
  // This would be replaced with your actual Stripe publishable key
  const stripePublishableKey = 'pk_test_placeholder';
  
  // Only proceed if Stripe is loaded
  if (window.Stripe) {
    const stripe = Stripe(stripePublishableKey);
    const elements = stripe.elements();
    
    // Create card element
    const cardElement = elements.create('card', {
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          fontWeight: 400,
          fontFamily: '"Montserrat", sans-serif',
          fontSize: '16px',
          '::placeholder': {
            color: '#CFD7E0',
          },
        },
      }
    });
    
    // Mount the card element to the DOM
    const cardContainer = document.getElementById('stripe-card-element');
    if (cardContainer) {
      cardElement.mount(cardContainer);
      
      // Handle form submission
      const paymentForm = document.getElementById('payment-form');
      if (paymentForm) {
        paymentForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          
          const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
          });
          
          if (error) {
            // Show error to customer
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = error.message;
          } else {
            // Send paymentMethod.id to your server
            stripeTokenHandler(paymentMethod.id);
          }
        });
      }
    }
  }
}

/**
 * Handle Stripe token
 * @param {string} paymentMethodId - The Stripe payment method ID
 */
function stripeTokenHandler(paymentMethodId) {
  // Insert the token ID into the form so it gets submitted to the server
  const form = document.getElementById('payment-form');
  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripePaymentMethodId');
  hiddenInput.setAttribute('value', paymentMethodId);
  form.appendChild(hiddenInput);
  
  // Submit the form
  form.submit();
}

/**
 * PayPal Integration
 */
function initPayPal() {
  // This would be replaced with your actual PayPal client ID
  const paypalClientId = 'test_client_id';
  
  // Only proceed if PayPal is loaded
  if (window.paypal) {
    paypal.Buttons({
      createOrder: function(data, actions) {
        // Set up the transaction
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: document.getElementById('order-total').value
            }
          }]
        });
      },
      onApprove: function(data, actions) {
        // Capture the funds from the transaction
        return actions.order.capture().then(function(details) {
          // Show a success message
          alert('Transaction completed by ' + details.payer.name.given_name);
          
          // Call your server to save the transaction
          return fetch('/api/paypal-transaction-complete', {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              orderID: data.orderID,
              details: details
            })
          });
        });
      }
    }).render('#paypal-button-container');
  }
}

/**
 * Mercado Pago Integration
 */
function initMercadoPago() {
  // This would be replaced with your actual Mercado Pago public key
  const mercadoPagoPublicKey = 'TEST-public-key';
  
  // Only proceed if Mercado Pago is loaded
  if (window.Mercadopago) {
    // Initialize Mercado Pago
    Mercadopago.setPublishableKey(mercadoPagoPublicKey);
    
    // Handle form submission
    const mpForm = document.getElementById('mercadopago-form');
    if (mpForm) {
      mpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Create token
        Mercadopago.createToken(mpForm, function(status, response) {
          if (status != 200 && status != 201) {
            // Show errors
            const errorElement = document.getElementById('mp-errors');
            errorElement.textContent = response.message || 'Error processing payment';
          } else {
            // Token was created successfully
            const token = response.id;
            
            // Add token to form
            const hiddenInput = document.createElement('input');
            hiddenInput.setAttribute('type', 'hidden');
            hiddenInput.setAttribute('name', 'mercadopagoToken');
            hiddenInput.setAttribute('value', token);
            mpForm.appendChild(hiddenInput);
            
            // Submit form
            mpForm.submit();
          }
        });
      });
    }
    
    // OXXO payment option
    const oxxoButton = document.getElementById('oxxo-payment-button');
    if (oxxoButton) {
      oxxoButton.addEventListener('click', function() {
        // Redirect to OXXO payment page or handle OXXO payment flow
        // This would typically involve server-side processing
        window.location.href = '/checkout/oxxo';
      });
    }
  }
}

/**
 * Update payment method display based on selection
 */
document.addEventListener('DOMContentLoaded', function() {
  const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
  const paymentSections = document.querySelectorAll('.payment-method-section');
  
  paymentMethodRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      // Hide all payment sections
      paymentSections.forEach(section => {
        section.style.display = 'none';
      });
      
      // Show selected payment section
      const selectedMethod = this.value;
      document.getElementById(`${selectedMethod}-section`).style.display = 'block';
    });
  });
});
