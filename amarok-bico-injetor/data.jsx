// data.jsx — mock vehicle database + content

const PRESET_VEHICLES = {
  "ABC1234": {
    plate: "ABC-1234",
    chassi_tail: "297233",
    marca: "VOLKSWAGEN",
    modelo: "AMAROK HIGHLINE",
    motor: "2.0 TDI Diesel",
    ano: 2013,
    cv: 163,
    part: {
      name: "BICO INJETOR BOSCH",
      oem: "0 445 110 369",
      brand: "OEM BOSCH",
      brandClass: "",
      bullets: [
        "Peça original de fábrica",
        "Garantia Bosch",
        "Pronta entrega de Chapecó/SC",
      ],
      hasLine1a: true,
    },
  },
  "DEF5678": {
    plate: "DEF-5678",
    chassi_tail: "418902",
    marca: "VOLKSWAGEN",
    modelo: "AMAROK EXTREME",
    motor: "2.0 TDI Biturbo",
    ano: 2016,
    cv: 180,
    part: {
      name: "BICO INJETOR BOSCH",
      oem: "0 445 110 369",
      brand: "OEM BOSCH",
      brandClass: "",
      bullets: [
        "Peça original de fábrica",
        "Garantia Bosch",
        "Compatível com Biturbo 180cv",
      ],
      hasLine1a: true,
    },
  },
  "GHI9012": {
    plate: "GHI-9012",
    chassi_tail: "551177",
    marca: "VOLKSWAGEN",
    modelo: "AMAROK V6 HIGHLINE",
    motor: "3.0 V6 TDI",
    ano: 2020,
    cv: 258,
    part: {
      name: "BICO INJETOR BOSCH",
      oem: "0 445 117 021",
      brand: "OEM BOSCH",
      brandClass: "",
      bullets: [
        "Peça original motor V6",
        "Garantia Bosch",
        "Disponibilidade limitada — consulte estoque",
      ],
      hasLine1a: false,
    },
  },
};

// fallback for unknown valid-looking plates
const FALLBACK_VEHICLE = PRESET_VEHICLES.ABC1234;

const YEAR_VARIANTS = {
  2010: [{ motor: "2.0 TDI", cv: "140cv", oem: "0 445 110 XXX" }],
  2011: [{ motor: "2.0 TDI", cv: "140cv", oem: "0 445 110 XXX" }],
  2012: [
    { motor: "2.0 TDI Biturbo", cv: "163cv", oem: "0 445 110 369" },
    { motor: "2.0 TDI", cv: "140cv", oem: "0 445 110 XXX" },
  ],
  2013: [
    { motor: "2.0 TDI Biturbo", cv: "180cv", oem: "0 445 110 369" },
    { motor: "2.0 TDI", cv: "140cv / 163cv", oem: "0 445 110 XXX" },
  ],
  2014: [
    { motor: "2.0 TDI Biturbo", cv: "180cv", oem: "0 445 110 369" },
    { motor: "2.0 TDI", cv: "140cv / 163cv", oem: "0 445 110 XXX" },
  ],
  2015: [
    { motor: "2.0 TDI Biturbo", cv: "180cv", oem: "0 445 110 369" },
    { motor: "2.0 TDI", cv: "140cv / 163cv", oem: "0 445 110 XXX" },
  ],
  2016: [
    { motor: "2.0 TDI Biturbo", cv: "180cv", oem: "0 445 110 369" },
    { motor: "2.0 TDI", cv: "140cv / 163cv", oem: "0 445 110 XXX" },
  ],
  2017: [
    { motor: "3.0 V6 TDI", cv: "224cv", oem: "0 445 117 021" },
    { motor: "2.0 TDI Biturbo", cv: "180cv", oem: "0 445 110 369" },
  ],
  2018: [
    { motor: "3.0 V6 TDI", cv: "224cv", oem: "0 445 117 021" },
    { motor: "2.0 TDI Biturbo", cv: "180cv", oem: "0 445 110 369" },
  ],
  2019: [
    { motor: "3.0 V6 TDI", cv: "224cv", oem: "0 445 117 021" },
    { motor: "2.0 TDI Biturbo", cv: "180cv", oem: "0 445 110 369" },
  ],
  2020: [
    { motor: "3.0 V6 TDI", cv: "258cv", oem: "0 445 117 021" },
    { motor: "2.0 TDI Biturbo", cv: "180cv", oem: "0 445 110 369" },
  ],
  2021: [{ motor: "3.0 V6 TDI", cv: "258cv", oem: "0 445 117 021" }],
  2022: [{ motor: "3.0 V6 TDI", cv: "258cv", oem: "0 445 117 021" }],
  2023: [{ motor: "3.0 V6 TDI", cv: "258cv", oem: "0 445 117 021" }],
  2024: [{ motor: "3.0 V6 TDI", cv: "258cv", oem: "0 445 117 021" }],
};

const TESTIMONIALS = [
  {
    q: "Amarok 2013 parada há uma semana. Inseri a placa, o sistema achou o bico certo e chegou em 3 dias. Tranquilo.",
    name: "Carlos M.",
    role: "Produtor rural, MT",
  },
  {
    q: "Trabalho com oficina e o pior é errar a peça. Aqui eu tenho certeza que é o código certo, direto da Bosch.",
    name: "Ricardo T.",
    role: "Mecânico, SP",
  },
  {
    q: "Bico V6 original é difícil de achar. Aqui achei, pago no boleto e chegou bem embalado. Recomendo.",
    name: "André L.",
    role: "Frotista, PR",
  },
];

const FAQS = [
  {
    q: "Como sei que o bico é o certo pro meu carro?",
    a: "Inserindo a placa ou chassi, nosso sistema identifica seu veículo via consulta FIPE/Denatran e mostra só o bico compatível com seu motor e ano. Se tiver dúvida, o vendedor confere o código antes do envio.",
  },
  {
    q: "Qual a diferença entre OEM Bosch e primeira linha?",
    a: "OEM Bosch é a peça original do fabricante — a mesma marca montada na sua Amarok de fábrica. Primeira linha é de outro fornecedor homologado, com qualidade equivalente e garantia, preço mais acessível. Mostramos as duas opções quando disponíveis pra você escolher.",
  },
  {
    q: "Em quanto tempo chega?",
    a: "Despacho no mesmo dia útil da confirmação do pagamento. Prazo de entrega varia por região — o vendedor informa o prazo exato no orçamento via WhatsApp.",
  },
  {
    q: "Tem garantia?",
    a: "Sim. Garantia de fábrica Bosch conforme fabricante, mais garantia de loja da Armazém Auto Peças.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "PIX, boleto e cartão de crédito em até 10x. Para frotistas e oficinas, temos condições especiais — fale com o vendedor no WhatsApp.",
  },
  {
    q: "Vocês emitem nota fiscal?",
    a: "Sim, toda compra sai com nota fiscal eletrônica. Se precisar de nota em CNPJ da empresa/oficina, é só informar no orçamento.",
  },
  {
    q: "E se a peça não servir no meu carro?",
    a: "Se o sistema identificou pela placa e a peça não servir, a gente resolve: troca sem custo pra você ou reembolso integral. É pra isso que cruzamos os dados com FIPE/Denatran antes de liberar o pedido.",
  },
  {
    q: "Como faço troca ou devolução?",
    a: "Você tem 7 dias para desistência (CDC) e garantia do fabricante em caso de defeito. Embalagem original preservada facilita a troca. O vendedor orienta o passo a passo pelo WhatsApp.",
  },
  {
    q: "Vocês entregam para todo o Brasil?",
    a: "Sim. Despachamos de Chapecó/SC para todo o território nacional via transportadora ou Correios, dependendo da região e urgência. Rastreio é enviado por WhatsApp.",
  },
  {
    q: "Tenho uma oficina — vocês têm condição para revenda?",
    a: "Sim. Para mecânicos, oficinas e frotistas, oferecemos preço diferenciado, prazo estendido e atendimento prioritário. Chame no WhatsApp e peça condição de revenda.",
  },
];

const WA_NUMBER = "554998829474"; // per brief: (49) 98829-4743 -> wa.me strips formatting
const WA_NUMBER_DISPLAY = "(49) 98829-4743";

function waLink(msg) {
  const text = encodeURIComponent(msg);
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

Object.assign(window, {
  PRESET_VEHICLES, FALLBACK_VEHICLE, YEAR_VARIANTS, TESTIMONIALS, FAQS,
  WA_NUMBER, WA_NUMBER_DISPLAY, waLink,
});
