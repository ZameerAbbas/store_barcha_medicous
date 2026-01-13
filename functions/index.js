const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Gmail credentials stored in Firebase config
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Cloud Function triggered on new order
exports.sendOrderEmail = functions.database
  .ref("/orders/{orderKey}")
  .onCreate(async (snapshot, context) => {
    const order = snapshot.val();

    if (!order || !order.customer?.email) {
      console.log("No user email found in order");
      return null;
    }

    const userEmail = order.customer.email;

    // Build product list HTML
    const productListHTML = order.ProductOrder
      .map(
        (p) =>
          `<li>${p.productName || p.name} x ${p.quantity || 1} - $${p.price || 0}</li>`
      )
      .join("");

    // Calculate total
    const total = (order.subtotal || 0) + (order.deliveryFee || 0);

    // User email options
    const userMailOptions = {
      from: `"My Store" <${gmailEmail}>`,
      to: userEmail,
      subject: "Order Confirmed ✅",
      html: `
        <h2>Thank you for your order!</h2>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>Order Date:</strong> ${order.orderDate}</p>
        <ul>${productListHTML}</ul>
        <p><strong>Subtotal:</strong> $${order.subtotal}</p>
        <p><strong>Delivery Fee:</strong> $${order.deliveryFee}</p>
        <p><strong>Total:</strong> $${total}</p>
        <p>We’ll notify you when your order is shipped.</p>
      `,
    };

    // Admin email options (optional)
    const adminMailOptions = {
      from: `"My Store" <${gmailEmail}>`,
      to: "admin@yourstore.com", // replace with your admin email
      subject: `New Order Received - ${order.orderId}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Customer:</strong> ${order.customer.firstName} ${order.customer.lastName}</p>
        <p><strong>Email:</strong> ${order.customer.email}</p>
        <p><strong>Phone:</strong> ${order.customer.phone}</p>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>Order Date:</strong> ${order.orderDate}</p>
        <ul>${productListHTML}</ul>
        <p><strong>Total:</strong> $${total}</p>
      `,
    };

    try {
      // Send email to user
      await transporter.sendMail(userMailOptions);
      console.log("Email sent to user:", userEmail);

      // Send email to admin
      await transporter.sendMail(adminMailOptions);
      console.log("Email sent to admin");
    } catch (error) {
      console.error("Email failed:", error);
    }

    return null;
  });
