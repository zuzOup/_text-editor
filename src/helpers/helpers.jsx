export function wait(t) {
  new Promise((resolve) => setTimeout(resolve, t));
}
