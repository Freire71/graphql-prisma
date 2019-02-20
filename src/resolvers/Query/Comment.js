const  comments = async (parent, args, { prisma }, info) => {
    const opArgs = {}
    if (args.query) {
      opArgs.where = {
          text_contains: args.query
      }
    }
    return prisma.query.comments(opArgs, info);
}

export default {
  comments
}