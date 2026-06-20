# Fyphost WHMCS fixes

These files address three WHMCS billing issues. **They belong in your WHMCS
installation, not in the static website.** This folder is kept separate from
the marketing site and has no effect on the front-end deploy.

---

## 1. Currency → gateway routing (INR = Razorpay, USD = PayPal)

### The problem
Razorpay's merchant account is INR-based. When a **USD** cart amount (e.g. `$10`)
is sent to Razorpay it gets charged as the raw number in rupees (`₹10`) — this is
the "PayPal and Razorpay treating dollars like rupees" symptom. The fix is to make
sure each gateway only ever receives its own currency.

### Step A — configure currencies (admin, one-time)
1. **Setup → Payments → Currencies**
2. Ensure you have **two** currencies:
   - `INR` (your default)
   - `USD` with a correct exchange rate
3. Make sure your **products have USD pricing** filled in
   (**Setup → Products/Services →** each product **→ Pricing** tab). If USD prices
   are blank, WHMCS falls back to converting INR, which is what causes wrong amounts.

### Step B — restrict gateways per currency (the hook)
Copy this file into your WHMCS install:

```
whmcs/includes/hooks/currency_payment_gateways.php
        ↓
<whmcs_root>/includes/hooks/currency_payment_gateways.php
```

The hook shows **Razorpay only** when the active currency is INR, and
**PayPal only** when it is USD. It auto-selects the correct gateway at checkout.

> **Important:** confirm your gateway *system names* (the lowercase module file
> names under **Setup → Payments → Payment Gateways**) and, if they differ, edit
> the map near the top of the hook file:
> ```php
> $GLOBALS['FYP_GATEWAY_BY_CURRENCY'] = array(
>     'INR' => 'razorpay',
>     'USD' => 'paypal', // or 'paypalcheckout'
> );
> ```
> Common names: Razorpay = `razorpay`, PayPal Standard = `paypal`,
> PayPal Checkout = `paypalcheckout`.

---

## 2. PayPal for USD **without** the credit-card option

The guest **"Pay with Debit or Credit Card"** form is controlled by your **PayPal
business account**, not by WHMCS:

1. Log in to PayPal → **Account Settings → Website payments → Website preferences**
2. Set **"PayPal account optional" = OFF**

With that off, buyers must log into a PayPal account and the guest card form
disappears. (If you use PayPal Checkout, also disable *Advanced/Standard Card
Payments* in **Account Settings → Payment preferences**.)

---

## 3. Coupon / promotion codes not applying

In **Setup → Promotions**, open the code and check each of these — any single one
will stop a code from applying, sometimes with no visible error:

| Check | What to look for |
|-------|------------------|
| **Applies To** | The product in the cart must be in the promo's selected products. If "Applies To" is empty it may apply to none. |
| **Cycles** | If limited to e.g. "Annually", a monthly cart won't match. |
| **Recurring** | If unchecked, the discount only touches setup fees (often ₹0) so the total looks unchanged. |
| **Start / Expiry date** | Must be current. |
| **Max Uses / Uses** | Not exhausted. |
| **New Signups Only / Requires** | Must match the customer's status. |
| **Minimum order value** | Cart must meet it. |

### If the field does nothing at all (most likely cause)
A **custom or third-party order-form template** frequently breaks the promo box.
To confirm:

1. **Setup → General Settings → Ordering → Default Order Form Template**
2. Temporarily switch to **"Standard Cart"**
3. Re-test the coupon.

If the code now applies, the previous template is the culprit — update or replace
it. (Share the template name/code and it can be patched.)

---

## Testing checklist
- [ ] Switch cart to **INR** → only **Razorpay** appears and is pre-selected.
- [ ] Switch cart to **USD** → only **PayPal** appears and is pre-selected.
- [ ] Complete a small live USD order → PayPal charges **USD**, not rupees.
- [ ] PayPal checkout shows **no guest credit-card form**.
- [ ] A valid promo code reduces the cart total on the **Standard Cart** template.
