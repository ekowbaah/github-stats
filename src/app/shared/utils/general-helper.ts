export class GeneralHelpers {
  // check if value is empty
  static isEmpty = (obj: any) =>
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length;
}
