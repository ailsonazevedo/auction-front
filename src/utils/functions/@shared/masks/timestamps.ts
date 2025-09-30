import moment from "moment";

function formatData(timestamp: string | undefined): string {
  if (timestamp) {
    const date = moment(timestamp).format("DD/MM/YYYY");
    return date;
  } else {
    return "";
  }
}

function formatHour(timestamp: string | undefined): string {
  if (timestamp) {
    const hour = moment(timestamp).format("HH:mm");
    return hour;
  } else {
    return "";
  }
}

function formatDataHora(timestamp: string | undefined): string {
  if (timestamp) {
    const date = moment(timestamp).format("DD/MM/YYYY");
    const hour = moment(timestamp).format("HH:mm");
    return `${date} - ${hour}`;
  } else {
    return "";
  }
}
function formatDataMes(timestamp: string | undefined): string {
  if (timestamp) {
    const date = moment(timestamp).format("DD/MM");
    return `${date} `;
  } else {
    return "";
  }
}

export const timestamps = {
  formatData,
  formatDataHora,
  formatDataMes,
  formatHour,
};
