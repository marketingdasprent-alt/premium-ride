import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Premium Ride" },
      {
        name: "description",
        content:
          "Política de Privacidade da Premium Ride. Saiba como tratamos os seus dados pessoais nos termos do RGPD.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: PrivacidadePage,
});

const LAST_UPDATE = "19 de maio de 2026";

function PrivacidadePage() {
  return (
    <LegalLayout title="Política de Privacidade" updatedAt={LAST_UPDATE}>
      <p>
        A presente Política de Privacidade descreve a forma como a{" "}
        <strong>Premium Ride</strong> (adiante, "Premium Ride", "nós") recolhe,
        utiliza e protege os dados pessoais dos utilizadores que visitam este
        website ou que entram em contacto connosco para reservar serviços de
        transporte.
      </p>

      <h2>1. Responsável pelo tratamento</h2>
      <p>
        O responsável pelo tratamento dos seus dados pessoais é a Premium Ride,
        com sede em Lisboa, Portugal. Para qualquer questão relativa à
        privacidade, pode contactar-nos através do número{" "}
        <a href="tel:+351910131072">+351 910 131 072</a> (chamada para a rede
        móvel nacional).
      </p>

      <h2>2. Dados pessoais recolhidos</h2>
      <p>
        No âmbito da prestação dos nossos serviços e da utilização deste
        website, podemos recolher as seguintes categorias de dados:
      </p>
      <ul>
        <li>
          <strong>Dados de identificação e contacto:</strong> nome, número de
          telefone, endereço de e-mail.
        </li>
        <li>
          <strong>Dados de reserva:</strong> locais de recolha e destino,
          data, hora, número de passageiros, observações fornecidas
          voluntariamente pelo cliente.
        </li>
        <li>
          <strong>Dados de navegação:</strong> endereço IP, tipo de dispositivo,
          browser, sistema operativo, páginas visitadas e tempo de permanência,
          quando aplicável e mediante consentimento (ver{" "}
          <Link to="/cookies">Política de Cookies</Link>).
        </li>
      </ul>

      <h2>3. Finalidades e fundamentos de licitude</h2>
      <p>Os seus dados são tratados para as seguintes finalidades:</p>
      <ul>
        <li>
          <strong>Gestão de reservas e prestação do serviço de transporte</strong>{" "}
          — execução do contrato (art.º 6.º, n.º 1, al. b) do RGPD).
        </li>
        <li>
          <strong>Resposta a pedidos de informação</strong> — diligências
          pré-contratuais a pedido do titular.
        </li>
        <li>
          <strong>Cumprimento de obrigações legais</strong> (fiscais,
          contabilísticas) — al. c) do RGPD.
        </li>
        <li>
          <strong>Melhoria do website e estatísticas anónimas</strong> —
          consentimento do titular, retirável a qualquer momento.
        </li>
      </ul>

      <h2>4. Prazo de conservação</h2>
      <p>
        Os dados são conservados apenas pelo período necessário às finalidades
        para as quais foram recolhidos, ou pelo período exigido por lei
        (designadamente 10 anos para efeitos fiscais, nos termos da legislação
        portuguesa aplicável).
      </p>

      <h2>5. Partilha com terceiros</h2>
      <p>
        Não vendemos nem cedemos os seus dados a terceiros. Poderemos partilhar
        dados estritamente necessários com prestadores de serviços que atuam
        como subcontratantes (p. ex., alojamento web, faturação) ou com
        autoridades públicas quando exigido por lei.
      </p>

      <h2>6. Transferências internacionais</h2>
      <p>
        Caso recorramos a fornecedores fora do Espaço Económico Europeu (por
        exemplo, serviços de analítica ou hosting), garantimos a existência de
        salvaguardas adequadas, nomeadamente cláusulas contratuais-tipo
        aprovadas pela Comissão Europeia.
      </p>

      <h2>7. Direitos do titular dos dados</h2>
      <p>
        Nos termos do RGPD, tem o direito de aceder, retificar, apagar, limitar
        ou opor-se ao tratamento dos seus dados, bem como o direito à
        portabilidade. Pode ainda apresentar reclamação junto da{" "}
        <a
          href="https://www.cnpd.pt"
          target="_blank"
          rel="noopener noreferrer"
        >
          Comissão Nacional de Proteção de Dados (CNPD)
        </a>
        .
      </p>
      <p>
        Para exercer os seus direitos, contacte-nos pelos meios indicados no
        ponto 1.
      </p>

      <h2>8. Segurança</h2>
      <p>
        Adotamos medidas técnicas e organizativas adequadas para proteger os
        seus dados contra acesso não autorizado, perda ou destruição.
      </p>

      <h2>9. Alterações a esta política</h2>
      <p>
        Reservamo-nos o direito de atualizar esta Política de Privacidade. A
        data da última atualização encontra-se indicada no topo desta página.
      </p>
    </LegalLayout>
  );
}
