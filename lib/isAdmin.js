export function isAdmin(email) {
  const admins = process.env.ADMIN_EMAILS?.split(",") || [];
  return admins.includes(email);
}
