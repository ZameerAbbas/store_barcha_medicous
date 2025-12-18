import Link from "next/link";

export default function CartPage() {
    return (
        <div>
            <h1>Your Cart</h1>

            <Link href="/checkout">
                <button>Proceed to Checkout</button>
            </Link>
        </div>
    );
}
