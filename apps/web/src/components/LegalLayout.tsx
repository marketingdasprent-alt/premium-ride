import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/premiumride-logo-removebg-preview.png";

type LegalLayoutProps = {
  title: string;
  updatedAt: string;
  children: ReactNode;
};

export function LegalLayout({ title, updatedAt, children }: LegalLayoutProps) {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-radial-gold" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-12">
        <header className="mb-12 flex flex-col items-center text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold/80 transition-colors hover:text-gold">
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar
          </Link>
          <img
            src={logo}
            alt="Premium Ride"
            className="mt-6 w-40 mix-blend-screen"
          />
          <h1 className="mt-6 font-display text-3xl text-gold md:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Última atualização: {updatedAt}
          </p>
          <span className="mt-6 inline-block h-px w-16 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        </header>

        <article className="legal-prose">{children}</article>

        <footer className="mt-16 border-t border-gold/10 pt-6 text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} Premium Ride
        </footer>
      </div>
    </main>
  );
}
