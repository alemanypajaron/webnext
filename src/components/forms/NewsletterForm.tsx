'use client';

import { useState, useTransition } from 'react';
import { subscribeNewsletter } from '@/app/actions/forms';
import toast from 'react-hot-toast';

interface NewsletterFormProps {
  variant?: 'inline' | 'centered';
  showName?: boolean;
}

export default function NewsletterForm({ 
  variant = 'centered',
  showName = false 
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!email.trim()) {
      toast.error('Por favor, introduce tu email');
      return;
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor, introduce un email válido');
      return;
    }

    startTransition(async () => {
      try {
        const result = await subscribeNewsletter(email, nombre || undefined);

        if (result.success) {
          toast.success(result.message);
          setEmail('');
          setNombre('');
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error('Error en suscripción:', error);
        toast.error('Error al procesar la suscripción');
      }
    });
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          disabled={isPending}
          className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all disabled:opacity-50"
          required
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-8 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg whitespace-nowrap"
        >
          {isPending ? 'Suscribiendo...' : 'Suscribirme'}
        </button>
      </form>
    );
  }

  // Variant 'centered' - formulario con más campos
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      {showName && (
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre (opcional)"
          disabled={isPending}
          className="w-full px-4 py-3 rounded-lg border-2 border-white/30 bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:border-accent transition-all disabled:opacity-50"
        />
      )}
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        disabled={isPending}
        className="w-full px-4 py-3 rounded-lg border-2 border-white/30 bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:border-accent transition-all disabled:opacity-50"
        required
      />
      
      <button
        type="submit"
        disabled={isPending}
        className="w-full px-8 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {isPending ? 'Suscribiendo...' : 'Suscribirme al Newsletter'}
      </button>
      
      <p className="text-sm text-white/70 text-center">
        📧 Recibirás consejos y novedades sobre reformas y arquitectura técnica en Murcia
      </p>
    </form>
  );
}

