type DetritoLike = {
  id: string | number;
};

export const updateLocalDetrito = <T extends DetritoLike>(items: T[], id: string | number, updates: Partial<T>): T[] => {
  return items.map((item) => (String(item.id) === String(id) ? { ...item, ...updates } : item));
};

export const removeLocalDetrito = <T extends DetritoLike>(items: T[], id: string | number): T[] => {
  return items.filter((item) => String(item.id) !== String(id));
};