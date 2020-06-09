import Relatorio from '../../../components/Relatorio';

export function requestRelatorio(total, cart) {
  return {
    type: '@relatorio/REQUEST_RELATORIO',
    payload: {
      total,
      cart,
    },
  };
}

export function refreshRelatorio(page, date) {
  return {
    type: '@report/REFRESH_REPORT',
    payload: {
      page,
      date,
    },
  };
}

export function setReport(page, products) {
  return {
    type: '@report/SET_REPORT',
    payload: {
      page,
      products,
    },
  };
}

export function reportDay(today) {
  return {
    type: '@report/REPORT_DAY',
    payload: {
      today,
    },
  };
}

export function ordersToday(page, date) {
  return {
    type: '@report/ORDERS_TODAY',
    payload: {
      page,
      date,
    },
  };
}

export function savedNumber(VenNro, showNumber, active) {
  return {
    type: '@report/REPORT_NR',
    payload: {
      VenNro,
      showNumber,
      active,
    },
  };
}

export function addPage(page, onDate) {
  return {
    type: '@report/ADD_PAGE',
    payload: {
      page,
      onDate,
    },
  };
}

export function definePage(relatorio) {
  return {
    type: '@report/DEFINE_PAGE',
    payload: {relatorio},
  };
}
