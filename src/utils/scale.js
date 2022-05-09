export default function scale(val, f0, f1, t0, t1) {
  return ((val - f0) * (t1 - t0)) / (f1 - f0) + t0;
}
