export async function deleteNote(token: string, noteId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notes/${noteId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );

  if (response.ok) {
    return;
  } else {
    throw new Error("Failed to delete note");
  }
}
