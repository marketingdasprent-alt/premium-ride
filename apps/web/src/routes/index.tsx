import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Phone, MapPin } from "lucide-react";
import logo from "@/assets/premiumride-logo-removebg-preview.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium Ride — Conforto. Segurança. Excelência." },
      { name: "description", content: "Premium Ride — serviço de transporte premium. Site em construção. Contacte-nos para reservas." },
      { property: "og:title", content: "Premium Ride" },
      { property: "og:description", content: "Conforto. Segurança. Excelência." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient gold glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial-gold animate-shimmer" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 py-10">
        {/* Top tag */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-gold/80">
          <span className="h-px w-8 bg-gold/40" />
          Em construção
          <span className="h-px w-8 bg-gold/40" />
        </div>

        {/* Center */}
        <div className="flex flex-col items-center text-center">
          <img
            src={logo}
            alt="Premium Ride logótipo"
            className="w-72 max-w-full animate-float mix-blend-screen md:w-96"
          />

          <h1 className="sr-only">Premium Ride</h1>

          <p className="mt-2 font-display text-2xl italic text-gold md:text-3xl">
            Estamos a preparar algo <span className="text-gradient-gold">excepcional</span>
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            O nosso site está em construção. Entretanto, estamos disponíveis para o atender
            e tratar da sua reserva pelos contactos abaixo.
          </p>

          {/* Divider */}
          <div className="mt-12 flex items-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
          </div>

          {/* Contacts */}
          <div className="mt-12 grid w-full max-w-3xl gap-6 md:grid-cols-2">
            <ContactCard
              icon={<Phone className="h-5 w-5" />}
              label="Telemóvel"
              value="910 131 072 "
              href="tel:+351910131072"
            />
            <ContactCard
              icon={<MapPin className="h-5 w-5" />}
              label="Escritório"
              value="Lisboa, Portugal"
              href="https://maps.google.com/?q=Lisboa,Portugal"
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} Premium Ride · Conforto · Segurança · Excelência
        </footer>
      </div>
    </main>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group relative overflow-hidden rounded-lg border border-gold/20 bg-card/60 p-6 backdrop-blur-sm transition-all duration-500 hover:border-gold/60 hover:shadow-gold"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="flex items-start gap-4 text-left">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-transform duration-500 group-hover:scale-110">
          {icon}
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold/70">{label}</div>
          <div className="mt-1 font-display text-xl text-foreground md:text-2xl">{value}</div>
        </div>
      </div>
    </a>
  );
}
