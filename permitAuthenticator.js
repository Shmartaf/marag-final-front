

const roleAssignment = await permit.api.users.assignRole({
    user: "John@Doe.com",
    role: "admin",
    tenant: "default",
});