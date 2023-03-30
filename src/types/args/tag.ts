interface CreateTagArgs {
  userId: number;
  tagName: string;
}

interface UpdateTagArgs extends CreateTagArgs {
  tagId: number;
}

interface DeleteTagArgs {
  userId: number;
  tagId: number;
}

export { CreateTagArgs, UpdateTagArgs, DeleteTagArgs };
