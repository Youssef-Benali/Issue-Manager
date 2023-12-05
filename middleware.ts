export { default } from "next-auth/middleware";

export const config = {
  // Modifiers ;
  // * zero or more parameters
  // +: one or more parameters
  // ?: zero or one
  matcher: ["/issues/new", "/issues/edit/:id+"],
};
