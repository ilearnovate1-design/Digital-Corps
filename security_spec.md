# Security Specification: Digital Corps Hub Firestore Rules

## 1. Data Invariants
- **Zero Public Reads**: Public visitors cannot query, list, or fetch any participant records or challenge submissions, protecting all PII and maintaining zero read quota usage.
- **Strict Public Creation Only**: Public users can only perform blind `create` operations on `/participants/{id}` and `/challengeSubmissions/{id}` with complete, rigorously validated schemas.
- **Zero Updates & Deletes**: Participants and submissions cannot be modified or deleted once submitted by client SDKs.
- **Server Timestamp Enforced**: `createdAt` must strictly match `request.time`.
- **Bounded String Limits**: Every string is length-bounded to prevent Denial of Wallet resource attacks.
- **Admin Access Isolation**: Only verified administrative users listed in `/adminUsers/{uid}` can read aggregate records.

## 2. The "Dirty Dozen" Threat Payloads
1. **Public Read Extraction**: `GET /participants/ANY_ID` without admin auth -> PERMISSION_DENIED.
2. **List Scraping**: `GET /participants` collection list -> PERMISSION_DENIED.
3. **Shadow Update Attack**: `UPDATE /participants/{id}` attempting to alter state code -> PERMISSION_DENIED.
4. **Malicious Deletion**: `DELETE /participants/{id}` by any participant -> PERMISSION_DENIED.
5. **Ghost Field Injection**: `CREATE /participants/{id}` with undeclared field `isAdmin: true` -> PERMISSION_DENIED.
6. **Timestamp Forgery**: `CREATE /participants/{id}` with client-supplied past or future `createdAt` -> PERMISSION_DENIED.
7. **Oversized String Bomb**: `CREATE /participants/{id}` with a 50KB `firstName` -> PERMISSION_DENIED.
8. **Invalid Platoon Value**: `CREATE /participants/{id}` with `platoon: 99` -> PERMISSION_DENIED.
9. **Missing Consent**: `CREATE /participants/{id}` missing `marketingConsent` or `communityOptIn` booleans -> PERMISSION_DENIED.
10. **Public Submission Scraping**: `GET /challengeSubmissions` -> PERMISSION_DENIED.
11. **Submission Update**: `UPDATE /challengeSubmissions/{id}` -> PERMISSION_DENIED.
12. **Admin Privilege Escalation**: `CREATE /adminUsers/{id}` by an unauthenticated or non-admin user -> PERMISSION_DENIED.
