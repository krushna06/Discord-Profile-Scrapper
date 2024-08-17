import { LanyardData } from "../types/Lanyard";

export async function getLanyardUser(id: string, rest = 'lanyard.rest') {
  const res: { data: LanyardData } = await fetch(`https://${rest}/v1/users/${id}`).then(r => r.json());
  return res.data;
}