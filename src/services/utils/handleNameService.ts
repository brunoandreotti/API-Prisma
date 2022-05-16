class HandleNameService {
  static execute(name: string) {
    const regex = /-/g
    const nameWithoutHyphen = name.replace(regex, ' ')

    return nameWithoutHyphen
  }
}

export { HandleNameService }
