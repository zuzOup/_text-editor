export function modifier_text(data, value) {
  const obj = { ...data };
  obj.text = value;
  return obj;
}
