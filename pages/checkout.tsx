import ProtectedPage from "../component/ProtectedPage";
import CheckoutView from "../component/CheckoutView";

export default function CheckoutPage() {
    return (
        <ProtectedPage redirectTo="/login">
            <CheckoutView />
        </ProtectedPage>
    );
}
