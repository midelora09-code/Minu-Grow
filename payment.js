// --- WhatsApp Payment Submission ---
const paymentForm = document.getElementById('paymentForm');

paymentForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const txn = document.getElementById('txn').value.trim();
  const amount = document.getElementById('amount').value.trim();
  
  if (!username || !txn || !amount) {
    alert("Please fill all fields!");
    return;
  }
  
  // Your WhatsApp number with country code
  const phoneNumber = "+919091824475";
  
  // WhatsApp message
  const message = `Hello Minu Grow!%0AUsername/Email: ${username}%0ATransaction ID: ${txn}%0AAmount Paid: ${amount}`;
  
  // Open WhatsApp in new tab
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  
  // Reset form
  paymentForm.reset();
});