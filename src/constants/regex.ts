const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const nameAdminInputs = /^(?!.*[<>{}[\]]).*[a-zA-Z].*/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
export { cpfRegex, emailRegex, nameAdminInputs, nameRegex };
