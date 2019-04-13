/** Take a Promise 'reason' and return a string  */
export const formatReason = (error: Error | string) =>
  typeof error === "string" ? error : `${error.name}:${error.message}`;

/*Return an array with no duplicates*/
export const uniq = (arr: any[], uq: any[] = [], i = 0): any[] =>
  i >= arr.length
    ? uq
    : uq.indexOf(arr[i]) === -1
    ? uniq(arr, uq.concat([arr[i]]), i + 1)
    : uniq(arr, uq, i + 1);

/** Reduce a country string from the verbose 'Developed in Ukraine (with stock from Asia)' to just 'Ukraine' */
export const normalizeCountry = (country: string) => {
  // remove these phrases from the beginning of the string, in order:
  const startCountry = ["Developed in ", "the "].reduce(
    (acc, remStart) =>
      acc.startsWith(remStart) ? acc.substr(remStart.length) : acc,
    country
  );

  // and remove these phrases from from the end, in order:
  const endCountry = [" (", "; ", ",", " and"].reduce(
    (acc, endRem) =>
      acc.indexOf(endRem) >= 0 ? acc.substr(0, acc.indexOf(endRem)) : acc,
    startCountry
  );

  return endCountry;
};

/** Fetch with timeout */
export const XFetch = (input:RequestInfo, init?:XRequestInit ):Promise<Response> => {
  const DEFAULT_TIMEOUT = 5000
  const timeout = !!init && !!init.timeout? init.timeout : DEFAULT_TIMEOUT
  if (!!init && init.signal) throw new Error("Add 'controller' instead of 'signal' to init in XFetch.");
  const controller = !!init && !!init.controller? init.controller : new AbortController()
  const { signal } = controller;

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Server request timed out after ${timeout/1000} seconds`));
      controller.abort();
    }, timeout);

    fetch(input, { signal, ...init })
      .finally(() => clearTimeout(timer))
      .then(resolve, reject);
  });
};

export interface XRequestInit extends RequestInit {
  timeout?:number,
  controller?:AbortController
}

