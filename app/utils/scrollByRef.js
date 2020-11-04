export default function(ref, params) {
  if (ref.current) ref.current.scrollIntoView({ ...params });
}
