Authentication method:

Token (JWT)

What is protected:
/api/flights/search (Visually and functionally)

Only logged-in users can search flights. To test, when initially entering site, navigate to flight page and try to search flights. An error message should appear. Afterwards, go back and login, then try to search flights again. Flights should be returned.

Role Model:
Admin:
Admin can do everything users can and also add/update/delete attributes, destinations.

User:
Users can only search destinations, log in/out, search flights, and retrieve old searches.

Security Assumptions and Limitations:

- No MFA, if a password is stolen, there is no way to protect against malicious entry.
- No Token Revocation: Once a JWT is issued, it is valid until it expires. There is currently no "blacklist" to force a logout if a token is stolen.
