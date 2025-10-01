import type { User } from "../BackendLookup";

interface UserLinkProps {
  username: string;
  includeFullName?: boolean; // se não precisa, deixa opcional
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

interface UserDisplayProps {
  user: User;
  includeFullName?: boolean;
}

export const UserPicture: React.FC<UserPictureProps> = ({ user }) => {
  return (
    <UserLink username={user.username}>
      <span className="px-3 py-2 rounded-circle bg-dark text-light">
        {user.username[0].toUpperCase()}
      </span>
    </UserLink>
  );
};

const UserDisplay: React.FC<UserDisplayProps> = ({ user, includeFullName }) => {
  const nameDisplay =
    includeFullName === true ? `${user.first_name} ${user.last_name} ` : null;
  return (
    <>
      {nameDisplay}
      <UserLink username={user.username}>@{user.username}</UserLink>
    </>
  );
};

interface UserPictureProps {
  user: User;
}

export default UserDisplay;
