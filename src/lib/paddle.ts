/**
 * Paddle.js-Initialisierung als Singleton.
 *
 * Wird ausschließlich von den React-Islands der Preisseite importiert –
 * dadurch landet Paddle.js nur im Bundle der Preis-/Checkout-Seite
 * (Konvention aus CLAUDE.md). Kein eigener Checkout-Code: Paddle übernimmt
 * Zahlung, VAT und Rechnungsstellung als Merchant of Record.
 */
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

let paddlePromise: Promise<Paddle | undefined> | null = null;

export function getPaddle(): Promise<Paddle | undefined> {
  if (!paddlePromise) {
    const token = import.meta.env.PUBLIC_PADDLE_CLIENT_TOKEN as
      | string
      | undefined;
    const environment =
      (import.meta.env.PUBLIC_PADDLE_ENVIRONMENT as
        | "sandbox"
        | "production"
        | undefined) ?? "sandbox";

    if (!token) {
      // Ohne Token (z. B. lokale Entwicklung) bleibt der Checkout deaktiviert.
      paddlePromise = Promise.resolve(undefined);
    } else {
      paddlePromise = initializePaddle({ token, environment }).catch(() => {
        paddlePromise = null;
        return undefined;
      });
    }
  }
  return paddlePromise;
}

/** Öffnet das Paddle-Checkout-Overlay für ein Jahresabo. */
export async function openCheckout(
  priceId: string,
  quantity = 1,
): Promise<boolean> {
  const paddle = await getPaddle();
  if (!paddle) return false;
  paddle.Checkout.open({
    items: [{ priceId, quantity }],
  });
  return true;
}
