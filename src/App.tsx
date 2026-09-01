import { useEffect, useRef, useState, type FormEvent } from 'react';
import Container from './components/layout/Container';
import Section from './components/layout/Section';
import Button from './components/ui/Button';
import Input from './components/forms/Input';
import Hero from './components/Hero';
import HorizontalExperience from './components/HorizontalExperience';

const phone = '+351910131072';
const commercialEmail = 'atendimento@premiumcars.pt';
const demoAddress = 'Rua da Mobilidade, 24 · 2400-000 Leiria';
const nav = [['Início', '#inicio'], ['Para motoristas', '#experiencia'], ['Candidatura', '#viagem'], ['Contactos', '#contactos']];
function Arrow() { return <span aria-hidden="true">↗</span>; }
function RequestForm({ onPrivacy }: { onPrivacy: () => void }) {
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState('');
  const startedAt = useRef(0);
  const lastSubmission = useRef(0);
  useEffect(() => { startedAt.current = Date.now(); }, []);
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Lisbon', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const whatsappHref = message ? `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}` : undefined;
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const now = Date.now();
    if (String(data.get('empresa') || '').trim()) return;
    if (!startedAt.current || now - startedAt.current < 1800) { setFormError('Aguarde um momento e volte a enviar a candidatura.'); return; }
    if (now - lastSubmission.current < 15000) { setFormError('A candidatura já foi preparada. Aguarde antes de tentar novamente.'); return; }
    lastSubmission.current = now;
    setFormError('');
    setCopied(false);
    const details = [
      'Olá, Premium Ride. Gostaria de apresentar a minha candidatura para TVDE.',
      `Nome: ${data.get('nome')}`,
      `Contacto: ${data.get('contacto')}`,
      `E-mail: ${data.get('email')}`,
      `Localidade: ${data.get('localidade')}`,
      `Interesse: ${data.get('modelo')}`,
      `Certificado TVDE: ${data.get('certificado')}`,
      `Disponibilidade: ${data.get('disponibilidade')}`,
      data.get('experiencia') ? `Experiência em TVDE: ${data.get('experiencia')}` : '',
      data.get('observacoes') ? `Observações: ${data.get('observacoes')}` : '',
      'Consentimento de privacidade: aceite',
    ].filter(Boolean);
    setMessage(details.join('\n'));
  }
  return <div className="request-panel"><div className="request-heading"><span className="eyebrow">CANDIDATURA DE MOTORISTA</span><h3>Vamos começar?</h3><p>Partilhe o seu perfil para consultar as condições disponíveis.</p></div>
    <form onSubmit={prepare} className="request-form">
      <label className="form-honeypot" aria-hidden="true">Empresa<input name="empresa" tabIndex={-1} autoComplete="off" /></label>
      <div className="field-row"><Input label="O seu nome" name="nome" autoComplete="name" required maxLength={80}/><Input label="Telefone" name="contacto" type="tel" autoComplete="tel" placeholder="+351" required maxLength={24}/></div>
      <div className="field-row"><Input label="E-mail" name="email" type="email" autoComplete="email" required maxLength={120}/><Input label="Localidade" name="localidade" autoComplete="address-level2" placeholder="Ex.: Lisboa" required maxLength={80}/></div>
      <div className="field-row"><label className="field"><span className="field__label">Tenho interesse em</span><select className="field__control" name="modelo" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Alugar uma viatura TVDE</option><option>Trabalhar com viatura própria</option><option>Conhecer ambas as opções</option></select></label><label className="field"><span className="field__label">Certificado TVDE</span><select className="field__control" name="certificado" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Já tenho certificado</option><option>Está em processo</option><option>Ainda não tenho</option></select></label></div>
      <div className="field-row"><Input label="Disponível a partir de" name="disponibilidade" type="date" min={today} required/><Input label="Experiência em TVDE" name="experiencia" placeholder="Opcional" maxLength={80}/></div>
      <details className="form-options"><summary>Adicionar observações <span aria-hidden="true">+</span></summary><label className="field"><span className="field__label">Observações</span><textarea className="field__control" name="observacoes" rows={2} maxLength={300} placeholder="Horários pretendidos ou outras informações relevantes"/></label></details>
      <label className="privacy-consent"><input type="checkbox" name="consentimento" required/><span>Li a informação de <button type="button" onClick={onPrivacy}>Privacidade</button> e autorizo o contacto da Premium Ride sobre esta candidatura.</span></label>
      {formError && <p className="form-error" role="alert">{formError}</p>}
      <Button type="submit">Preparar candidatura <Arrow/></Button><p className="form-note">A candidatura não garante viatura ou integração. Condições sujeitas a análise e confirmação. Protegido contra envios automáticos.</p>
    </form>
    {message && <div className="request-result" role="status"><h4>A sua candidatura está pronta.</h4><p>Envie os dados pelo WhatsApp ou ligue para conhecer as condições disponíveis.</p><textarea aria-label="Detalhes da candidatura" value={message} readOnly rows={9}/><div className="cluster"><Button as="a" href={whatsappHref} target="_blank" rel="noreferrer">Abrir no WhatsApp <Arrow/></Button><Button type="button" variant="secondary" onClick={async () => { try { await navigator.clipboard.writeText(message); setCopied(true); } catch { setCopied(false); } }}>{copied ? 'Copiado' : 'Copiar dados'}</Button><Button as="a" href={`tel:${phone}`} variant="ghost">Ligar <Arrow/></Button></div></div>}
  </div>;
}
export default function App() {
  const [menu, setMenu] = useState(false);
  const [legal, setLegal] = useState<'privacidade' | 'cookies' | 'legal' | null>(null);
  useEffect(() => { const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); }; window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape); }, []);
  return <>
    <a className="skip-link" href="#main-content">Saltar para o conteúdo</a>
    <HorizontalExperience header={
    <header className="ride-header"><Container className="header-inner"><a className="brand-logo" href="#inicio" aria-label="Premium Ride — início"><img src="/logo.png" alt="Premium Ride" width="500" height="500" /></a><nav aria-label="Navegação principal" className="desktop-nav">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav><a className="header-contact" href={`tel:${phone}`}>+351 910 131 072 <Arrow/></a><button className="menu-toggle" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}>{menu ? 'Fechar' : 'Menu'} <span aria-hidden="true">{menu ? '−' : '+'}</span></button></Container>{menu && <nav id="mobile-menu" className="mobile-nav" aria-label="Navegação móvel">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}<a href={`tel:${phone}`}>+351 910 131 072</a></nav>}</header>
    } panels={[
      <>
      <Hero/>

      </>,
      <Section key="experiencia" id="experiencia" variant="spacious"><Container className="experience-layout"><div><p className="eyebrow">PARA MOTORISTAS TVDE</p><h2>A sua atividade.<br/><em>O próximo passo.</em></h2><p className="coverage-note">Candidaturas e aluguer de viaturas para atividade TVDE em Lisboa, sujeitos a disponibilidade e análise.</p></div><div className="experience-copy"><p className="large-copy">Procura uma viatura para trabalhar em TVDE ou pretende apresentar-se como motorista? Comece por nos indicar o seu perfil.</p><ol className="booking-steps" aria-label="Como apresentar uma candidatura"><li><span>01</span><div><strong>Escolha a modalidade</strong><small>Aluguer de viatura ou atividade com viatura própria.</small></div></li><li><span>02</span><div><strong>Apresente o seu perfil</strong><small>Contacto, localização, certificado e disponibilidade.</small></div></li><li><span>03</span><div><strong>Conheça as condições</strong><small>A Premium Ride entra em contacto após análise.</small></div></li></ol><a href="#viagem" className="text-link">Apresentar candidatura <Arrow/></a></div></Container></Section>
,      <Section key="viagem" id="viagem" className="journey-section" variant="spacious"><Container className="journey-layout"><div className="journey-copy"><p className="eyebrow">CANDIDATURAS TVDE</p><h2>Escolha como quer<br/><em>trabalhar.</em></h2><p>Preencha o formulário para consultar opções e condições disponíveis. Não é necessário enviar documentos nesta fase.</p><div className="journey-list"><details><summary>Alugar uma viatura TVDE <span>+</span></summary><p>Indique a sua disponibilidade e situação atual para consultar as viaturas e condições que possam estar disponíveis.</p></details><details><summary>Trabalhar com viatura própria <span>+</span></summary><p>Apresente o seu perfil e indique que já dispõe de viatura para conhecer possíveis condições de integração.</p></details><details><summary>Que requisitos devo confirmar? <span>+</span></summary><p>A atividade exige documentação e habilitação próprias. A lista aplicável depende da situação do motorista, da viatura e do modelo de operação. Consulte a <a href="https://www.imt-ip.pt/rodoviario/infraestruturas-rodoviarias/tvde/" target="_blank" rel="noreferrer">informação oficial do IMT <Arrow/></a> e confirme o seu caso com a Premium Ride.</p></details><details><summary>Que documentos devo enviar? <span>+</span></summary><p>Nenhum documento é solicitado neste formulário. Depois do primeiro contacto, a equipa indica apenas os elementos necessários para analisar o seu caso.</p></details><details><summary>Quanto tempo demora a análise? <span>+</span></summary><p>O prazo depende do perfil, da documentação necessária e da disponibilidade de viatura. Os próximos passos são comunicados após a análise inicial.</p></details></div><p className="availability-note">Viaturas, integração e condições sujeitas a disponibilidade, análise e confirmação.</p></div><RequestForm onPrivacy={() => setLegal('privacidade')}/></Container></Section>
,
      <>
      <Section id="contactos" variant="spacious" className="contact-section"><Container><p className="eyebrow">CANDIDATURAS E INFORMAÇÕES</p><h2 className="contact-heading">Quer trabalhar em TVDE?<br/><em>Fale com a Premium Ride.</em></h2><a className="contact-number" href={`tel:${phone}`}>+351 910 131 072 <Arrow/></a><div className="contact-actions"><a className="contact-whatsapp" href={`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent('Olá, Premium Ride. Gostaria de conhecer as opções para motoristas TVDE.')}`} target="_blank" rel="noreferrer">Falar pelo WhatsApp <Arrow/></a><a className="contact-whatsapp" href={`mailto:${commercialEmail}`}>{commercialEmail} <Arrow/></a></div><p className="contact-meta">Atendimento 24/7 <span aria-hidden="true">·</span> {demoAddress}</p><p className="contact-meta">Candidaturas por telefone, WhatsApp e e-mail <span aria-hidden="true">·</span> Chamada para a rede móvel nacional</p><p className="demo-disclaimer">Dados de contacto e morada apresentados para demonstração.</p></Container></Section>
    <footer className="ride-footer"><Container><div className="footer-bottom"><span>© {new Date().getFullYear()} Premium Ride</span><div><button onClick={() => setLegal(legal === 'privacidade' ? null : 'privacidade')} aria-expanded={legal === 'privacidade'}>Privacidade</button><button onClick={() => setLegal(legal === 'cookies' ? null : 'cookies')} aria-expanded={legal === 'cookies'}>Cookies</button><button onClick={() => setLegal(legal === 'legal' ? null : 'legal')} aria-expanded={legal === 'legal'}>Informação legal</button></div></div>{legal && <div className="legal-info"><h3>{legal === 'privacidade' ? 'Privacidade neste site' : legal === 'cookies' ? 'Cookies neste site' : 'Informação legal'}</h3><p>{legal === 'privacidade' ? `Ao consentir, autoriza a Premium Ride a usar os dados indicados apenas para analisar a candidatura e entrar em contacto consigo. Nesta demonstração, os dados permanecem no navegador até serem partilhados por WhatsApp, telefone ou e-mail; a ligação temporária à folha de candidaturas será ativada quando o respetivo destino estiver configurado. Não envie documentos pessoais neste formulário. Pode retirar o consentimento ou pedir esclarecimentos através de ${commercialEmail}.` : legal === 'cookies' ? 'Esta versão do site não utiliza cookies de publicidade ou analítica. A proteção antispam usa validações do formulário e limites de envio no navegador, sem criar perfis de utilizador.' : `Premium Cars, Lda. · NIF 000 000 000 · ${demoAddress}. Atendimento 24/7. Dados societários e morada fictícios, utilizados apenas nesta demonstração.`}</p><button className="text-link" onClick={() => setLegal(null)}>Fechar</button></div>}</Container></footer>
      </>,
    ]}/>
  </>;
}
