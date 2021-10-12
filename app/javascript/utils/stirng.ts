export const displayTitle = (title: string | undefined) => {
  return title !== undefined && title !== '' ? title : 'No title'
}
