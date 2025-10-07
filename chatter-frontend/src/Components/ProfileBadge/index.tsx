import { useEffect, useState } from "react";

import type { User } from "../BackendLookup";
import apiProfileDetail from "../ProfileLookup";
import { apiProfileFollowToggle } from "../ProfileLookup";
import { UserPicture } from "../UserDisplay";
import UserDisplay from "../UserDisplay";

import { formatCompactNumber } from "../../utils";

interface ProfileBadgeComponentsProps {
  username: string;
}

interface ProfileBadgeProps {
  user: User;
  didFollowToggle?: (Actionverb: string) => void;
  profileLoading?: boolean;
}

const ProfileBadge: React.FC<ProfileBadgeProps> = ({
  user,
  didFollowToggle,
  profileLoading,
}) => {
  console.log(user);
  let currentVerb = user && user.is_following ? "Unfollow" : "Follow";
  currentVerb = profileLoading ? "Loading..." : currentVerb;
  const handleFollowToogle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (didFollowToggle && !profileLoading) {
      didFollowToggle(currentVerb);
    }
  };
  return user ? (
    <div>
      <p>
        <UserPicture user={user} hideLink />
        <UserDisplay user={user} includeFullName hideLink />
      </p>
      <p>Seguidores: {formatCompactNumber(user.follower_count)}</p>
      <p>Seguindo: {formatCompactNumber(user.following_count)}</p>
      <p>{user.bio}</p>
      <button className="btn btn-primary" onClick={handleFollowToogle}>
        {currentVerb}
      </button>
    </div>
  ) : null;
};

const ProfileBadgeComponent: React.FC<ProfileBadgeComponentsProps> = ({
  username,
}) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [didLookup, setDidLookup] = useState<boolean>(false);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!didLookup) {
      const handleBackendLookup = (response: User, status: number) => {
        if (status === 200) {
          setProfile(response);
        }
      };
      apiProfileDetail(username, handleBackendLookup);
      setDidLookup(true);
    }
  }, [username, didLookup]);

  const handleNewFollow = (actionVerb: string) => {
    const action =
      actionVerb.toLowerCase() === "follow" ? "follow" : "unfollow";
    setProfileLoading(true);
    apiProfileFollowToggle(
      action,
      username,
      (response: User, status: number) => {
        if (status === 200) {
          setProfile(response);
        }
        setProfileLoading(false);
      }
    );
  };

  if (!didLookup) {
    return <span>Loading...</span>;
  }
  return profile ? (
    <ProfileBadge
      user={profile}
      didFollowToggle={handleNewFollow}
      profileLoading={profileLoading}
    />
  ) : (
    <span>Not found</span>
  );
};

export { ProfileBadgeComponent };
export default ProfileBadge;
