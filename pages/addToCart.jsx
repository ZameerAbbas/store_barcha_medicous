import { useState } from 'react';

export default function BMCProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState({});

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const toggleAccordion = (id) => {
    setOpenAccordion(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif', background: '#fff', color: '#222' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', borderBottom: '1px solid #eee', background: '#fff' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>BMC</div>
        <nav>
          <ul style={{ display: 'flex', gap: '25px', listStyle: 'none', margin: 0, padding: 0 }}>
            <li><a href="#" style={{ textDecoration: 'none', color: '#222', fontSize: '15px' }}>Home</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: '#222', fontSize: '15px' }}>Products</a></li>
            <li><a href="#" style={{ textDecoration: 'none', color: '#222', fontSize: '15px' }}>Categories</a></li>
          </ul>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input type="text" placeholder="Search medicines..." style={{ padding: '7px 12px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <button style={{ padding: '7px 12px', background: '#222', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login / Signup</button>
        </div>
      </header>

      <main style={{ width: '90%', margin: 'auto', padding: '30px 0' }}>
        <section style={{ display: 'flex', gap: '40px', marginBottom: '50px' }}>
          <div style={{ width: '300px', borderRadius: '10px', background: '#f0f0f0', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#999' }}>
            [Product Image]
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>MediGel Pain Relief Cream</h2>
            <p style={{ marginBottom: '10px', color: '#555' }}>
              Fast-acting topical cream for muscle aches, joint pain...
            </p>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>PKR 1,250.00</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '15px 0' }}>
              <button style={{ padding: '5px 15px', border: '1px solid #ccc', background: '#f9f9f9', cursor: 'pointer', borderRadius: '5px' }} onClick={handleDecrement}>-</button>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{quantity}</span>
              <button style={{ padding: '5px 15px', border: '1px solid #ccc', background: '#f9f9f9', cursor: 'pointer', borderRadius: '5px' }} onClick={handleIncrement}>+</button>
            </div>
            <button style={{ width: '200px', padding: '10px', marginTop: '10px', border: 'none', borderRadius: '5px', background: '#001f4d', color: 'white', cursor: 'pointer', display: 'block' }}>Add to Cart</button>
            <button style={{ width: '200px', padding: '10px', marginTop: '10px', border: '1px solid #ddd', borderRadius: '5px', background: '#f5f5f5', cursor: 'pointer', display: 'block' }}>Contact Support (WhatsApp)</button>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Related Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginTop: '20px', marginBottom: '40px' }}>
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center', background: '#fafafa' }}>Orthopedic Pad</div>
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center', background: '#fafafa' }}>Muscle Spray</div>
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center', background: '#fafafa' }}>Joint Supplement</div>
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center', background: '#fafafa' }}>Elastic Wrap</div>
          </div>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Safety Information</h2>
          <div style={{ margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}>
            <button style={{ width: '100%', padding: '12px', textAlign: 'left', background: '#f9f9f9', border: 'none', fontSize: '16px', cursor: 'pointer', borderRadius: '5px' }} onClick={() => toggleAccordion('allergy')}>
              Allergy Information
            </button>
            {openAccordion['allergy'] && (
              <div style={{ padding: '12px', color: '#444', background: '#fff' }}>
                Contains ingredients that may cause allergic reactions in sensitive individuals. 
                Consult your doctor if you have known allergies.
              </div>
            )}
          </div>
          <div style={{ margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}>
            <button style={{ width: '100%', padding: '12px', textAlign: 'left', background: '#f9f9f9', border: 'none', fontSize: '16px', cursor: 'pointer', borderRadius: '5px' }} onClick={() => toggleAccordion('sideEffects')}>
              Possible Side Effects
            </button>
            {openAccordion['sideEffects'] && (
              <div style={{ padding: '12px', color: '#444', background: '#fff' }}>
                May cause mild skin irritation, redness, or itching. Discontinue use if symptoms persist.
              </div>
            )}
          </div>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Usage Instructions</h2>
          <div style={{ margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}>
            <button style={{ width: '100%', padding: '12px', textAlign: 'left', background: '#f9f9f9', border: 'none', fontSize: '16px', cursor: 'pointer', borderRadius: '5px' }} onClick={() => toggleAccordion('apply')}>
              How to Apply
            </button>
            {openAccordion['apply'] && (
              <div style={{ padding: '12px', color: '#444', background: '#fff' }}>
                Apply a small amount to the affected area and massage gently until absorbed. 
                Use 2-3 times daily or as directed by your healthcare provider.
              </div>
            )}
          </div>
          <div style={{ margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}>
            <button style={{ width: '100%', padding: '12px', textAlign: 'left', background: '#f9f9f9', border: 'none', fontSize: '16px', cursor: 'pointer', borderRadius: '5px' }} onClick={() => toggleAccordion('warnings')}>
              Important Warnings
            </button>
            {openAccordion['warnings'] && (
              <div style={{ padding: '12px', color: '#444', background: '#fff' }}>
                For external use only. Avoid contact with eyes and open wounds. 
                Keep out of reach of children.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}