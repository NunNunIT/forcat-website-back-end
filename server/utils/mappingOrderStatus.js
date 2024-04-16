export default function mappingOrderStatus(status_before, status_after) {
  const mapping = {
    "unpaid": ["delivering", "cancel"],
    "delivering": ["finished"],
    "finished": ["cancel"],
    "cancel": [],
  }

  return mapping[status_before].includes(status_after) ?? 0;
}