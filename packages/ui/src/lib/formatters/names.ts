/**
 * Returns the initials of a name
 * @param name The name to get the initials of
 * @returns The initials of the name
 */
export function toInitials(name: string | undefined | null) {
  if (!name || name.length === 0) return "--";

  const nameArr = name.split(" ");
  if (nameArr.length === 1) return name.substring(0, 2).toUpperCase();

  const [first, last] = nameArr;
  return `${first[0]}${last[0]}`.toUpperCase();
}

/**
 * Returns the name from an email address
 * @param email The email address to get the name from
 * @returns The name from the email address
 */
export function getNameFromEmail(email: string): string {
  const emailUser = email.split("@")[0];

  let splitName = emailUser.split(/[#$%&'*+-/?^_`{|}~]/);
  splitName = splitName
    .filter((name) => 0 < name.length)
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1));
  if (splitName.length === 0) return emailUser;

  return splitName.join(" ");
}
