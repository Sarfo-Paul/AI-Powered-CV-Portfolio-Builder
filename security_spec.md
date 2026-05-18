# EliteCV Security Specification

## Data Invariants
1. A user profile can only be created/modified by the authenticated user with the matching UID.
2. A resume can only be created/modified/deleted by its owner.
3. Resume document IDs must be valid strings.
4. All timestamps (createdAt, updatedAt) must be server-validated.

## The Dirty Dozen Payloads (Rejection Targets)
1. Creating a UserProfile for someone else's UID.
2. Updating someone else's bio.
3. Creating a Resume with a different userId than the authenticated user.
4. Updating a Resume's ownerId (if we had one) to a different UID.
5. Deleting someone else's Resume.
6. Injecting a 2MB string into a resume summary.
7. Manually setting a future `createdAt` timestamp.
8. Updating a Resume and changing the `createdAt` timestamp.
9. Reading a Resume collection without being signed in.
10. Querying all resumes across the entire database without a userId filter.
11. Bypassing size limits on experience achievements.
12. Creating a resume with an invalid template ID.

## Test Runner (Logic Overview)
The `firestore.rules` will enforce that:
- `request.auth.uid == userId` for all paths under `/users/{userId}`.
- `isValidUserProfile` and `isValidResume` helpers check data types and sizes.
- `affectedKeys().hasOnly()` is used for fine-grained updates.
