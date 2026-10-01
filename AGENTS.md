
- Messe page (src/pages/Messe.tsx) renders standalone when hostname starts with "messe." or path starts with /messe; leads go through notify-inquiry with source="messe" + campaign — reuses the existing inquiry system instead of a second backend.
