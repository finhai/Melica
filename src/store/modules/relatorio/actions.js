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

export function savedNumber(VenNro, active) {
  return {
    type: '@report/REPORT_NR',
    payload: {
      VenNro,
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

export function showAction(showNumber) {
  return {
    type: '@report/SHOW_ACTION',
    payload: {showNumber},
  };
}

export function blankVars(blankVenNro, blankChange) {
  return {
    type: '@report/BLANK_VARS',
    payload: {
      blankVenNro,
      blankChange,
    },
  };
}

export function cartFull(total, cart, changePage) {
  return {
    type: '@relatorio/CART_FULL',
    payload: {
      total,
      cart,
      changePage,
    },
  };
}

export function allowPage(changePage) {
  return {
    type: '@relatorio/ALLOW_PAGE',
    payload: {changePage},
  };
}

export function failLoad(errorTrue) {
  return {
    type: '@relatorio/FAIL_LOAD',
    payload: {errorTrue},
  };
}

export function resetReport(relatorio, totalPages) {
  return {
    type: '@relatorio/RESET_REPORT',
    payload: {relatorio, totalPages},
  };
}
