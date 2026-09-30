const assert = require('assert');

// Test honeypot logic and lead validation
function validateLead(data) {
  const trap = data.website || data.honeypot;
  if (trap && String(trap).trim() !== '') {
    return { ok: true, isSpam: true, status: 200 };
  }

  const name = (data.name || data.fullName || '').trim();
  const phone = (data.phone || '').trim();
  const email = (data.email || '').trim().toLowerCase();

  if (!name || !email || !phone) {
    return { ok: false, error: 'Name, phone number, and email address are required.', status: 400 };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.', status: 400 };
  }

  return { ok: true, isSpam: false, status: 200 };
}

console.log('--- RUNNING LEAD API UNIT TESTS ---');

// Test 1: Valid payload from Contact form
const contactPayload = {
  name: 'Sarah Jenkins',
  phone: '0412345678',
  email: 'sarah.jenkins@example.com',
  enquiryType: 'Knockdown Rebuild',
  suburb: 'Camden'
};
const res1 = validateLead(contactPayload);
assert.strictEqual(res1.ok, true, 'Valid contact payload should pass');
assert.strictEqual(res1.isSpam, false);
console.log('✓ Test 1: Valid contact form payload passes');

// Test 2: Valid payload from Quick Enquiry Drawer
const drawerPayload = {
  fullName: 'David Miller',
  phone: '0499887766',
  email: 'david@example.com.au',
  interestType: 'New Build',
  targetDesignName: 'Verona 35 Series'
};
const res2 = validateLead(drawerPayload);
assert.strictEqual(res2.ok, true, 'Valid drawer payload should pass');
console.log('✓ Test 2: Valid drawer form payload passes');

// Test 3: Spambot with honeypot triggered
const spamPayload = {
  name: 'Spam Bot',
  phone: '123456789',
  email: 'bot@spam.com',
  website: 'http://spam-link.ru'
};
const res3 = validateLead(spamPayload);
assert.strictEqual(res3.ok, true, 'Spambots should get a silent 200 without error');
assert.strictEqual(res3.isSpam, true, 'Should be flagged as spam');
console.log('✓ Test 3: Spambot honeypot correctly trapped');

// Test 4: Missing required field
const incompletePayload = {
  name: 'No Phone Person',
  email: 'user@example.com'
};
const res4 = validateLead(incompletePayload);
assert.strictEqual(res4.ok, false);
assert.strictEqual(res4.status, 400);
console.log('✓ Test 4: Incomplete submission fails with 400');

// Test 5: Invalid email format
const badEmailPayload = {
  name: 'Bad Email',
  phone: '0411223344',
  email: 'not-an-email'
};
const res5 = validateLead(badEmailPayload);
assert.strictEqual(res5.ok, false);
assert.strictEqual(res5.status, 400);
console.log('✓ Test 5: Malformed email rejected with 400');

console.log('--- ALL LEAD API TESTS PASSED (5/5) ---');
