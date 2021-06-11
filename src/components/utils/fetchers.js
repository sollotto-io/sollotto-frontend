export async function fetchWait(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

export async function fetchCallBack(url, func) {
  let response = await fetch(url);
  let data = await response.json();
  func(data);
}
