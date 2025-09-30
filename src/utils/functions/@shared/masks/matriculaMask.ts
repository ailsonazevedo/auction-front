const matriculaMask = (value: string) => {
  let valor = value.replace(/[^a-zA-Z0-9]/g, ""); // Remove caracteres inválidos

  if (valor.length > 6) {
    let sextoDigitos = valor.slice(0, 6).replace(/[^0-9]/g, ""); // Apenas números nos primeiros 6 dígitos
    let setimoDigito = valor.slice(6, 7);

    // Verifica se o sétimo dígito é uma letra ou número
    if (!/^[a-zA-Z0-9]$/.test(setimoDigito)) {
      setimoDigito = ""; // Remove o sétimo dígito se não for válido
    }

    valor = sextoDigitos + (setimoDigito ? "-" + setimoDigito : "");
  } else {
    valor = valor.replace(/[^0-9]/g, ""); // Apenas números nos primeiros 6 dígitos
  }

  return valor;
};

export { matriculaMask };
