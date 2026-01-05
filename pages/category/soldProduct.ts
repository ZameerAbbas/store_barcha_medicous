/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, runTransaction } from "firebase/database";
import { db } from "../../firebase";

export const increaseProductSales = async (
  productId: string,
  quantity: number
) => {
  const productRef = ref(db, `products/${productId}`);

  await runTransaction(productRef, (current: any) => {
    if (current) {
    
      return {
        ...current,
        totalSold: (current.totalSold || 0) + quantity
      };
    }
    return current;
  });
};
