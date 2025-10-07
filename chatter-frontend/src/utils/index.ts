export const formatCompactNumber = (number: number) => {
  if (typeof number !== "number") return number; // Retorna o original se não for número

  return new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    compactDisplay: "short",
    // define o número de casas decimais
    maximumFractionDigits: 1,
  }).format(number);
};
