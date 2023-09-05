export const checkFile = (file: unknown) => {
  if (file !== undefined) {
    return File
  } else return { error: 'file is undefined.' }
}
