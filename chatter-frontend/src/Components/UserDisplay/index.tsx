import type { User } from "../BackendLookup";

interface UserLinkProps {
  username: string;
  includeFullName?: boolean;
  children: React.ReactNode; // aceita string, elementos, arrays etc
}

const UserLink: React.FC<UserLinkProps> = ({ username, children }) => {
  const handleUserLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.location.href = `/profile/${username}`;
  };
  return (
    <span className="pointer" onClick={handleUserLink}>
      {children}
    </span>
  );
};

interface UserPictureProps {
  user: User;
  hideLink?: boolean;
}

export const UserPicture: React.FC<UserPictureProps> = ({ user, hideLink }) => {
  const userIdSpan = (
    <span className="px-3 py-2 rounded-circle bg-dark text-light">
      {user.username[0].toUpperCase()}
    </span>
  );
  return hideLink === true ? (
    userIdSpan
  ) : (
    <UserLink username={user.username}>{userIdSpan}</UserLink>
  );
};

interface UserDisplayProps {
  user: User;
  includeFullName?: boolean;
  hideLink?: boolean;
}

const UserDisplay: React.FC<UserDisplayProps> = ({
  user,
  includeFullName,
  hideLink,
}) => {
  const nameDisplay =
    includeFullName === true ? `${user.first_name} ${user.last_name} ` : null;
  return (
    <>
      {nameDisplay}
      {hideLink === true ? (
        `@${user.username}`
      ) : (
        <UserLink username={user.username}>@{user.username}</UserLink>
      )}
    </>
  );
};

export default UserDisplay;
