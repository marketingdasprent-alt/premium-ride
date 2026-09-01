import { useEffect, useState } from 'react';
import Container from './layout/Container';
import Section from './layout/Section';
import Button from './ui/Button';

const slides = [
  { src: '/ride-mercedes-night.jpg', alt: 'Mercedes preto junto a um edifício à noite — imagem ilustrativa' },
  { src: '/ride-mercedes-city.jpg', alt: 'Mercedes preto numa rua iluminada à noite — imagem ilustrativa' },
  { src: '/ride-bmw-garage.jpg', alt: 'BMW preto num estacionamento à noite — imagem ilustrativa' },
];

export default function Hero() {
  const [slide, setSlide] = useState({ active: 0, previous: -1 });
  const [loaded, setLoaded] = useState<number[]>([]);
  const [preload, setPreload] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const running = !hidden;

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    if (!loaded.includes(0)) return;
    const timer = window.setTimeout(() => setPreload(true), 600);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  useEffect(() => {
    if (!running || loaded.length < 2) return;
    const timer = window.setInterval(() => setSlide(current => {
      const next = Array.from({ length: slides.length - 1 }, (_, index) => (current.active + index + 1) % slides.length).find(index => loaded.includes(index));
      return next === undefined ? current : { active: next, previous: current.active };
    }), 6000);
    return () => window.clearInterval(timer);
  }, [running, loaded]);

  return <Section className={`hero hero--carousel${running ? '' : ' hero--paused'}`} variant="spacious" aria-label="Apresentação Premium Ride">
    <div className="hero-backdrop" aria-roledescription="carrossel" aria-label="Fotografias ilustrativas de veículos">
      {slides.map((item, index) => (index === 0 || preload) && <div key={item.src} className={`hero-slide${index === slide.active ? ' is-active' : ''}${index === slide.active || index === slide.previous ? ' is-animated' : ''}`} aria-hidden={index !== slide.active}>
        <img src={item.src} alt={item.alt} fetchPriority={index === 0 ? 'high' : 'low'} decoding="async" onLoad={() => setLoaded(current => current.includes(index) ? current : [...current, index])} onError={() => { if (index === 0) setPreload(true); }}/>
      </div>)}
    </div>
    <Container className="hero-layout">
      <div className="hero-copy"><p className="eyebrow"><span className="gold-line"/> MOTORISTAS TVDE · LISBOA</p><h1>Conduza com apoio.<br/>Cresça ao seu ritmo.<br/><em>Com a Premium Ride.</em></h1><p className="hero-description">Candidaturas para motoristas e aluguer de viaturas para TVDE em Lisboa. Apresente o seu perfil e consulte as condições disponíveis.</p><div className="hero-actions"><Button as="a" href="#viagem">Quero ser motorista <span aria-hidden="true">↗</span></Button></div></div>
    </Container>
    <small className="hero-static-note">Imagens ilustrativas · Viaturas sob consulta</small>
    <Container className="hero-values"><span>Aluguer de viaturas TVDE</span><span>Candidaturas de motoristas</span><span>Condições sob consulta</span></Container>
  </Section>;
}
