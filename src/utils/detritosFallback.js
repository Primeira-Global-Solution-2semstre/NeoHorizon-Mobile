const updateLocalDetrito = (items, id, updates) => {
  return items.map((item) => (String(item.id) === String(id) ? { ...item, ...updates } : item));
};

const removeLocalDetrito = (items, id) => {
  return items.filter((item) => String(item.id) !== String(id));
};

module.exports = {
  updateLocalDetrito,
  removeLocalDetrito,
};
