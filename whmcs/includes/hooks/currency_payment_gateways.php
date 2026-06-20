<?php
/**
 * Fyphost — Currency-based payment gateway routing for WHMCS
 * --------------------------------------------------------------
 * Goal:
 *   - When the cart/active currency is INR  -> show Razorpay ONLY
 *   - When the cart/active currency is USD  -> show PayPal   ONLY
 *
 * Why this is needed:
 *   Razorpay's merchant account is based in INR. If a USD cart amount
 *   (e.g. $10) is handed to Razorpay, it is charged as the raw number in
 *   rupees (₹10) — i.e. "dollars treated like rupees". Restricting each
 *   gateway to its correct currency prevents that mismatch entirely.
 *
 * Install:
 *   Copy this file to:  <whmcs_root>/includes/hooks/currency_payment_gateways.php
 *   No further configuration is required unless your gateway "system names"
 *   differ (see $GATEWAY_BY_CURRENCY below).
 *
 * How it works:
 *   On every client-area page we output a tiny script. It only does anything
 *   on pages that actually render payment-method radio buttons (the cart /
 *   checkout). It hides the gateways that are not allowed for the active
 *   currency and auto-selects the allowed one. It is safe to run site-wide:
 *   on pages with no payment radios it is a no-op.
 *
 * NOTE on gateway "system names" (the radio button values):
 *   - Razorpay third-party module  ->  "razorpay"
 *   - PayPal Standard (classic)     ->  "paypal"
 *   - PayPal Checkout (newer)       ->  "paypalcheckout"
 *   Confirm yours under: Admin > Setup > Payments > Payment Gateways
 *   (the module file name, lowercase) and edit the map below if needed.
 */

if (!defined("WHMCS")) {
    die("This file cannot be accessed directly");
}

use WHMCS\Database\Capsule;

/**
 * Map of currency code => the ONLY gateway system name allowed for it.
 * Add more currencies here if you support them later.
 */
$GLOBALS['FYP_GATEWAY_BY_CURRENCY'] = array(
    'INR' => 'razorpay',
    'USD' => 'paypal', // change to 'paypalcheckout' if you use PayPal Checkout
);

add_hook('ClientAreaFooterOutput', 1, function ($vars) {

    $rules = isset($GLOBALS['FYP_GATEWAY_BY_CURRENCY'])
        ? $GLOBALS['FYP_GATEWAY_BY_CURRENCY']
        : array();

    if (empty($rules)) {
        return '';
    }

    // ----- Determine the active currency code -----
    $code = '';

    // 1) Cart currency stored in session (most reliable on the order form)
    if (!empty($_SESSION['currency'])) {
        $code = Capsule::table('tblcurrencies')
            ->where('id', (int) $_SESSION['currency'])
            ->value('code');
    }

    // 2) Fall back to the logged-in client's currency
    if (!$code && !empty($_SESSION['uid'])) {
        $currencyId = Capsule::table('tblclients')
            ->where('id', (int) $_SESSION['uid'])
            ->value('currency');
        if ($currencyId) {
            $code = Capsule::table('tblcurrencies')
                ->where('id', (int) $currencyId)
                ->value('code');
        }
    }

    if (!$code || !isset($rules[$code])) {
        // Unknown / unmapped currency: do nothing, show all gateways.
        return '';
    }

    $allowed = preg_replace('/[^a-z0-9_]/', '', strtolower($rules[$code]));

    // The script only acts when payment-method radios exist on the page.
    return <<<HTML
<script>
(function () {
  var ALLOWED = "{$allowed}";

  function applyRule() {
    var radios = document.querySelectorAll('input[name="paymentmethod"]');
    if (!radios || !radios.length) return; // not a checkout page -> no-op

    var firstAllowed = null;

    Array.prototype.forEach.call(radios, function (r) {
      var keep = (r.value === ALLOWED);
      // Hide the closest visual container for the radio.
      var box = r.closest('label, li, .payment-method, .form-check, .radio, div');
      if (box) { box.style.display = keep ? '' : 'none'; }
      if (!keep) { r.checked = false; }
      if (keep && !firstAllowed) { firstAllowed = r; }
    });

    // Auto-select the only allowed gateway so checkout can proceed.
    if (firstAllowed && !firstAllowed.checked) {
      firstAllowed.checked = true;
      try { firstAllowed.dispatchEvent(new Event('change', { bubbles: true })); } catch (e) {}
    }
  }

  if (document.readyState !== 'loading') { applyRule(); }
  else { document.addEventListener('DOMContentLoaded', applyRule); }

  // Re-apply if the cart re-renders its payment section via AJAX.
  document.addEventListener('click', function () { setTimeout(applyRule, 300); });
})();
</script>
HTML;
});
