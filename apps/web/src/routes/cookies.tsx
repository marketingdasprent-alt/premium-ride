import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies — Premium Ride" },
      {
        name: "description",
        content:
          "Política de Cookies da Premium Ride. Saiba que cookies utilizamos e como pode gerir as suas preferências.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: CookiesPage,
});

const LAST_UPDATE = "19 de maio de 2026";

function CookiesPage() {
  const openPreferences = () => {
    if (typeof window === "undefined") return;
    const w = window as unknown as {
      CookieScript?: { instance?: { show?: () => void } };
    };
    w.CookieScript?.instance?.show?.();
  };

  return (
    <LegalLayout title="Política de Cookies" updatedAt={LAST_UPDATE}>
      <p>
        Esta Política de Cookies explica o que são cookies, quais utilizamos
        neste website e como pode gerir as suas preferências. Complementa a
        nossa <Link to="/privacidade">Política de Privacidade</Link>.
      </p>

      <h2>1. O que são cookies?</h2>
      <p>
        Cookies são pequenos ficheiros de texto que os sites colocam no seu
        dispositivo quando os visita. São amplamente utilizados para fazer com
        que os websites funcionem, ou funcionem de forma mais eficiente, bem
        como para fornecer informação aos proprietários do site.
      </p>

      <h2>2. Tipos de cookies que utilizamos</h2>
      <p>
        Utilizamos as categorias de cookies abaixo. A lista detalhada e
        atualizada — gerada automaticamente pelo nosso sistema de gestão de
        consentimento — está disponível no painel de preferências (botão no
        final desta página).
      </p>
      <ul>
        <li>
          <strong>Estritamente necessários</strong> — indispensáveis ao
          funcionamento do site (segurança, navegação básica). Não requerem
          consentimento.
        </li>
        <li>
          <strong>Funcionais</strong> — permitem recordar escolhas do
          utilizador (p. ex. idioma).
        </li>
        <li>
          <strong>Estatísticos / Analíticos</strong> — ajudam-nos a perceber
          como os visitantes interagem com o site, de forma agregada e anónima
          (p. ex. Google Analytics 4 com Consent Mode v2).
        </li>
        <li>
          <strong>Marketing</strong> — utilizados para apresentar anúncios
          relevantes e medir a eficácia de campanhas.
        </li>
      </ul>

      <h2>3. Google Consent Mode v2</h2>
      <p>
        Implementámos o <em>Google Consent Mode v2</em>. Isto significa que,
        por defeito, todos os sinais de consentimento (
        <code>ad_storage</code>, <code>ad_user_data</code>,{" "}
        <code>ad_personalization</code>, <code>analytics_storage</code>) estão{" "}
        <strong>negados</strong> até que dê o seu consentimento expresso no
        banner. Mesmo na ausência de consentimento, podem ser enviados sinais
        anonimizados (<em>pings</em>) à Google, sem identificadores pessoais.
      </p>

      <h2>4. Como gerir as suas preferências</h2>
      <p>
        Pode aceitar, recusar ou personalizar as suas preferências a qualquer
        momento. Para reabrir o painel de preferências, clique no botão abaixo:
      </p>
      <p>
        <button type="button" onClick={openPreferences} className="legal-button">
          Gerir preferências de cookies
        </button>
      </p>
      <p>
        Em alternativa, pode bloquear ou eliminar cookies através das
        definições do seu browser. Tenha em conta que a desativação de
        determinados cookies pode afetar o funcionamento do site.
      </p>

      <h2>5. Conservação</h2>
      <p>
        A duração de cada cookie varia consoante a sua finalidade. O detalhe é
        apresentado no painel de preferências.
      </p>

      <h2>6. Atualizações</h2>
      <p>
        Esta Política poderá ser revista. A data da última atualização consta
        no topo da página.
      </p>
    </LegalLayout>
  );
}
