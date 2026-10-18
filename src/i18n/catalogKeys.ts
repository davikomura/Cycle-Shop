// Catalog identifiers remain independent of the translated display labels.
const categoryKeys: Record<string, string> = {
  "E-Bike": "catalog:categories.electric.name",
  "Mountain Bike": "catalog:categories.mountain.name",
  "Road Bike": "catalog:categories.road.name",
  Trekking: "catalog:categories.trekking.name",
  Kids: "catalog:categories.kids.name",
  Tires: "catalog:categories.tires.name",
  Clothing: "catalog:categories.clothing.name",
  Accessories: "catalog:categories.accessories.name",
};
export const categoryNameKey = (category: string) =>
  categoryKeys[category] ?? "catalog:category";
