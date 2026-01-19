import { Cart, CartItem } from '@/types';

export function generateWhatsAppMessage(cart: Cart): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cityhighstyles.vercel.app';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'City High Styles';

  let message = `${encodeURIComponent('🛍️')} *New Order from ${siteName}*\n\n`;
  message += `${encodeURIComponent('📦')} *Order Details:*\n`;
  message += `${encodeURIComponent('━━━━━━━━━━━━━━━━')}\n\n`;

  cart.items.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Price: ₦${item.price.toLocaleString('en-NG')}\n`;
    message += `   Quantity: ${item.quantity}\n`;
    if (item.size) message += `   Size: ${item.size}\n`;
    if (item.color) message += `   Color: ${item.color}\n`;
    message += `   Subtotal: ₦${(item.price * item.quantity).toLocaleString('en-NG')}\n`;
    message += `   🔗 Link: ${siteUrl}/product/${item.slug}\n\n`;
  });

  message += `${encodeURIComponent('━━━━━━━━━━━━━━━━')}\n`;
  message += `${encodeURIComponent('💰')} *Total Amount: ₦${cart.total.toLocaleString('en-NG')}*\n`;
  message += `${encodeURIComponent('📊')} Total Items: ${cart.itemCount}\n\n`;
  message += `🔗 Website: ${siteUrl}\n\n`;
  message += `I would like to proceed with this order. Please confirm availability and provide payment details. Thank you! 🙏`;

  return encodeURIComponent(message);
}

export function generateWhatsAppUrl(cart: Cart): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2347046625465';
  const message = generateWhatsAppMessage(cart);
  
  return `https://wa.me/${phoneNumber}?text=${message}`;
}
