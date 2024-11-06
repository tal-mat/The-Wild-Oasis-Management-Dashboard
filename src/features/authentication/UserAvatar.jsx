import styled from "styled-components";
import { useUser } from "./useUser.js";

// Container for user avatar with styling for layout and typography.
const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-gray-600);
`;

// Image styling for the user avatar, ensuring a consistent square aspect ratio.
const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-gray-100);
`;

// Displays the user's avatar and full name in the header area.
function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
