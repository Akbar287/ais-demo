export function getRootElement(id = "root") {
  const root = document.getElementById(id);
  if (!root) throw new Error(`Root element #${id} was not found`);
  return root;
}
