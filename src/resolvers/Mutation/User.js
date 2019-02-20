export const createUser = async (parent, args, { prisma }, info) => {
    console.log(args);
    const { email } = args.data;
    const emailTaken = await prisma.exists.User({ email })
    if (emailTaken) {
        throw new Error("E-mail already taken")
    }
    return prisma.mutation.createUser({ data: args.data }, info)
}

export const updateUser = async (parent, { id, data }, { prisma }, info) => {
    const userExists = await prisma.exists.User({ id })
    if (!userExists) {
        throw new Error("Could not find a user with the given ID")
    }
    return prisma.mutation.updateUser({
        data,
        where: {
            id
        }
    }, info)
    
}

export const deleteUser = async (parent, { id }, { prisma }, info) => {
    const userExists = await prisma.exists.User({ id })
    if (!userExists) {
        throw new Error("Cannot find an user with the given ID")
    }
    return prisma.mutation.deleteUser({
        where: {
            id
        }
    }, info)
}