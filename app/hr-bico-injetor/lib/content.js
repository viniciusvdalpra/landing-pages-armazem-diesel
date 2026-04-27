import CFG from '../config.json';

// Helpers pra parametrizar templates por LP
const F = CFG.peca.fabricante_principal_short;  // "Bosch", "Delphi", etc
const V = (() => {
  const m = CFG.veiculo.modelo_aliases[0] || '';
  // siglas curtas mantém UPPER (HR, S10), nomes >2 chars Title Case (Amarok, Hilux)
  return m.length <= 3 ? m : m.charAt(0) + m.slice(1).toLowerCase();
})();

// Testimonials: genéricos pra reuso entre LPs.
// Pra customizar por LP, sobrescrever via CFG.content.testimonials no config.json.
const TESTIMONIALS_DEFAULT = [
  {
    q: 'Carro parado há uma semana. Inseri a placa, o sistema achou o bico certo e chegou em 3 dias. Tranquilo.',
    name: 'Carlos M.',
    role: 'Produtor rural, MT',
  },
  {
    q: 'Trabalho com oficina e o pior é errar a peça. Aqui eu tenho certeza que é o código certo.',
    name: 'Ricardo T.',
    role: 'Mecânico, SP',
  },
  {
    q: 'Bico original é difícil de achar. Aqui achei, pago no boleto e chegou bem embalado. Recomendo.',
    name: 'André L.',
    role: 'Frotista, PR',
  },
];

// FAQs: templates com placeholders preenchidos via CFG.peca.fabricante_principal_short e CFG.veiculo.modelo_aliases[0].
// Pra customizar por LP, sobrescrever via CFG.content.faqs no config.json.
const FAQS_DEFAULT = [
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

export const TESTIMONIALS = CFG.content?.testimonials || TESTIMONIALS_DEFAULT;
export const FAQS = CFG.content?.faqs || FAQS_DEFAULT;
