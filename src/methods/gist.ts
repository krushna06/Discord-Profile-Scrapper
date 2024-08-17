import { CraftedResponse, ParsedRequest } from "../types/Routes";

export function ReadmeGist(request: ParsedRequest, response: CraftedResponse) {
  return response.redirect('https://gist.github.com/dustinrouillard/04be36180ed80db144a4857408478854');
}
