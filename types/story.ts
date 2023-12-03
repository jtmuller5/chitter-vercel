type Story = {
    id: string; // Unique identifier for the story
    title: string; // Title of the story
    content: string; // The main content of the story
    authorId: string | null; // ID of the author, if applicable (can be null for anonymous stories)
    createdAt: Date; // Timestamp for when the story was created
    updatedAt: Date; // Timestamp for when the story was last updated
    isPublic: boolean; // Flag to determine if the story is public or private
    // Add additional fields as necessary, such as category, tags, etc.
  };
  