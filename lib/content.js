// Conteúdo compartilhado entre LPs (testimonials + FAQs + info da loja).
// Templates são parametrizados por CFG (fabricante + modelo).
// Pra customizar por LP, sobrescrever via CFG.content.testimonials ou CFG.content.faqs no config.json.
//
// Uso:
//   import CFG from '../config.json';
//   import { getContent, STORE_INFO } from '@/lib/content';
//   const { TESTIMONIALS, FAQS } = getContent(CFG);

// Info global da Armazém Auto Peças (não muda por LP).
// Atualizar quando a nota/contagem do Google subir.
export const STORE_INFO = {
  google_rating: 4.6,
  google_rating_label: '4,6',           // exibição (vírgula em pt-BR)
  google_count: 108,                    // contagem real (pra JSON-LD aggregateRating)
  google_count_label: '100+ avaliações', // exibição (válido por meses)
};

// Reviews reais do Google Business da Armazém (universais).
// Usados em JSON-LD schema.org Review da loja (AutoPartsStore).
// Atualizar periodicamente via web/Apify/manual.
export const STORE_REVIEWS_JSONLD = [
  {
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Marcos Henrique' },
    datePublished: '2026-01-28',
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    reviewBody: 'Sou do ES, empresa séria e com compromisso com o cliente. Comprei 4 bicos injetores da Triton 2.4 diesel 2020 para um cliente meu. Chegou todos novos e lacrados. Excelente atendimento.',
  },
  {
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Lucio Oliveira' },
    datePublished: '2026-03-28',
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    reviewBody: 'Comprei na quinta-feira e chegou ontem. Paguei 90 reais a mais pra vir pela Azul. Compensou demais e chegou muito antes do previsto. Já estou com o carro, e olha que estou em Goiânia.',
  },
  {
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Ellen Karoline' },
    datePublished: '2026-02-28',
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    reviewBody: 'Podem confiar sem medo. Peças do motor do meu carro chegou certinho no prazo combinado, atendentes atenciosos. Foi o único lugar que encontrei a peça original que eu precisava. Recomendo!',
  },
];

function modelLabel(modelAlias) {
  // siglas curtas mantém UPPER (HR, S10), nomes >3 chars Title Case (Amarok, Hilux)
  const m = modelAlias || '';
  return m.length <= 3 ? m : m.charAt(0) + m.slice(1).toLowerCase();
}

// Reviews reais do Google Business da Armazém — defaults universais.
// Servem pra qualquer LP de bico injetor diesel. Override por LP via cfg.content.testimonials.
const TESTIMONIALS_DEFAULT = [
  {
    q: 'Sou do ES, empresa séria e com compromisso com o cliente. Comprei 4 bicos injetores da Triton 2.4 diesel 2020 para um cliente meu. Chegou todos novos e lacrados. Excelente atendimento.',
    name: 'Marcos Henrique',
    role: 'Espírito Santo · Avaliação no Google',
  },
  {
    q: 'Comprei na quinta-feira e chegou ontem. Paguei 90 reais a mais pra vir pela Azul, compensou demais e chegou muito antes do previsto. Já estou com o carro, e olha que estou em Goiânia.',
    name: 'Lucio Oliveira',
    role: 'Goiânia/GO · Avaliação no Google',
  },
  {
    q: 'Podem confiar sem medo. Peças do motor do meu carro chegou certinho no prazo combinado, atendentes atenciosos. Foi o único lugar que encontrei a peça original que eu precisava. Recomendo!',
    name: 'Ellen Karoline',
    role: 'Avaliação no Google',
  },
];

function faqsTemplate(F, V) {
  return [
    {
      q: 'Como sei que o bico é o certo pro meu carro?',
      a: 'Inserindo a placa ou chassi, nosso sistema identifica seu veículo via consulta FIPE/Denatran e mostra só o bico compatível com seu motor e ano. Se tiver dúvida, o vendedor confere o código antes do envio.',
    },
    {
      q: `Qual a diferença entre OEM ${F} e primeira linha?`,
      a: `OEM ${F} é a peça original do fabricante — a mesma marca montada na sua ${V} de fábrica. Primeira linha é de outro fornecedor homologado, com qualidade equivalente e garantia, preço mais acessível. Mostramos as duas opções quando disponíveis pra você escolher.`,
    },
    {
      q: 'E se a peça não servir no meu carro?',
      a: 'Se o sistema identificou pela placa e a peça não servir, a gente resolve: troca sem custo pra você ou reembolso integral. É pra isso que cruzamos os dados com FIPE/Denatran antes de liberar o pedido.',
    },
    {
      q: 'Prazo de entrega e garantia?',
      a: `Despacho no mesmo dia útil da confirmação do pagamento, entrega rastreada pra todo Brasil de Chapecó/SC. Garantia de fábrica ${F} mais garantia de loja da Armazém Auto Peças.`,
    },
    {
      q: 'Formas de pagamento, nota fiscal e troca?',
      a: 'PIX, boleto e cartão em até 10x; toda compra sai com nota fiscal eletrônica (pessoa física ou CNPJ). Troca/devolução em até 7 dias (CDC) + garantia de defeito. Oficinas/frotistas têm condição de revenda — chame no WhatsApp.',
    },
  ];
}

export function getContent(cfg) {
  const F = cfg.peca.fabricante_principal_short;
  const V = modelLabel(cfg.veiculo.modelo_aliases[0]);

  return {
    TESTIMONIALS: cfg.content?.testimonials || TESTIMONIALS_DEFAULT,
    FAQS: cfg.content?.faqs || faqsTemplate(F, V),
  };
}
