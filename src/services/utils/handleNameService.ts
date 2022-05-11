class HandleNameService {
  static execute(name: string) {
    const regex = /-/g
    const newName = name.replace(regex, ' ')

    return newName
  }
}

export { HandleNameService }
