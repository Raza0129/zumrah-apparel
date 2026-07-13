export const PAKISTAN_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Gujranwala",
  "Peshawar",
  "Quetta",
  "Hyderabad",
  "Sialkot",
  "Bahawalpur",
  "Sargodha",
  "Sukkur",
  "Larkana",
  "Sheikhupura",
  "Rahim Yar Khan",
  "Jhang",
  "Dera Ghazi Khan",
  "Gujrat",
  "Abbottabad",
  "Mardan",
  "Kasur",
  "Okara",
  "Chiniot",
  "Nawabshah",
  "Mingora",
  "Mirpur Khas",
  "Sahiwal",
  "Muzaffarabad",
];

export function getShippingCost(city: string): number {
  return city === "Karachi" ? 300 : 450;
}

export function formatPKR(amount: number): string {
  return `₨ ${amount.toLocaleString("en-PK")}`;
}
