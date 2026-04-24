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
    q: "E se a peça não servir no meu carro?",
    a: "Se o sistema identificou pela placa e a peça não servir, a gente resolve: troca sem custo pra você ou reembolso integral. É pra isso que cruzamos os dados com FIPE/Denatran antes de liberar o pedido.",
  },
  {
    q: "Prazo de entrega e garantia?",
    a: "Despacho no mesmo dia útil da confirmação do pagamento, entrega rastreada pra todo Brasil de Chapecó/SC. Garantia de fábrica Bosch mais garantia de loja da Armazém Auto Peças.",
  },
  {
    q: "Formas de pagamento, nota fiscal e troca?",
    a: "PIX, boleto e cartão em até 10x; toda compra sai com nota fiscal eletrônica (pessoa física ou CNPJ). Troca/devolução em até 7 dias (CDC) + garantia de defeito. Oficinas/frotistas têm condição de revenda — chame no WhatsApp.",
  },
];

const WA_NUMBER = "5549999484754"; // WhatsApp oficial Armazém Auto Peças
const WA_NUMBER_DISPLAY = "(49) 99948-4754";

function waLink(msg) {
  const text = encodeURIComponent(msg);
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

Object.assign(window, {
  PRESET_VEHICLES, FALLBACK_VEHICLE, YEAR_VARIANTS, TESTIMONIALS, FAQS,
  WA_NUMBER, WA_NUMBER_DISPLAY, waLink,
});
