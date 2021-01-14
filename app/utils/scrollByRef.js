export default function scrollByRef(ref, params) {
  if (ref.current) ref.current.scrollIntoView({ ...params });
}
