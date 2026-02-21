'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast, Toaster } from 'sonner';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const schema = z.object({
  name: z.string().optional(),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  consent: z.literal(true),
});

type FormData = z.infer<typeof schema>;

const categories = [
  {
    id: 'fresh-juices',
    name: 'Fresh Juices',
    image: '/images/fresh-juices.jpg', // ← replace with your image
    items: [
      { name: 'Lime Soda', price: 30 },
      { name: 'Lime Juice', price: 30 },
      { name: 'Muskmelon', price: 60 },
      { name: 'Pineapple', price: 60 },
      { name: 'Watermelon', price: 60 },
    ],
  },
  {
    id: 'mojito',
    name: 'Mojito',
    image: '/images/mojito.jpg',
    items: [
      { name: 'Green Apple', price: 70 },
      { name: 'Orange', price: 70 },
      { name: 'Strawberry', price: 70 },
    ],
  },
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    image: '/images/cold-coffee.jpg',
    items: [
      { name: 'Hazelnut', price: 130 },
      { name: 'Vanilla', price: 130 },
      { name: 'Irish', price: 149 },
    ],
  },
  {
    id: 'shakes',
    name: 'Shakes',
    image: '/images/shakes.jpg',
    items: [
      { name: 'Blueberry', price: 100 },
      { name: 'Chocolate', price: 100 },
      { name: 'Strawberry', price: 100 },
      { name: 'American Mudpie', price: 130 },
    ],
  },
  {
    id: 'nuggets',
    name: 'Nuggets',
    image: '/images/nuggets.jpg',
    items: [
      { name: 'Veg Nuggets', price: 90 },
      { name: 'Veg Roll', price: 90 },
      { name: 'Chicken Nuggets', price: 90 },
    ],
  },
  {
    id: 'french-fries',
    name: 'French Fries',
    image: '/images/french-fries.jpg',
    items: [
      { name: 'Classic Salt', price: 100 },
      { name: 'Peri Peri', price: 110 },
      { name: 'Cheesy', price: 130 },
      { name: 'Chicken Cheesy', price: 149 },
    ],
  },
  {
    id: 'burger',
    name: 'Burger',
    image: '/images/burger.jpg',
    items: [
      { name: 'Veg Burger', price: 120 },
      { name: 'Zinger Burger', price: 120 },
      { name: 'Smashed', price: 180 },
    ],
  },
  {
    id: 'sandwich',
    name: 'Sandwich',
    image: '/images/sandwich.jpg',
    items: [
      { name: 'Aloo Tikki', price: 120 },
      { name: 'Chicken', price: 120 },
    ],
  },
  {
    id: 'icecream',
    name: 'Icecream',
    image: '/images/icecream.jpg',
    items: [
      { name: 'Butterscotch', price: 50 },
      { name: 'Chocolate Brownie', price: 50 },
      { name: 'Vanilla', price: 50 },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    image: '/images/desserts.jpg',
    items: [
      { name: 'Jamun With Icecream', price: 70 },
      { name: 'Brownie With Icecream', price: 100 },
      { name: 'Melt My Heart', price: 149 },
    ],
  },
  {
    id: 'evening',
    name: 'After 7:00 PM',
    image: '/images/evening-specials.jpg',
    items: [
      { name: 'Mughlai Dum Biryani', price: 180 },
      { name: 'Shawarma Roll', price: 80 },
      { name: 'Shawaya (Full)', price: 420 },
    ],
  },
];

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');

  useEffect(() => {
    if (localStorage.getItem('menu_access') === 'yes') {
      setShowMenu(true);
    }
  }, []);

  // Highlight active tab on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100; // adjusted for smaller header
      let current = categories[0]?.id || '';

      categories.forEach((cat) => {
        const el = document.getElementById(cat.id);
        if (el && el.offsetTop <= scrollPos) current = cat.id;
      });

      if (current !== activeCategory) setActiveCategory(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const phone = '+91' + data.phone;
      const { error } = await supabase.from('leads').insert({
        name: data.name || null,
        phone,
        consented: true,
      });
      if (error) throw error;

      toast.success('Thank you! Enjoy the menu');
      localStorage.setItem('menu_access', 'yes');
      setShowMenu(true);
      reset();
    } catch {
      toast.error('Failed to save');
    }
  };

  const skip = () => {
    setShowMenu(true);
    localStorage.setItem('menu_access', 'yes');
    toast.info('Menu opened');
  };

  return (
    <>
      <Toaster position="top-center" richColors />

      {!showMenu ? (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5 bg-dark">
          <div className="card shadow-lg p-5 bg-dark text-white border border-secondary rounded-4" style={{ maxWidth: '500px', width: '100%' }}>
            <h1 className="text-center mb-4 fw-bold text-warning display-5">Casa Cafe</h1>
            <p className="text-center text-secondary mb-5 fs-5">Scan • Browse • Get Exclusive Offers</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  className="form-control form-control-lg bg-dark border-secondary text-white placeholder-secondary"
                  placeholder="Your Name (optional)"
                  {...register('name')}
                />
              </div>

              <div className="mb-4">
                <input
                  className="form-control form-control-lg bg-dark border-secondary text-white placeholder-secondary"
                  placeholder="Mobile Number *"
                  {...register('phone')}
                />
                {errors.phone && <small className="text-danger mt-2 d-block">{errors.phone.message}</small>}
              </div>

              <div className="form-check mb-4">
                <input className="form-check-input bg-dark border-secondary" type="checkbox" id="consent" {...register('consent')} />
                <label className="form-check-label text-secondary" htmlFor="consent">
                  I agree to receive promotions & updates via WhatsApp/SMS (Reply STOP to unsubscribe)
                </label>
                {errors.consent && <small className="text-danger mt-2 d-block">{errors.consent.message}</small>}
              </div>

              <button type="submit" className="btn btn-warning btn-lg w-100 fw-bold rounded-pill" disabled={isSubmitting}>
                {isSubmitting ? 'Please wait...' : 'View Menu & Offers'}
              </button>
            </form>

            <button className="btn btn-link text-secondary w-100 mt-4 fs-6" onClick={skip}>
              Skip → open menu anyway
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-dark min-vh-100 text-white pb-5">
          <div className="container pt-4 pt-md-5">
            <h1 className="text-center display-4 fw-bold mb-4 text-warning">Casa Cafe Menu</h1>
            <p className="text-center text-secondary mb-5">Exclusively for Firenze</p>

            {/* Smaller & more elegant category bar */}
            <div className="sticky-top bg-dark shadow mb-5" style={{ top: 0, zIndex: 1000 }}>
              <div className="d-flex overflow-auto py-2 px-3 gap-2 scrollbar-hide">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`btn rounded-pill px-4 py-2 fw-medium text-nowrap fs-6 transition-all shadow-sm ${
                      activeCategory === cat.id
                        ? 'btn-warning text-dark shadow-lg scale-105'
                        : 'btn-outline-warning text-warning border border-warning border-opacity-50 hover:border-opacity-100 hover:shadow'
                    }`}
                    onClick={() => document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Category cards */}
            {categories.map(cat => (
              <div className="card bg-dark border border-secondary-subtle mb-5 shadow-lg rounded-4 overflow-hidden" id={cat.id} key={cat.id}>
                <img
                  src={cat.image}
                  className="card-img-top"
                  alt={cat.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div className="card-body p-0">
                  <div className="bg-dark text-warning fw-bold p-3 fs-4 border-bottom border-secondary">
                    {cat.name}
                  </div>
                  <ul className="list-group list-group-flush">
                    {cat.items.map((item, i) => (
                      <li
                        key={i}
                        className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center py-3 px-4 border-bottom border-secondary fs-5"
                      >
                        <span>{item.name}</span>
                        <span className="fw-bold text-warning">₹{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}