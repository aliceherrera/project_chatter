import { backendLookup } from "../BackendLookup";
import type { User } from "../BackendLookup";

export type FollowAction = "follow" | "unfollow";

const apiProfileDetail = (
  username: string,
  callback: (response: User, status: number) => void
) => {
  const endpoint = `/profiles/${username}/`;
  backendLookup<User>("GET", endpoint, callback);
};

export const apiProfileFollowToggle = (
  action: FollowAction,
  username: string,
  callback: (response: User, status: number) => void
) => {
  const data = { action: `${action && action}`.toLowerCase() };
  backendLookup<User>("POST", `/profiles/${username}/follow/`, callback, data);
};

export default apiProfileDetail;
