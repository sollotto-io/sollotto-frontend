export async function fetchWait(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchCallBack(url, func) {
  const response = await fetch(url);
  const data = await response.json();
  func(data);
}
